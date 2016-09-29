define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/text!./html/Landing.html',
	'app/pages/PageWidget'
], function (
	declare,
	on,
	template,
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
		}
	});
});
