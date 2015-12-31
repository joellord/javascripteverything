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
         BlogPostComponent
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


    var routes = [
        "home",
        "about",
        "speaking",
        "contact",
        "blog",
        "blog/post/{post_id}"
    ];

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

    hasher.prependHash = "!";

    //setup hasher
    function parseHash(newHash, oldHash){
        if (crossroads._getMatchedRoutes(newHash).length > 0) {
            ga('send', 'pageview', '#!' + newHash);
            crossroads.parse(newHash);
        } else {
            hasher.setHash("home");
        }
    }
    hasher.initialized.add(parseHash); //parse initial hash
    hasher.changed.add(parseHash); //parse hash changes
    hasher.init(); //start listening for history change

    ko.applyBindings(parentVm);
});