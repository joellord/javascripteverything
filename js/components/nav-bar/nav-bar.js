define(["knockout", "text!components/nav-bar/nav-bar.html"], function(ko, template) {
    var vm = function() {};

    vm.name = "Nav Bar";

    return {
        viewModel: vm,
        template: template
    }
});
