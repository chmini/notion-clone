export const createElement = (tagName, options = {}) => {
  const $element = document.createElement(tagName);

  if (options) {
    const { className, dataset, style, text } = options;
    if (className) $element.className = className;
    if (dataset) {
      const { id } = dataset;
      if (id) $element.dataset.id = id;
    }
    if (style) {
      const { paddingLeft } = style;
      if (paddingLeft) $element.style.paddingLeft = `${paddingLeft}px`;
    }
    if (text) {
      $element.textContent = text;
    }
  }

  return $element;
};
