define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/text!./html/Services.html',
	'app/components/navbar/Navbar',
	'app/pages/PageWidget'
], function (
	declare,
	on,
	template,
	Navbar,
	PageWidget
) {
	return declare('app.pages.services.Services', [PageWidget], {
		templateString: template,
		postCreate: function () {
			this.inherited(arguments);

			var context = this;

			context.own(on(context.hideNavbarNode, 'click', function () {
				Navbar.hide();
			}));

			context.own(on(context.showNavbarNode, 'click', function () {
				Navbar.show();
			}));
		}
	});
});
