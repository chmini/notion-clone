import { createElement } from '../utils/dom.js';

export default function Home({ $target, initialState }) {
  const $home = createElement('div', { className: 'Home' });
  $target.appendChild($home);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot } = this.state;

    $home.innerHTML = isRoot
      ? `
        <div class="HomeContent">
          <h1>반갑습니다!</h1>
          <h2>왼쪽 메뉴에서 문서를 선택하거나 새로운 문서를 작성해보세요 :)</h2>
        </div>`
      : '';
  };
}
