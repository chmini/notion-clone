import { createElement } from '../utils/dom.js';
import { isEqual } from '../utils/validation.js';

export default function Editor({ $target, initialState, callback: { onEditing, updateDocument } }) {
  const $editor = createElement('div', { className: 'Editor' });
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = nextState => {
    if (isEqual(this.state, nextState)) return;
    this.state = nextState;
    const { isEditing } = this.state;
    if (isEditing) return;
    this.render();
  };

  this.render = () => {
    const { isRoot, currentDocument } = this.state;

    $editor.innerHTML =
      isRoot || !currentDocument.id
        ? ''
        : `
      <div contenteditable="true" class="EditorTitle" placeholder="제목 없음">${currentDocument.title}</div>
      <textarea class="EditorContent" placeholder="문서 입력!">${currentDocument.content || ''}</textarea>`;
  };

  this.setEvent = () => {
    $editor.addEventListener('focusin', onEditing);

    $editor.addEventListener('keyup', e => {
      if (e.target.className === 'EditorTitle') {
        updateDocument('title', e.target.textContent);
      }

      if (e.target.className === 'EditorContent') {
        updateDocument('content', e.target.value);
      }
    });
  };

  this.setEvent();
}
