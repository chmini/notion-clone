import Editor from './Editor.js';
import Home from './Home.js';
import NotFound from './NotFound.js';
import { createElement } from '../utils/dom.js';

export default function MainSection({ $target, initialState, callback }) {
  const $section = createElement('section', { className: 'MainSection' });
  $target.appendChild($section);

  this.state = initialState;

  const home = new Home({
    $target: $section,
    initialState: {
      isRoot: this.state.isRoot,
    },
  });

  const editor = new Editor({
    $target: $section,
    initialState: {
      isRoot: this.state.isRoot,
      currentDocument: this.state.currentDocument,
      isEditing: this.state.isEditing,
    },
    callback,
  });

  const notFound = new NotFound({
    $target: $section,
    initialState: {
      isRoot: this.state.isRoot,
      currentDocument: this.state.currentDocument,
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    const { isRoot, currentDocument, isEditing } = this.state;
    home.setState({ isRoot });
    editor.setState({ isRoot, currentDocument, isEditing });
    notFound.setState({ isRoot, currentDocument });
  };
}
