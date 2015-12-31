define(["knockout", "text!components/ko-footer/ko-footer.html"], function(ko, template) {
    var vm = function() {
        this.year = ko.observable((new Date()).getFullYear());
    };

    return {
        viewModel: vm,
        template: template
    }
});
