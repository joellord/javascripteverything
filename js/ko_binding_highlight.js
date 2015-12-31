define(["jquery", "knockout"], function($, ko) {
    "use strict";

    ko.bindingHandlers.syntaxhighlight = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            valueAccessor().subscribe(function() {
                $("pre").each(function(index, el) {
                    var content = $(el).text();
                    var inner = $("<code>").addClass("hljs").addClass("javasript").text(content);
                    $(el).html($(inner).html());
                    hljs.highlightBlock(el);
                });
            });
        }
    };
});
