var globals = {
    protocol: 'http',
    host: "localhost",
    apiPort: 6010,
    apiUrl: function () {
        var port = (this.port !== "") ? ":" + this.port : "";
        return this.protocol + "://" + this.host + port + "/";
    }
};

module.exports = globals;