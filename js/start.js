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
         RoutesData
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
        var defaultData = RoutesData.find(function(e) {return e.id === "home"});
        var routeData = RoutesData.find(function(e) {return e.id === route});
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

    //setup hasher
    function parseHash(newHash, oldHash){
        if (crossroads._getMatchedRoutes(newHash).length > 0) {
            ga('send', 'pageview', '#!' + newHash);
            setMetaTags(newHash);
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