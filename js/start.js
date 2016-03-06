requirejs(
    [ "crossroads",
        "hasher",
        "knockout",
        "components/home-page/home",
        "components/about-page/about",
        "components/speaking-page/speaking",
        "components/contact-page/contact",
        "components/blog-page/blog",
        "components/blog-post-page/blog-post",
        "components/blog-all-page/blog-all",
        "text!../data/routes.json",
        "text!../data/posts.json",
        "jquery",
        "bootstrap",
        "highlight"
    ], function (
        crossroads,
         hasher,
         ko,
         HomeComponent,
         AboutComponent,
         SpeakingComponent,
         ContactComponent,
         BlogComponent,
         BlogPostComponent,
         BlogAllComponent,
         RoutesData,
         PostsData
    ) {


    console.log("App ready");
    ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
    ko.components.register("ko-footer", { require: "components/ko-footer/ko-footer"});
    ko.components.register('home', HomeComponent);
    ko.components.register("about", AboutComponent);
    ko.components.register("speaking", SpeakingComponent);
    ko.components.register("contact", ContactComponent);
    ko.components.register("blog", BlogComponent);
    ko.components.register("blogPost", BlogPostComponent);
    ko.components.register("blog-all", BlogAllComponent);


    var routes = [];
    RoutesData = JSON.parse(RoutesData);
    RoutesData.map(function(el) {routes.push(el.id);});

    PostsData = JSON.parse(PostsData);

    var parentVm = {
        route: ko.observable(routes[0]),
        params: ko.observable({})
    };

    //setup crossroads
    for (var i = 0; i < routes.length; i++) {
        crossroads.addRoute(routes[i]);
    }
    crossroads.routed.add(function(routeName, options) {
        //Do something when the route changes

        //If the routeName has a "/", we need to process differently
        if (routeName.indexOf("/") > -1) {
            switch (options.route._pattern) {
                case "blog/post/{post_id}":
                    parentVm.route("blogPost");
                    parentVm.params({postId: options.params[0]});
                    break;
                default:
                    parentVm.route("404");
            }
        } else {
            parentVm.route(routeName);
        }
    });

    function setMetaTags(route) {
        var defaultData = RoutesData.filter(function(e) {return e.id === "home"})[0];
        var routeData = RoutesData.filter(function(e) {return e.id === route})[0];
        if (routeData === undefined && route.indexOf("post") > -1) {
            //blog/post/item
            var postId = route.split("/")[2];
            var postData;
            for (var i = 0; i < PostsData.length; i++) {
                if (PostsData[i].id === postId) {
                    postData = PostsData[i];
                    break;
                }
            }
            if (postData === undefined) {
                postData = {
                    title: "Blog Post",
                    subtitle: "Details",
                    bg: "home-bg"
                }
            }
            routeData = {
                "meta": {
                    "ogTitle": {
                        "id": "ogTitle",
                        "attribute": "content",
                        "value": postData.title
                    },
                    "ogDescription": {
                        "id": "ogDescription",
                        "attribute": "content",
                        "value": postData.subtitle
                    },
                    "ogImage": {
                        "id": "ogImage",
                        "attribute": "content",
                        "value": "http://javascripteverything.com/img/" + postData.bg + ".jpg"
                    },
                    "twitterTitle": {
                        "id": "twitterTitle",
                        "attribute": "value",
                        "value": postData.title
                    },
                    "twitterDescription": {
                        "id": "twitterDescription",
                        "attribute": "value",
                        "value": postData.subtitle
                    },
                    "twitterImage": {
                        "id": "twitterImage",
                        "attribute": "content",
                        "value": "http://javascripteverything.com/img/" + postData.bg + ".jpg"
                    }
                }
            }
        }
        if (routeData === undefined) {
            //No route data (probably a blog/post/item
            return;
        }
        for (var metaData in routeData.meta) {
            defaultData.meta[metaData] = routeData.meta[metaData];
        }
        for (var metaData in defaultData.meta) {
            var el = document.querySelector("#" + defaultData.meta[metaData].id);
            if (el) {
                el.setAttribute(defaultData.meta[metaData].attribute, defaultData.meta[metaData].value);
            } else {
                console.log("Could not find element id " + defaultData.meta[metaData].id);
            }
        }
    }

    hasher.prependHash = "!";

        console.log("starting");

    //setup hasher
    function parseHash(newHash, oldHash){
        if (crossroads._getMatchedRoutes(newHash).length > 0) {
            ga('send', 'pageview', '#!' + newHash);
            setMetaTags(newHash);
            crossroads.parse(newHash);
        } else {
            hasher.setHash("home");
        }

        setTimeout(function() {console.log("ready");}, 2000);
    }
    hasher.initialized.add(parseHash); //parse initial hash
    hasher.changed.add(parseHash); //parse hash changes
    hasher.init(); //start listening for history change

    ko.applyBindings(parentVm);
});