Package.describe({
  summary: "Knockout Client for Meteor",
  version: "0.1.0",
  git: "https://github.com/zhouzhuojie/knockout-client.git",
  name: "mrt:knockout-client"
});

Package.on_use(function (api) {
  api.add_files('lib/knockout/knockout-3.1.0.debug.js', 'client');
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
      api.use(['mrt:knock-client', 'tinytest', 'test-helpers'], ['client']);
    } else {
      api.use(['knock-client', 'tinytest', 'test-helpers'], ['client']);
    }
    api.add_files('test-mrt:knock-client.js', ['client']);
  });
}
