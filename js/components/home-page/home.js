define(["knockout", "text!components/home-page/home.html"], function(ko, template) {

    var bgImage = "home-bg";
    var title = "Random thoughts from a random dev";
    var subtitle = "Ideas, tech stuff, robots, javascript and much more...";

    function vm(params) {
        console.log("Home constructor");
        this.bgImg = ko.observable("url('img/" + bgImage + ".jpg')");
        this.title = ko.observable(title);
        this.subtitle = ko.observable(subtitle);
    }

    return {
        viewModel: vm,
        template: template
    }
});
