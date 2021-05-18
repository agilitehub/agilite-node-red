'use strict'

const Express = require('express')
const App = Express()
const Helmet = require('helmet')
const HTTP = require('http')
const Compression = require('compression')
const Path = require('path')
const NodeRED = require('node-red')

const Globals = require('./utils/globals')
const Enums = require('./utils/enums')
const Utilities = require('./utils/utilities')

// HTTP Server Setup
const server = HTTP.createServer(App)

// Setup Node-RED Settings
const nodeRedSettings = Globals.config.nodeRedSettings || {}

if (!Globals.config.flowsDirName) Globals.config.flowsDirName = Enums.DEFAULT_FLOWS_DIR_NAME
nodeRedSettings.userDir = Path.join(__dirname, `/${Globals.config.flowsDirName}/`)

if (Globals.config.authorization && Globals.config.authorization.enabled) {
  nodeRedSettings.adminAuth = require('./user-authentication')
}

if (Globals.config.agiliteStorage && Globals.config.agiliteStorage.enabled) {
  nodeRedSettings.storageModule = require('./nodeRedStorage')
}

if (Globals.config.functionNodeModules) {
  nodeRedSettings.functionGlobalContext = Utilities.generateModuleList(Globals.config.functionNodeModules)
}

// Init Node-RED Server
NodeRED.init(server, nodeRedSettings)
App.use(nodeRedSettings.httpAdminRoot, NodeRED.httpAdmin)
App.use(nodeRedSettings.httpNodeRoot, NodeRED.httpNode)
App.use(Compression())
App.use(Helmet())

// EXPORTS
module.exports = server
