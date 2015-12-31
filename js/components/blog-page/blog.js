define(["knockout", "text!components/blog-page/blog.html", "text!../../../data/posts.json"], function(ko, template, BlogData) {

    var bgImage = "blog-bg";
    var title = "Blogging area";
    var subtitle = "If you're not on the interwebs, you don't exist.";

    //Ensure the data is in JSON format
    try {
        BlogData = JSON.parse(BlogData);
    } catch(e) {
        alert("Holy shit !  Blog data format is invalid\n" + e);
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function vm(params) {
        this.bgImg = ko.observable("url('img/" + bgImage + ".jpg')");
        this.title = ko.observable(title);
        this.subtitle = ko.observable(subtitle);

        this.showFirstOnly = ko.observable(true);

        this.showAll = function() {
            this.showFirstOnly(false);
        };

        this.siteMap = ko.observable({});
        for (var i = 0; i < BlogData.length; i++) {
            var blogItem = BlogData[i];
            var blogDate = new Date(blogItem.time);
            var index = months[blogDate.getMonth()] + " " + blogDate.getFullYear();
            if (!this.siteMap()[index]) this.siteMap()[index] = [];
            this.siteMap()[index].push(blogItem);
        }

        this.blogPosts = ko.observableArray(BlogData);
    }

    return {
        viewModel: vm,
        template: template
    }
});
