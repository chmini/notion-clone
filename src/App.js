import { initRouter, replace } from './routes/router.js';

import DocumentPage from './pages/DocumentPage.js';
import { request } from './api/request.js';

export default function App({ $target }) {
  const documentPage = new DocumentPage({ $target });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      const documentTree = await request('/documents');
      documentPage.render({ isRoot: true, documentTree, currentDocument: {} });
      return;
    }

    if (pathname === '/404') {
      const documentTree = await request('/documents');
      documentPage.render({ isRoot: false, documentTree, currentDocument: {} });
      return;
    }

    if (pathname.indexOf('/documents') === 0) {
      const [, , id] = pathname.split('/');
      const currentDocument = await request(`/documents/${id}`);
      if (!currentDocument) return;
      const documentTree = await request('/documents');
      documentPage.render({ isRoot: false, documentTree, currentDocument });
      return;
    }

    replace('/404');
  };

  this.init = () => {
    initRouter(() => this.route());
    this.route();
  };

  this.init();
}
