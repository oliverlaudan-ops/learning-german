class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  handleRoute() {
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.slice(1).split('?');
    const params = new URLSearchParams(queryString || '');
    
    const handler = this.routes[path] || this.routes['#/'];
    if (handler) handler(params);
  }

  navigate(path) {
    window.location.hash = path;
  }

  back() {
    history.back();
  }
}

const router = new Router();