
var fs = require('fs');
var routes = require("../data/routes.json");
var posts = require("../data/posts.json");

var i = -1;
var j = -1;

function iterate() {
    i++;
    var route = routes[i];
    if (route === undefined) {
        console.log("Caching complete !");
        return;
    }
    if (route.id.indexOf("{") === -1) {
        cachePage("http://localhost:3000/#!" + route.id, "cache/" + route.cachedId + ".html");
    } else {
        j++;
        var post = posts[j];
        var route = routes[i];
        if (posts[j+1] !== undefined) {
            i--;
        }
        cachePage("http://localhost:3000/#!" + route.id.replace("{post_id}", post.id), "cache/posts/" + post.id + ".html");
    }
}

iterate();

function cachePage(url, cachedName) {
    var page = new WebPage();

    page.onLoadFinished = function() {
        console.log("first page load finished");
        page.render('export.png');
        fs.write(cachedName, page.content, 'w');
        phantom.exit();
    };

    page.open(url, function () {
        page.evaluate(function () {
        });
    });

    page.onLoadFinished = function () {
        console.log("page load finished: " + url);
        page.render('export.png');
        setTimeout(function() {

            fs.write(cachedName, page.content, "w");
            iterate();
        }, 2000);
    };
}