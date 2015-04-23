Package.describe({
    summary: "Knockout Client for Meteor",
    version: "0.2.0",
    git: "https://github.com/zhouzhuojie/knockout-client.git",
    name: "mrt:knockout-client"
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');
    api.use('jquery@1.0.0', 'client');
    api.add_files('lib/knockout/knockout-3.2.0.debug.js', 'client');
    api.add_files('main.js', 'client');
    api.add_files('lib/knockout/knockout.mapping.js', 'client');
    api.add_files('lib/knockout.validation/knockout.validation.js', 'client');
    api.add_files('lib/knockout.validation/en-US.js', 'client');
    api.add_files('lib/knockout.meteor/knockout.meteor.js', 'client');
    api.export('ko', 'client');
});

Package.onTest(function(api){
    api.use([
        'mrt:knockout-client',
        'tinytest',
        'jquery',
        'templating'
    ], 'client');
    api.add_files('test.html', 'client');
    api.add_files('test.js', 'client');
});
