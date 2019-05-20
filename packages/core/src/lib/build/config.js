const path = require('path');
const fs = require('fs');
const parseArgs = require('minimist');
//

const normalizePath = path => path.replace(/\\/g, '/')

const generateDirRoutes = (dir, pathString = undefined, routes = []) => {
  const normalizedPath = normalizePath(dir)
  const stats = fs.statSync(normalizedPath);
  const baseName = path.basename(dir)
  if (stats.isDirectory()) {
    let nextPathString = ''
    if (pathString !== undefined) {
      nextPathString = `${pathString}/${baseName}`;
    }
    const children = fs.readdirSync(normalizedPath);

    children.forEach(child => {
      generateDirRoutes(path.join(dir, child), nextPathString, routes);
    });
  } else if (stats.isFile()) {
    const fileString = `${pathString}/${baseName}`
    const page = fileString.replace(/\.[^/.]+$/, '')

    if (page === '/index') {
      const route = {
        pattern: '/',
        page: '/',
      }
      routes.push(route)
    } else if (page === '/_404' || page === '/404' || page === '/404/index') {
      const route = {
        pattern: '/404.html',
        page: page.replace('/index', ''),
      }
      routes.push(route)
    } else if (page !== '/_app' && page !== '/_document' && page !== '/_error') {
      const route = {
        pattern: page.replace('/index', '').replace('/_', '/:'),
        page: page.replace('/index', ''),
      }
      routes.push(route)
    }
  }
  return routes
} 

const generateExportPathMap = (routes, firestudioConfig) => {
  const allRoutes = [
    { pattern: '/404.html', page: '/_404' },
    ...routes,
    ...firestudioConfig.fallback
      ? [{ pattern: `/${firestudioConfig.fallback}`, page: `/${firestudioConfig.fallback.replace('.html', '')}` }]
      : [] ,
  ]
  
  return allRoutes.reduce((routeMap, route) => {
    const normalisedPattern = route.pattern.replace('.html', '')

    let routeKey = normalisedPattern

    if (routeKey.includes('/:')) {
      if (firestudioConfig.exportDynamicPages) {
        routeMap[`${routeKey.replace('/:', '/_')}.html`] = { page: route.page }
      }
      return routeMap
    }

    routeMap[`${routeKey === '/' ? '/index.html' : `${routeKey}.html`}`] = { page: route.page }

    return routeMap
  }, {})
}

const withFirestudio = (config = {}) => {
  const argv = parseArgs(process.argv.slice(2), {})
  let argvPath = argv._[0] || '.'

  if (['dev', 'build', 'export'].includes(argv._[0])) {
    argvPath = argv._[1] || '.'
  }

  const baseNextConfig = {
    assetPrefix: '',
    webpack: config => config,
    ...config,
    distDir: config.distDir && config.distDir !== '.' && config.distDir !== './'
      ? config.distDir : './.next',
  }

  const firestudioConfig = config.firestudio || {}

  let pagesDir = path.join(path.resolve(argvPath), 'pages')
  const isBuild = argvPath === config.distDir
  if (isBuild || firestudioConfig.generateRoutesFromBuild) {
    const buildId = fs.readFileSync(`${config.distDir}/BUILD_ID`, 'utf8')
    pagesDir = path.join(path.resolve(config.distDir), `static/${buildId}/pages`)
  }
  const routes = generateDirRoutes(pagesDir)

  const exportPathMap = generateExportPathMap(routes, firestudioConfig)

  const firestudioEntries = firestudioConfig.fallback ? {
    'static/build/pages/_404.js': [ path.join(__dirname, '..', '..', 'lib/pages/_404.js') ],
    [`static/build/pages/${firestudioConfig.fallback.replace('.html', '')}.js`]: [
      path.join(__dirname, '..', '..', 'lib/pages/_soft404.js')
    ],
  } : {
    'static/build/pages/_404.js': [ path.join(__dirname, '..', '..', 'lib/pages/_soft404.js') ],
  }

  const nextConfig = {
    ...baseNextConfig,
    distDir: path.relative(path.resolve(argvPath), path.resolve(baseNextConfig.distDir)),
    exportPathMap: () => exportPathMap,
    env: {
      ...baseNextConfig.env,
      ROUTES: routes,
    },
    generateBuildId: async () => {
      return 'build'
    },
    webpack: (config, options) => {
      const coreEntry = config.entry

      const entry = async () => {
        return {
          ...await coreEntry(),
          ...firestudioEntries,
        }
      }
      config.entry = entry
      config.node = { fs: 'empty' };
      return baseNextConfig.webpack(config, options)
    },
  }

  return nextConfig
}

export default withFirestudio
