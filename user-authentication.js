const axios = require('axios')
const Config = require('./config/config.json')

module.exports = {
  type: 'credentials',
  users: function (username) {
    return new Promise(function (resolve) {
      if (!Config || !Config.users) {
        resolve(null)
      } else {
        resolve(_returnUserObject(Config.users, username))
      }
    })
  },
  authenticate: function (email, password) {
    return new Promise(function (resolve) {
      if (!Config || !Config.users) {
        resolve(null)
      } else {
        const params = {
          method: Config.authService.method,
          url: Config.authService.baseUrl + Config.authService.routeUrl,
          headers: Config.authService.headers,
          data: {
            credentialsBase64: Buffer.from(email + ':' + password).toString('base64'),
            email,
            password: password
          }
        }

        axios.request(params)
          .then(function (response) {
            resolve(_returnUserObject(Config.users, email))
          }).catch(function (error) {
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
  default: function () {
    return new Promise(function (resolve) {
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
