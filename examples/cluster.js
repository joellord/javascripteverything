var cluster = require("cluster");
var CPUs = require("os").cpus();
var app = require("./app");

if (cluster.isMaster) {
  //Launch workers
  for (var i = 0; i < CPUs.length; i++) {
    cluster.fork();
  }
} else {
  console.log("pid " + cluster.worker.process.pid + " started");
  app();
}