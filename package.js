Package.describe({
  summary: "Knockout Client for Meteor",
  version: "0.1.2",
  git: "https://github.com/zhouzhuojie/knockout-client.git",
  name: "mrt:knockout-client"
});

Package.on_use(function (api) {
  api.use('jquery@1.0.0', 'client');
  api.add_files('lib/knockout/knockout-3.2.0.debug.js', 'client');
  api.add_files('main.js', 'client');
  api.add_files('lib/knockout/knockout.mapping.js', 'client');
  api.add_files('lib/knockout.validation/knockout.validation.js', 'client');
  api.add_files('lib/knockout.validation/en-US.js', 'client');
  api.add_files('lib/knockout.meteor/knockout.meteor.js', 'client');
  if (api.export){
    api.export('ko', 'client');
  }
});

if (Package.on_test) {
  Package.on_test(function (api) {
    if (Package.onTest) {
      api.use(['mrt:knockout-client', 'tinytest', 'test-helpers'], ['client']);
    } else {
      api.use(['knockout-client', 'tinytest', 'test-helpers'], ['client']);
    }
    api.add_files('test-mrt:knockout-client.js', ['client']);
  });
}
