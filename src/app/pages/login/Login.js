define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/router',
	'dojo/text!./html/Login.html',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase'
], function (
	declare,
	on,
	router,
	template,
	_TemplatedMixin,
	_WidgetBase
) {
	return declare('app.pages.login.Login', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		postCreate: function () {
			this.inherited(arguments);

			var context = this;

			context.own(on(context.loginNode, 'click', function (evt) {
				// Prevent the default behaviour of buttons in the <form> tag
				// If not included, the url will have a '?' before the hash
				// Try to comment evt.preventDefault() and see what happens
				// when you click Sign in
				evt.preventDefault();
				router.go('/home');
			}));
		}
	});
});