'use strict'

const Agilite = require('agilite')
const When = require('when')
const Promise = When.promise
const Sentry = require('@sentry/node')
const Globals = require('./utils/globals')

let agilite = null

if (Globals.config.sentry && Globals.config.sentry.enabled) Sentry.init(Globals.config.sentry.config)

const nodeRedStorage = {
  init: (nodeRedSettings) => {
    if (!Globals.config.agiliteStorage || !Globals.config.agiliteStorage.apiServerUrl || !Globals.config.agiliteStorage.apiKey) {
      throw new Error('No Agilite API Key found in configuration file')
    }

    return Promise((resolve, reject) => {
      (async () => {
        try {
          agilite = new Agilite({
            apiServerUrl: Globals.config.agiliteStorage.apiServerUrl,
            apiKey: Globals.config.agiliteStorage.apiKey
          })

          resolve()
        } catch (err) {
          _handleSentryErrors(err)
          reject(err)
        }
      })()
    })
  },

  getFlows: () => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.getFlows()
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not get flows')
          }
        })
    })
  },

  saveFlows: (flows) => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.saveFlows(flows)
        .then(res => {
          resolve()
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not save flows')
          }
        })
    })
  },

  getCredentials: () => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.getCredentials()
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not get credentials')
          }
        })
    })
  },

  saveCredentials: (credentials) => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.saveCredentials(credentials)
        .then(res => {
          resolve()
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not save credentials')
          }
        })
    })
  },

  getSettings: () => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.getSettings()
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not get settings')
          }
        })
    })
  },

  saveSettings: (userSettings) => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.saveSettings(userSettings)
        .then(res => {
          resolve()
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not save settings')
          }
        })
    })
  },

  getSessions: () => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.getSessions()
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not get settings')
          }
        })
    })
  },

  saveSesssions: (sessions) => {
    return Promise((resolve, reject) => {
      agilite.NodeRed.saveSessions(sessions)
        .then(res => {
          resolve()
        })
        .catch(err => {
          _handleSentryErrors(err)

          if (err.response) {
            reject(err.response.data.errorMessage)
          } else {
            reject('Could not save sessions')
          }
        })
    })
  }
}

// PRIVATE FUNCTIONS
const _handleSentryErrors = (err) => {
  if (Globals.config.sentry && Globals.config.sentry.enabled) Sentry.captureException(err)
}

module.exports = nodeRedStorage
