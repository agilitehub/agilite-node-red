'use strict'

require('dotenv').config()

const Server = require('./server')
const PreLaunch = require('./pre-launch-ops')
const PostLaunch = require('./post-launch-ops')
const Globals = require('./utils/globals')

;(async () => {
  await PreLaunch.init()

  Server.listen(Globals.nodePort, async () => {
    console.log(`Agilit-e API Server (V${Globals.appVersion}) listening on Port: ${Globals.nodePort} - Environment: ${Globals.nodeEnvironment.toUpperCase()}`)
    await PostLaunch.init()
  })
})()
