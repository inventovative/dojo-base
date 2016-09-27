define([
	'dojo/_base/declare',
	'dojo/_base/window',
	'dojo/dom-class',
	'dojo/dom-style',
	'dojo/on',
	'dojo/router',
	'dojo/text!./html/Navbar.html',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase',
	'app/services/auth'
], function (
	declare,
	win,
	domClass,
	domStyle,
	on,
	router,
	template,
	_TemplatedMixin,
	_WidgetBase,
	auth
) {
	// Get the <body> DOM
	var body = win.body();

	// Declare the Navbar class
	var Navbar = declare('app.components.navbar.Navbar', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		hidden: true,
		postCreate: function () {
			var context = this;

			context.inherited(arguments);

			context.own(on(context.logoutNode, 'click', function () {
				auth.setLoginStatus(false).then(function () {
					router.go('/login');
				});
			}));
		},
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
