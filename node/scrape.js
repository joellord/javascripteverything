//To generate the cached version of the site
//Start by opening a web server
// cd ~/Sites/javascripteverything
// serve
//Then run this script with phantom
// phantomjs scrape.js
//This will create the /cache folder and all the files
//And will recreate a new sitemap

var fs = require('fs');
var routes = require("../data/routes.json");
var posts = require("../data/posts.json");

var i = -1;
var j = -1;
var sitemap = [];

function iterate() {
    i++;
    var route = routes[i];
    if (route === undefined) {
        console.log("Caching complete !");
        fs.write("../sitemap", sitemap.join("\n"), "w");
        return;
    }
    if (route.id.indexOf("{") === -1) {
        cachePage("http://localhost:3000/#!" + route.id, route.cachedId + ".html");
    } else {
        j++;
        var post = posts[j];
        var route = routes[i];
        if (posts[j+1] !== undefined) {
            i--;
        }
        cachePage("http://localhost:3000/#!" + route.id.replace("{post_id}", post.id), post.id + ".html");
    }
}

iterate();

function cachePage(url, cachedName) {
    var page = new WebPage();

    page.onLoadFinished = function() {
        console.log("first page load finished");
        //page.render('export.png');
        fs.write(cachedName, page.content, 'w');
        phantom.exit();
    };

    page.open(url, function () {
        page.evaluate(function () {
        });
    });

    page.onLoadFinished = function () {
        console.log("page load finished: " + url);
        //page.render('export.png');
        setTimeout(function() {
            var newPageContent = page.content;
            //Replace blog post links
            for (var i=0; i < posts.length; i++) {
                var routeRegex = new RegExp("\#\!blog/post/" + posts[i].id, "ig");
                newPageContent = newPageContent.replace(routeRegex, posts[i].id + ".html");
            }
            //Replace links to regular routes
            for (var i=0; i < routes.length; i++) {
                var route = routes[i];
                var routeRegex = new RegExp("\#\!" + route.id, "ig");
                newPageContent = newPageContent.replace(routeRegex, route.cachedId + ".html");
            }

            //Change any reference to localhost:3000 to the actual site
            newPageContent = newPageContent.replace(/localhost\:3000/, "javascripteverything.com");

            newPageContent = newPageContent.replace("<script data-main=\"js/main\" src=\"js/libs/require.js\"></script>", "");
            sitemap.push("http://www.javascripteverything.com/" + cachedName);
            fs.write("../cache/" + cachedName, newPageContent, "w");
            iterate();
        }, 5000);
    };
}