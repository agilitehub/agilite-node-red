'use strict'

const Config = require('../config/config.json') || {}
const Enums = require('./enums')
const Package = require('../package.json')

module.exports = {
  appVersion: Package.version,
  nodeEnvironment: process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : Enums.nodeEnvironment.PROD,
  nodePort: process.env.PORT || Config.serverPort || Enums.DEFAULT_NODE_PORT,
  config: Config
}
