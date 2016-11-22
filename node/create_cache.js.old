var pagesToCache = [
    "home",
    "speaking",
    "blog",
    "contact",
    "about"
];

var blogPosts = require("../data/posts.json");

for (var i=0; i < blogPosts.length; i++) {
    pagesToCache.push("blog/post/" + blogPosts[i].id);
}

var SERVER_URL = "http://www.javascripteverything.com";
var fs = require('fs');

var cheerio = require('cheerio');

function follow(pageToCache, callback) {
    var page = require('webpage').create();

    page.open(SERVER_URL + '/#!' + pageToCache, function (status) {
        if (status === 'fail') {
            console.log(pageToCache + ': ?');
        }

        setTimeout(function() {
            var html = page.evaluate(function() {return document.documentElement.outerHTML;});
            var $ = cheerio.load(html);
            console.log($.html());
            filename = "../cache/" + pageToCache.replace(/\//g, "_") + ".html";
            fs.write(filename, html, "w+");
            console.log(pageToCache + " was cached");
            page.close();
        }, 5000);


    });

    callback();
}

function process() {
    if (pagesToCache.length > 0) {
        var pageToCache = pagesToCache[0];
        pagesToCache.splice(0, 1);
        console.log("Preparing to follow " + pageToCache);
        setTimeout(function() {
            follow(pageToCache, process);
        }, 2500);
    } else {
        setTimeout(function() {
            console.log("Done");
            phantom.exit();
        }, 3000);
    }
}

process();
