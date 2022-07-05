import { push, replace } from '../routes/router.js';

import EditorSection from '../components/MainSection.js';
import NavSection from '../components/NavSection.js';
import { isEqual } from '../utils/validation.js';
import { request } from '../api/request.js';

export default function DocumentPage({ $target }) {
  this.state = {
    isRoot: null,
    title: '',
    documentTree: [],
    currentDocument: {},
    isEditing: null,
  };

  const navSection = new NavSection({
    $target,
    initialState: {
      title: this.state.title,
      documentTree: this.state.documentTree,
    },
    callback: {
      addDocument: async id => {
        const newDocument = await request(`/documents`, {
          method: 'POST',
          body: JSON.stringify({ title: '', parent: id || null }),
        });
        push(`/documents/${newDocument.id}`);
      },
      removeDocument: async id => {
        await request(`/documents/${id}`, {
          method: 'DELETE',
        });

        if (this.state.currentDocument.id === +id) {
          replace('/');
        } else {
          const documentTree = await request(`/documents`, {
            method: 'GET',
          });
          this.setState({ ...this.state, documentTree });
        }
      },
      fetchDocument: id => {
        // FIXME: 불필요한 요청 발생
        if (this.state.currentDocument.id === +id) return;
        push(`/documents/${id}`);
      },
    },
  });

  let timer;
  const editorSection = new EditorSection({
    $target,
    initialState: {
      currentDocument: this.state.currentDocument,
      isEditing: this.state.isEditing,
    },
    callback: {
      onEditing: () => {
        this.setState({ ...this.state, isEditing: true });
      },
      updateDocument: (type, text) => {
        const { currentDocument } = this.state;
        if (isEqual(currentDocument[type], text)) return;
        this.setState({ ...this.state, currentDocument: { ...currentDocument, [type]: text } });

        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
          const { id, title, content } = this.state.currentDocument;
          await request(`/documents/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
          });
        }, 500);
      },
    },
  });

  this.setState = nextState => {
    if (isEqual(this.state, nextState)) return;
    this.state = nextState;
    const { isRoot, documentTree, currentDocument, isEditing } = this.state;
    navSection.setState({ title: 'Notion', documentTree, currentDocument });
    editorSection.setState({ isRoot, currentDocument, isEditing });
  };

  this.render = initialState => {
    this.setState({ ...this.state, ...initialState, isEditing: false });
  };
}
