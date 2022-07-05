const ROUTE_PUSH = 'route-push';
const ROUTE_REPLACE = 'route-replace';

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_PUSH, e => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener(ROUTE_REPLACE, e => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.replaceState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener('popstate', () => {
    onRoute();
  });
};

export const push = nextUrl => {
  window.dispatchEvent(new CustomEvent(ROUTE_PUSH, { detail: { nextUrl } }));
};

export const replace = nextUrl => {
  window.dispatchEvent(new CustomEvent(ROUTE_REPLACE, { detail: { nextUrl } }));
};
