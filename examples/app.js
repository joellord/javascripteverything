var http = require("http");

function app() {
  http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("Process " + process.pid + " answered the request.\n");
    }).listen(8000);
};

module.exports = app;