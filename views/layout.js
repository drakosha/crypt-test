const h = require('func-html');

module.exports = (content) => h('html',
  h('head',
    h('meta', { charset: 'utf-8' }),
    h('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }),
    h('link', {
      rel: 'stylesheet',
      href:'https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/css/bootstrap.min.css',
      integrity: 'sha384-VCmXjywReHh4PwowAiWNagnWcLhlEJLA5buUprzK8rxFgeH0kww/aWY76TfkUoSX',
      crossorigin: 'anonymous' }),
    h('title', 'Crypt test')
  ),
  h('body.bg-light',
    h('nav.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow',
      h('a.nav-link', { href: '#' }, 'Crypt test')
    ),

    content,

    h('script', {
      src: 'https://code.jquery.com/jquery-3.5.1.min.js',
      integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
      crossorigin: 'anonymous' }),
    h('script', {
      src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
      integrity: 'sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN',
      crossorigin: 'anonymous' }),
    h('script', {
      src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.1/js/bootstrap.min.js',
      integrity: 'sha384-XEerZL0cuoUbHE4nZReLT7nx9gQrQreJekYhJD9WNWhH8nEW+0c5qq7aIo2Wl30J',
      crossorigin: 'anonymous' })
  )
);
