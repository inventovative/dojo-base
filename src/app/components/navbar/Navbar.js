define([
	'dojo/_base/declare',
	'dojo/_base/window',
	'dojo/dom-class',
	'dojo/dom-style',
	'dojo/text!./html/Navbar.html',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase'
], function (
	declare,
	win,
	domClass,
	domStyle,
	template,
	_TemplatedMixin,
	_WidgetBase
) {
	// Get the <body> DOM
	var body = win.body();

	// Declare the Navbar class
	var Navbar = declare('app.components.navbar.Navbar', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		hidden: true,
		_setHiddenAttr: function (shouldHide) {
			var context = this;
			var domNode = this.domNode;

			if (shouldHide) {
				domStyle.set(domNode, 'display', 'none');
				domClass.remove(body, 'p-t-70');
			} else {
				domStyle.set(domNode, 'display', 'block');
				domClass.add(body, 'p-t-70');
			}

			context._set('hidden', shouldHide);
		}
	});

	// Instantiate the Navbar class as a singleton
	var navbar = new Navbar();

	var containerNode;

	// An object that will be returned from this module
	return {
		init: function (node) {
			containerNode = node;
			
			if (containerNode !== undefined) {
				navbar.placeAt(containerNode);
				navbar.startup();
			} else {
				throw new Error('containerNode is undefined.');
			}
		},
		hide: function () {
			navbar.set('hidden', true);
		},
		show: function () {
			navbar.set('hidden', false);
		}
	};
});
