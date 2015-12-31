define(["knockout", "text!components/blog-post-page/blog-post.html", "text!../../../data/posts.json"], function(ko, template, BlogData) {

    //Ensure the data is in JSON format
    try {
        BlogData = JSON.parse(BlogData);
    } catch(e) {
        alert("Holy shit !  Blog data format is invalid\n" + e);
    }

    function vm(params) {
        var self = this;

        //Find the post
        var post;
        for (var i = 0; i < BlogData.length; i++) {
            if (BlogData[i].id === params.postId) {
                post = BlogData[i];
                break;
            }
        }
        if (!post) {
            alert("Blog post not found...  Everything might explode now");
        }

        this.bgImg = ko.observable("url('img/" + (post.bg ? post.bg : "post-bg") + ".jpg')");
        this.title = ko.observable(post.title);
        this.subtitle = ko.observable(post.subtitle);
        this.author = ko.observable(post.author);
        this.authorLink = ko.observable(post.author_link);
        this.formattedDate = ko.observable(post.formattedDate);

        this.postContent = ko.observable();
        require(["text!../../../data/posts/" + params.postId + ".html"], function(data) {
            self.postContent(data);
        });
    }

    return {
        viewModel: vm,
        template: template
    }
});
