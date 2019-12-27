require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const RED = require('node-red')
const compression = require('compression')
const Utils = require('./utils/utilities')
const Config = require('./config/config.json')

let settings = {}

// Create the settings object - see default settings.js file for other options
settings = {
  httpAdminRoot: '/',
  httpNodeRoot: '/api',
  userDir: path.join(__dirname, '/flows/'),
  flowFile: 'flows.json',
  httpRequestTimeout: 300000,
  adminAuth: Config.authEnabled ? require('./user-authentication') : null,
  functionGlobalContext: Utils.generateModuleList(Config.nodeModules),
  httpNodeCors: {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  },
  editorTheme: {
    projects: {
      enabled: false
    },
    page: {
      title: Config.title
    },
    header: {
      title: Config.title,
      url: Config.websiteUrl
    }
  },
  flowFilePretty: true
}

// Initialise the runtime with a server and settings
RED.init(http, settings)
app.use(compression())

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin)

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode)

// Server Setup
const port = process.env.PORT || Config.serverPort

http.listen(port, function () {
  RED.start()
  console.log('Agilit-e Node-RED listening on: ', port)
})
