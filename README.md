knockout-client
==============

**Knockout** is a JavaScript MVVM (a modern variant of MVC) library that makes it easier to create rich, desktop-like user interfaces with JavaScript and HTML. It uses observers to make your UI automatically stay in sync with an underlying data model, along with a powerful and extensible set of declarative bindings to enable productive development.

Meteor makes it an order of magnitude simpler and a lot more fun to build webapps. However, we still want to have a MV* frontend framework in Meteor. Handlebar uses '{{}}', which is conflict with frameworks like AngularJs and EmberJs. So 'data-bind' like frameworks (e.g. Knockout) play nicely with Meteor. 

`knockout-client` is fully compatible and ready to use. Please note, this version is hosted on atmosphere as `knockout-client` simply because the orignal `meteor-knockout` has not been update for some time.  

### Install

```bash
mrt add knockout-client
```

### Package Description

This package exposes `ko` to the global namespace. Compatible with Meteor `0.6.4.1` and `0.6.5`.

`knockout-client` includes some useful plugins:

* `ko` -- knockout base, see its [doc](http://knockoutjs.com/documentation/introduction.html).
* `ko.mapping` -- knockout mapping, see its [doc](http://knockoutjs.com/documentation/plugins-mapping.html).
* `ko.meteor` -- knockout meteor bridge. Thanks to [steveluscher/knockout.meteor](https://github.com/steveluscher/knockout.meteor). It expose two apis:
	* `ko.meteor.find`
	* `ko.meteor.findOne`
	* Details can be found at [ko.meteor](#kometeor) section.
* `ko.validation` -- knockout validation plugin. Thanks to [ericmbarnard/Knockout-Validation](https://github.com/ericmbarnard/Knockout-Validation).
	* Details can be found at [ko.validation](#kovalidation) section.

If you are looking for a knockout based routing framework, please consider package `knockout-client-pager`. see [zhouzhuojie/knockout-client-pager]()

### A guide to integrating knockout-client

#### Quickstart

In client side:
```javascript
Meteor.startup(function(){
	// Here's my data model
	var ViewModel = function(first, last) {
    	this.firstName = ko.observable(first);
    	this.lastName = ko.observable(last);
 
    	this.fullName = ko.computed(function() {
        	// Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        	return this.firstName() + " " + this.lastName();
    	}, this);
	};
 
	ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work
});
```

In html template:
```html
<template name="foo">
	<p>First name: <input data-bind="value: firstName" /></p>
	<p>Last name: <input data-bind="value: lastName" /></p>
	<h2>Hello, <span data-bind="text: fullName"> </span>!</h2>
</template>
```

Other `data-bind` attributes please refer to the great document of [Knockout](http://knockoutjs.com/documentation/introduction.html).

#### Deal with reactive template refreshing
Sometimes you may want to prevent it from reactive template refreshing, because reactive refresh will leave the data-bind unattached. 

so you can either 

* wrap the html content with `{{#constant}}...{{/constant}}`, like

```html
<template name="foo">
	{{#constant}}
	<p>First name: <input data-bind="value: firstName" /></p>
	<p>Last name: <input data-bind="value: lastName" /></p>
	<h2>Hello, <span data-bind="text: fullName"> </span>!</h2>
	{{/constant}}
</template>
```

or 

* put the `ko.applyBindings(...)` in `Template.foo.rendered = function(){...}`, like

```javascript
Template.foo.rendered = function(){
	// Here's my data model
	var ViewModel = function(first, last) {
    	this.firstName = ko.observable(first);
    	this.lastName = ko.observable(last);
 
    	this.fullName = ko.computed(function() {
        	// Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        	return this.firstName() + " " + this.lastName();
    	}, this);
	};
 
	ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work
};
```

#### ko.meteor

##### In the view model:

Use `ko.meteor.find()` and `ko.meteor.findOne()` like you would normally use `ko.observableArray()` and `ko.observable()`:

```javascript
var viewModel = {
  unfinishedTodos: ko.meteor.find(Todos, {done: false}),
  finishedTodos: ko.meteor.find(Todos, {done: true}),
  oldestUnfinishedTodo: ko.meteor.findOne(Todos, {done: true}, {sort: {created_at:1}})
};
Meteor.startup( function() { ko.applyBindings(viewModel); } );
```

##### In the html template

For **multiple cursor** like `ko.meteor.find()`, use `data-bind="foreach: foobar"`.
```html
<ul data-bind="foreach: unfinishedTodos">
  <li data-bind="text: title"></li>
</ul>
```

For **single cursor** like `ko.meteor.findOne()`, you can still use `data-bind="foreach: foobar"`
```
<ul data-bind="foreach: oldestUnfinishedTodo">
  <li data-bind="text: title"></li>
</ul>
```
or `data-bind="with: foobar"`
```
<ul data-bind="with: oldestUnfinishedTodo">
  <li data-bind="text: title"></li>
</ul>
```
or knockout's context definition `<!-- ko with: foobar --> ... <!-- /ko -->`

```
<!-- ko with:  oldestUnfinishedTodo -->
  <p data-bind="text: title"></p>
<!-- /ko -->
```

For more information, see [steveluscher/knockout.meteor](https://github.com/steveluscher/knockout.meteor).

#### ko.validation

Before you get started with `ko.validation`, you need to configure it.
```javascript
Meteor.startup(function(){
  	ko.validation.configure({
  		registerExtenders: true,
  		messgaesOnModified: true
	});
});
```
and then define your rules into ko observables with `.extend(...)`.
```javascript
var ViewModel = function(first, last) {
    this.firstName = ko.observable(first).extend({ minLength: 3 });
    this.lastName = ko.observable(last).extend({ required: true });
};
```
For more information, see [ericmbarnard/Knockout-Validation](https://github.com/ericmbarnard/Knockout-Validation).