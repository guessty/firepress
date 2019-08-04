

const getDynamicSource = function(route) {
  const splitRoute = route.split('/');
  return splitRoute.map((element) => {
    return element.includes(':') ? '**' : element;
  }).join('/');
};

module.exports = function(routes, config) {
  const staticRewrites = routes.filter(function(route) {
    return !route.pattern.includes('/:');
  }).map(function(route) {
      const source = route.pattern
      return {
        source,
        destination: `${route.page === '/' ? '/index.html' : `${route.page}.html`}`,
      }
    });
  
  const dynamicRewrites = routes.filter(function(route) {
    return route.pattern.includes('/:');
  }).map(function(route) {
      const source = getDynamicSource(route.pattern)
      return {
        source,
        destination: `${route.page}.html`,
      }
    });

  return {
    staticRewrites,
    dynamicRewrites,
  }
}