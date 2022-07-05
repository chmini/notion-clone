import Header from './Header.js';
import TreeMenu from './TreeMenu.js';
import { createElement } from '../utils/dom.js';

export default function NavSection({ $target, initialState, callback }) {
  const $section = createElement('section', { className: 'NavSection' });
  $target.appendChild($section);

  this.state = initialState;

  const header = new Header({
    $target: $section,
    initialState: {
      title: this.state.title,
    },
  });

  const treeMenu = new TreeMenu({
    $target: $section,
    initialState: {
      documentTree: this.state.documentTree,
      currentDocument: this.state.currentDocument,
    },
    callback,
  });

  this.setState = nextState => {
    this.state = nextState;
    const { title, documentTree, currentDocument } = this.state;
    header.setState({ title });
    treeMenu.setState({ documentTree, currentDocument });
  };
}
