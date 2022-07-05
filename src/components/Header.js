import { createElement } from '../utils/dom.js';
import { isEqual } from '../utils/validation.js';

export default function Header({ $target, initialState }) {
  const $header = createElement('header', { className: 'Header' });
  $target.appendChild($header);

  this.state = initialState;

  this.setState = nextState => {
    if (isEqual(this.state, nextState)) return;
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title } = this.state;

    $header.innerHTML = `
      <h2>${title}</h2>
    `;
  };
}
