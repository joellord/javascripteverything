define(["knockout", "text!components/speaking-page/speaking.html"], function(ko, template) {

    var bgImage = "speaking-bg";
    var title = "If you have knowledge, let others light their candles in it.";
    var subtitle = "-Margaret Fuller";

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();

    function vm(params) {
        var self = this;
        this.bgImg = ko.observable("url('img/" + bgImage + ".jpg')");
        this.title = ko.observable(title);
        this.subtitle = ko.observable(subtitle);
        this.pastEvents = ko.observableArray([]);
        this.futureEvents = ko.observableArray([]);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var events = JSON.parse(xhr.response);

                for (var i = 0; i < events.length; i++) {
                    var d = new Date(events[i].time);
                    events[i].formattedDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                    if (events[i].time < today.getTime()) {
                        self.pastEvents.push(events[i]);
                    } else {
                        self.futureEvents.push(events[i]);
                    }
                }
            }
        };
        xhr.open("GET", "data/talks.json", true);
        xhr.send();
    }

    return {
        viewModel: vm,
        template: template
    }
});
