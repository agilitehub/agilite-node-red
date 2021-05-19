'use strict'

const Enums = {
  DEFAULT_NODE_PORT: 80,
  DEFAULT_FLOWS_DIR_NAME: 'flows',
  CONFIG_PATH: '../../config/config.json',
  CONFIG_DEFAULT: require('../../config/templates/default-config.json'),
  nodeEnvironment: {
    DEV: 'development',
    TEST: 'testing',
    PROD: 'production'
  }
}

module.exports = Enums
