define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/text!./html/Landing.html',
	'app/components/navbar/Navbar',
	'app/pages/PageWidget'
], function (
	declare,
	on,
	template,
	Navbar,
	PageWidget
) {
	return declare('app.pages.landing.Landing', [PageWidget], {
		templateString: template,
		postCreate: function () {
			this.inherited(arguments);

			var context = this;

			context.own(on(context.clickNode, 'click', function () {
				alert('I am clicked!');
			}));

			context.own(on(context.hideNavbarNode, 'click', function () {
				Navbar.hide();
			}));

			context.own(on(context.showNavbarNode, 'click', function () {
				Navbar.show();
			}));
		}
	});
});
