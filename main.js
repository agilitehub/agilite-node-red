'use strict'

const Server = require('./src/server')
const PreLaunch = require('./src/pre-launch-ops')
const PostLaunch = require('./src/post-launch-ops')
const Globals = require('./src/utils/globals')

;(async () => {
  await PreLaunch.init()

  Server.listen(Globals.nodePort, async () => {
    console.log(`Agilit-e Node-RED (V${Globals.appVersion}) listening on Port: ${Globals.nodePort} - Environment: ${Globals.nodeEnvironment.toUpperCase()}`)
    await PostLaunch.init()
  })
})()
