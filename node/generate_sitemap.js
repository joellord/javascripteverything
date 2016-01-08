var fs = require('fs');

var pagesToCache = [
    "home",
    "speaking",
    "blog",
    "contact",
    "about",
    "blog-all"
];

var blogPosts = require("../data/posts.json");

for (var i=0; i < blogPosts.length; i++) {
    pagesToCache.push("blog/post/" + blogPosts[i].id);
}

var SERVER_URL = "http://www.javascripteverything.com";
var SITEMAP = "../sitemap";
var fileContent = "";

for (var i=0; i < pagesToCache.length; i++) {
    fileContent += SERVER_URL + "/index.html#!" + pagesToCache[i] + "\n";
}

console.log(fileContent);

fs.writeFile(SITEMAP, fileContent, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("New Sitemap was generated");
    console.log("You should now upload your new sitemap to https://www.google.com/webmasters/tools/sitemap-list");
});