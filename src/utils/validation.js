export const isEqual = (prev, next) => {
  if (typeof prev !== 'object' || prev === null) {
    return prev === next;
  }

  if (Array.isArray(prev)) {
    return prev.length === next.length && prev.every((el, idx) => isEqual(el, next[idx]));
  }

  return Object.keys(prev).every(key => isEqual(prev[key], next[key]));
};
