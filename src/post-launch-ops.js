'use strict'

const NodeRED = require('node-red')

const init = async () => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        NodeRED.start()
        resolve()
      } catch (e) {
        reject(e)
      }
    })()
  })
}

// EXPORTS
exports.init = init
