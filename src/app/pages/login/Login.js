define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/router',
	'dojo/text!./html/Login.html',
	'app/pages/PageWidget',
	'app/services/auth'
], function (
	declare,
	on,
	router,
	template,
	PageWidget,
	auth
) {
	return declare('app.pages.login.Login', [PageWidget], {
		templateString: template,
		navbar: false, // Hide navbar before rendering
		postCreate: function () {
			this.inherited(arguments);

			var context = this;

			context.own(on(context.loginNode, 'click', function (evt) {
				// Prevent the default behaviour of buttons in the <form> tag
				// If not included, the url will have a '?' before the hash
				// Try to comment evt.preventDefault() and see what happens
				// when you click Sign in
				evt.preventDefault();

				// login service to call API here
				
				auth.setLoginStatus(true).then(function () {
					router.go('/home');
				});
			}));
		}
	});
});