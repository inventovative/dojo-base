define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/text!./html/Components.html',
	'app/pages/PageWidget'
], function (
	declare,
	on,
	template,
	PageWidget
) {
	return declare('app.pages.components.Components', [PageWidget], {
		templateString: template,
		postCreate: function () {
			this.inherited(arguments);

			var context = this;
		}
	});
});
