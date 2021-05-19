'use strict'

const FS = require('fs')
const Path = require('path')
const Enums = require('./enums')
const Package = require('../../package.json')

// Check if Config file exists or use Default Template
let Config = Enums.CONFIG_DEFAULT
const configPath = Path.join(__dirname, Enums.CONFIG_PATH)
if (FS.existsSync(configPath)) Config = require(configPath)

module.exports = {
  appVersion: Package.version,
  nodeEnvironment: process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : Enums.nodeEnvironment.PROD,
  nodePort: process.env.PORT || Config.serverPort || Enums.DEFAULT_NODE_PORT,
  config: Config
}
