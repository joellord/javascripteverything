define(["knockout", "text!components/contact-page/contact.html"], function(ko, template) {

    var bgImage = "contact-bg";
    var title = "Contact Me";
    var subtitle = "Got questions? I have answers (maybe).";

    function vm(params) {
        this.bgImg = ko.observable("url('img/" + bgImage + ".jpg')");
        this.title = ko.observable(title);
        this.subtitle = ko.observable(subtitle);
    }

    return {
        viewModel: vm,
        template: template
    }
});
