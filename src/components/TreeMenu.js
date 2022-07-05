import { getItem, setItem } from '../utils/storage.js';

import { createElement } from '../utils/dom.js';

export default function TreeMenu({ $target, initialState, callback: { addDocument, fetchDocument, removeDocument } }) {
  const $navbar = createElement('nav', { className: 'Navbar' });
  const $treeMenu = createElement('ul', { className: 'TreeMenu' });
  $navbar.appendChild($treeMenu);
  $target.appendChild($navbar);

  this.state = { initialState, toggledItems: getItem('toggledItems', []) };

  this.setState = nextState => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { documentTree, currentDocument, toggledItems } = this.state;

    const getTreeMenuItems = (documentTree, depth = 1) => {
      if (documentTree.length === 0) {
        if (depth === 1) return '';
        return `
          <li class="TreeMenuItem" style="padding-left: ${14 * depth}px">
            <span>하위 문서가 없습니다</span>
          </li>`;
      }

      return documentTree
        .map(
          ({ id, title, documents }) => `
            <li class="TreeMenuItem ${currentDocument.id === id ? 'active' : ''}" 
              data-id="${id}" 
              style="padding-left: ${14 * depth}px">
              <div class="SmallButton toggle">
                ${toggledItems.includes(id) ? '<i class="fas fa-folder-open"></i>' : '<i class="fas fa-folder"></i>'}
              </div>
              <div class="title">${title || '제목 없음'}</div>
              <div class="ButtonGroup">
                <div class="SmallButton delete">
                  <i class="fas fa-trash-can"></i>
                  </div>
                <div class="SmallButton add">
                  <i class="fas fa-plus"></i>
                </div>
              </div>
            </li> 
            ${toggledItems.includes(id) ? getTreeMenuItems(documents, depth + 1) : ''}`
        )
        .join('');
    };

    $treeMenu.innerHTML = `
      ${getTreeMenuItems(documentTree)}
      <div class="TreeMenuItem add">
        <i class="fas fa-plus"></i>
        <span>페이지 추가</span>
      </div>`;
  };

  this.setEvent = () => {
    $treeMenu.addEventListener('click', e => {
      const $treeMenuItem = e.target.closest('.TreeMenuItem');
      const $smallButton = e.target.closest('.SmallButton');

      const { id } = $treeMenuItem.dataset;

      if ($smallButton) {
        if ($smallButton.classList.contains('add')) {
          addDocument(id);
        }
        if ($smallButton.classList.contains('delete')) {
          removeDocument(id);
        }
        if ($smallButton.classList.contains('toggle')) {
          const { toggledItems } = this.state;
          if (toggledItems.includes(+id)) {
            this.setState({ toggledItems: toggledItems.filter(toggledId => toggledId !== +id) });
          } else {
            this.setState({ toggledItems: [...toggledItems, +id] });
          }
          setItem('toggledItems', this.state.toggledItems); // toggle event
        }
        return;
      }

      if ($treeMenuItem) {
        if (id) {
          fetchDocument(id);
        }

        if ($treeMenuItem.classList.contains('add')) {
          addDocument();
        }
      }
    });
  };

  this.setEvent();
}
