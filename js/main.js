// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    paths: {
        bootstrap: 'libs/bootstrap',
        jquery: 'libs/jquery',
        knockout: 'libs/knockout',
        crossroads: "libs/crossroads",
        signals: "libs/signals",
        hasher: "libs/hasher",
        highlight: "ko_binding_highlight"
    },
    shim: {
        "hasher": {deps: ["crossroads"]},
        "crossroads": {deps: ["signals"]},
        "bootstrap": { deps: ["jquery"] }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['start']);