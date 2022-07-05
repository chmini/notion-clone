import { createElement } from '../utils/dom.js';
import { replace } from '../routes/router.js';

export default function NotFound({ $target, initialState }) {
  const $notFound = createElement('div', { className: 'NotFound' });
  $target.appendChild($notFound);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, currentDocument } = this.state;

    $notFound.innerHTML =
      isRoot || currentDocument.id
        ? ''
        : `
        <div class="NotFoundContainer">
          <div class="NotFoundContent flex-grow1">
            <h1>404</h1>
            <h2>페이지를 찾을 수 없습니다.</h2>
          </div>
          <button class="HomeButton">홈으로</button>
        </div>`;
  };

  this.setEvent = () => {
    $notFound.addEventListener('click', e => {
      if (!e.target.closest('button')) return;
      replace('/');
    });
  };

  this.setEvent();
}
