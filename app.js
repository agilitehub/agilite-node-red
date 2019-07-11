require('dotenv').config();

var express = require('express');
var app = express();
var http = require('http').Server(app);
var RED = require("node-red");
const compression = require('compression');
const Utils = require('./utils/utilities');

let settings = {};

Utils.loadConfig(function(){
    const Globals = require('./utils/globals');

    // Create the settings object - see default settings.js file for other options
    settings = {
        httpAdminRoot: "/",
        httpNodeRoot: "/api",
        userDir: __dirname + "/flows/",
        flowFile: 'flows.json',
        httpRequestTimeout: 300000,
        adminAuth: require("./user-authentication"),
        functionGlobalContext: {},
        httpNodeCors: { origin: "*", methods: ['GET','PUT','POST','DELETE'] },
        editorTheme: {
            projects:{
                enabled:false
            },
            page: {
                title: Globals.config.title
            },
            header: {
                title: Globals.config.title,
                url: Globals.config.websiteUrl
            }
        },
        flowFilePretty: true
    };

    // Initialise the runtime with a server and settings
    RED.init(http, settings);
    app.use(compression());

    // Serve the editor UI from /red
    app.use(settings.httpAdminRoot, RED.httpAdmin);

    // Serve the http nodes UI from /api
    app.use(settings.httpNodeRoot, RED.httpNode);

    //Server Setup
    const port = process.env.PORT || Globals.config.serverPort;

    http.listen(port, function() {
        RED.start();
        console.log("Agilit-e Node-RED listening on: ", port);
    });
});