import { writeFileSync } from 'fs'
import path from 'path'
const requireFoolWebpack = require('require-fool-webpack')
//

const generateFirebasrc = (config) => {
  const firebaserc = JSON.stringify({
    projects: {
      default: config.firebase.projectId
    }
  })
  
  return firebaserc
}

const generateJSON = (config, functionsDistDir, routerSource) => {
  const appRouter = requireFoolWebpack(`${routerSource}`)

  const configRewrites = config.rewrites || []

  const clientRewrites = Object.keys(appRouter.clientRoutes).map((route) => {
    const source = route.split(':slug').join('**')
    return {
      source,
      destination: '/router.html'
    }
  })

  const cloudRewrites = Object.keys(appRouter.cloudRoutes).map((route) => {
    const source = route.split(':slug').join('**')
    return {
      source,
      function: 'firestudioApp'
    }
  })

  // added specific rewrite for static routes in order to support serve.js
  const staticRewrites = Object.keys(appRouter.staticRoutes).map((route) => {
    const expression = /(.html|.json)/
    const destination = expression.test(route) ? route : path.join(route, 'index.html')
    return {
      source: route,
      destination
    }
  })

  let customFunctions = {}
  try {
    customFunctions = requireFoolWebpack(`${functionsDistDir}/functions`)
  } catch {
    console.log('> no custom functions to rewrite')
  }
  const functionRewrites = Object.keys(customFunctions).map((key) => {
    return {
      source: `/api/functions/${key}`,
      function: key,
    }
  })
  
  const firebaseRewrites = [
    ...configRewrites,
    ...clientRewrites,
    ...cloudRewrites,
    ...functionRewrites,
  ]

  const serveRewrites =[
    ...staticRewrites,
    ...configRewrites,
    ...clientRewrites,
    ...cloudRewrites,
    ...functionRewrites,
  ]

  const firebaseHostingConfig = {
    hosting: {
      public: 'public',
      ignore: [
        'firebase.json',
        '**/.*',
        '**/node_nodules/**'
      ],
      rewrites: firebaseRewrites
    }
  }
  const firebaseFunctionsConfig = config.functions.enabled ? { functions: { source: 'functions' } } : {}

  const firebaseJSONConfig = JSON.stringify({
    ...firebaseHostingConfig,
    ...firebaseFunctionsConfig,
  })

  const serveJSONConfig = JSON.stringify({
    rewrites: serveRewrites
  })

  return {
    firebase: firebaseJSONConfig,
    serve: serveJSONConfig
  }
}

export default async function buildDeploymentConfig (currentPath, config) {
  const distDir = path.join(currentPath, config.dist.dir)
  const functionsDistDir = path.join(currentPath, config.dist.functions.dir)
  const routerSource = path.join(currentPath, config.app.dir, 'router.js')

  console.log('Building Deployment Config...')
  await writeFileSync(path.join(distDir, '.firebaserc'), generateFirebasrc(config), 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(".firebaserc was saved!");
    }
  })

  const JSONConfig = await generateJSON(config, functionsDistDir, routerSource)

  await writeFileSync(path.join(distDir, 'firebase.json'), JSONConfig.firebase, 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("firebase.json was saved!");
    }
  })

  await writeFileSync(path.join(distDir, '/public/serve.json'), JSONConfig.serve, 'utf8', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("serve.json was saved!");
    }
  })

  console.log('Deployment Config Built')
}