export const createPageUrl = (pageName) => {
  const routes = {
    'Home': '/',
    'Services': '/services',
    'Quote': '/quote',
    'Contact': '/contact'
  }
  return routes[pageName] || '/'
}
