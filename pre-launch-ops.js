'use strict'

const Globals = require('./utils/globals')
const Enums = require('./utils/enums')
const Sentry = require('@sentry/node')

const init = async () => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated resources (e.g. file descriptors, handles, etc)
        // before shutting down the process. It is not safe to resume normal operation after 'uncaughtException'
        if ((Globals.config.sentry && Globals.config.sentry.enabled) && (Globals.nodeEnvironment !== Enums.nodeEnvironment.TEST)) {
          Sentry.init(Globals.config.sentry.config)

          process.on('uncaughtExceptionMonitor', err => {
            Sentry.captureException(err)
          })
        }

        resolve()
      } catch (e) {
        console.log(e)
        process.exit()
      }
    })()
  })
}

// EXPORTS
exports.init = init
