Tinytest.add('Knockout can be initalized', function (test) {
  test.isNotNull(ko, 'ko should exist');
  test.isNotNull(ko.meteor, 'ko.meteor should exist');
  test.isNotNull(ko.validation, 'ko.validation should exist');
  test.isTrue(typeof(ko.meteor.find) === "function", 'ko.meteor.find should be a function');
  test.isTrue(typeof(ko.meteor.findOne) === "function", 'ko.meteor.findOne should be a function');
});
