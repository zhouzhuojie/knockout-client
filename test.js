Tinytest.add('Knockout can be initalized', function (test) {
    test.isNotNull(ko, 'ko should exist');
    test.isNotNull(ko.meteor, 'ko.meteor should exist');
    test.isNotNull(ko.validation, 'ko.validation should exist');
    test.isTrue(typeof(ko.meteor.find) === "function", 'ko.meteor.find should be a function');
    test.isTrue(typeof(ko.meteor.findOne) === "function", 'ko.meteor.findOne should be a function');
    test.isTrue(typeof(ko.mapping.fromJS) === "function", 'ko.mapping.fromJS should be a function');
});

Tinytest.add('Knockout data-bind works', function (test) {
    var div = document.createElement('div');
    Blaze.render(Template.testKo, div);
    document.body.appendChild(div);
    test.isTrue($('#hi').length === 1);

    // Template HTML
    // <template name="testKo">
    //    <div data-bind="text: hi" id="hi"></div>
    // </template>
    var ViewModel = function(hi){
        this.hi = ko.observable(hi);
    }
    var vm = new ViewModel('Hiiiiiii');
    ko.applyBindings(vm);
    test.isTrue($('#hi').text() === 'Hiiiiiii');
    document.body.removeChild(div);
});
