const loadConfig = function(callback){
  const Globals = require('./globals');
  const path = require('path');
  const fs = require('fs');

  let result = "";
  let filePath = "";

  try {    
    filePath = path.join(__dirname, "../config/config.json");

    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        console.log("Config File Not Found");
        return callback();
      }

      try {
        result = JSON.parse(data);
        Globals.config = result;
        console.log("Config Loaded Successfully");
      } catch (e) {
        console.log("Parsing Config as JSON Failed");
      }

      return callback();
    });
  } catch (e) {
    console.log(e.stack);
    return callback();
  }

  return null;
};

const generateModuleList = function(nodeModules) {
  let modules = {}

  if (nodeModules) {
    for(let prop in nodeModules){
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

exports.loadConfig = loadConfig;
exports.generateModuleList = generateModuleList;