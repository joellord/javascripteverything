define(["knockout", "text!components/about-page/about.html"], function(ko, template) {

    var bgImage = "about-bg";
    var title = "About Me";
    var subtitle = "This is who I am";

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
