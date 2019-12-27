const generateModuleList = function (nodeModules) {
  const modules = {}

  if (nodeModules) {
    for (const prop in nodeModules) {
      if (nodeModules[prop] && nodeModules[prop] === true) {
        try {
          modules[prop] = require(prop)
        } catch (e) {
          delete nodeModules[prop]
        }
      }
    }
  }

  return modules
}

exports.generateModuleList = generateModuleList
