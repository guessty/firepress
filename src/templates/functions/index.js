import * as functions from 'firebase-functions'
//
const libApp = require('firestudio/dist/lib/app')
const initRouter = require('firestudio/dist/lib/router')
const routes = require('./config/routes')

const router = initRouter(routes)
const app = libApp({ dev: false, conf: { distDir: 'app' } })
const handler = router.getRequestHandler(app)

export const firestudioApp = functions.https.onRequest((request, response) => {
  console.log('File: ' + request.originalUrl) // eslint-disable-line no-console
  return app.prepare().then(() => handler(request, response))
})

export * from './functions'
