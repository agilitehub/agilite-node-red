'use strict'

const Axios = require('axios')
const Globals = require('./utils/globals')

module.exports = {
  type: 'credentials',
  users: (username) => {
    return new Promise((resolve) => {
      if (!Globals.config.authorization || !Globals.config.authorization.users) {
        resolve(null)
      } else {
        resolve(_returnUserObject(Globals.config.authorization.users, username))
      }
    })
  },
  authenticate: (email, password) => {
    return new Promise((resolve) => {
      if (!Globals.config.authorization || !Globals.config.authorization.users) {
        resolve(null)
      } else {
        const config = Globals.config.authorization.axiosConfig || {}

        if (!config.headers) config.headers = {}
        config.headers.email = email
        config.headers.password = password

        Axios.request(config)
          .then((response) => {
            resolve(_returnUserObject(Globals.config.authorization.users, email))
          }).catch((error) => {
            if (error.response) {
              console.log(error.response.data)
            } else if (error.request) {
              console.log(error.request)
            } else {
              console.log('Error', error.message)
            }

            resolve(null)
          })
      }
    })
  },
  default: () => {
    return new Promise((resolve) => {
      resolve(null)
    })
  }
}

// PRIVATE FUNCTIONS
const _returnUserObject = (users, username) => {
  let result = null

  for (const x in users) {
    if (users[x].username === username) {
      result = users[x]
      break
    }
  }

  return result
}
