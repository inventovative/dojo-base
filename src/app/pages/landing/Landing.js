define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/text!./html/Landing.html',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase',
	'app/components/navbar/Navbar'
], function (
	declare,
	on,
	template,
	_TemplatedMixin,
	_WidgetBase,
	Navbar
) {
	return declare('app.pages.landing.Landing', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		someListener: null,
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
