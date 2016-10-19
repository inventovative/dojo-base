define([
	'dojo/_base/declare',
	'dojo/html',
	'dojo/text!./html/UserCell.html',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetBase'
], function (
	declare,
	html,
	template,
	_TemplatedMixin,
	_WidgetBase
) {
	return declare('app.cells.usercell.UserCell', [_WidgetBase, _TemplatedMixin], {
		templateString: template,
		setting: null,
		construct: function (setting) {
			var context = this;

			context.setting = setting;
			context.setupContent();
		},
		setupContent: function () {
			var context = this;

			/** 
			 * Sample context.setting contents
			 *
			 * context.setting = {
			 * 	user_mobile: "018399687",
			 * 	user_email: "sbs.yoona1@gmail.com",
			 * 	smsflg: "N",
			 * 	mailflg: "N",
			 * 	crud_flag: "N",
			 * 	tracenum: 0,
			 * 	userid: "maybankadmin"
			 * };
			 *
			 **/

			html.set(context.userNode, context.setting.userid);
			context.smsNode.checked = context.getBooleanFromStringValue(context.setting.smsflg);
			context.emailNode.checked = context.getBooleanFromStringValue(context.setting.mailflg)
		},
		// Will be called from SampleApplication.js on 'Save' button click
		onSave: function () {
			var context = this;

			var dataToPass = {
				userid: context.setting.userid
			};

			var hasChanged = false;

			if (context.smsNode.checked !== context.getBooleanFromStringValue(context.setting.smsflg)) {
				hasChanged = true;
				dataToPass.smsflg = context.getStringFromBooleanValue(context.smsNode.checked);
			}

			if (context.emailNode.checked !== context.getBooleanFromStringValue(context.setting.mailflg)) {
				hasChanged = true;
				dataToPass.mailflg = context.getStringFromBooleanValue(context.emailNode.checked);
			}

			if (hasChanged) {
				switch (context.setting.crud_flag) {
					case 'N':
						dataToPass.crud_flag = 'C';
						break;

					case 'R':
						dataToPass.crud_flag = 'U';
						break;
				}

				context.setting.callback(dataToPass);
			}
		},
		// To convert 'Y' and 'N' to boolean
		getBooleanFromStringValue: function (value) {
			switch (value) {
				case 'Y':
					return true;

				case 'N':
					return false;
			}
		},
		// To convert boolen to 'Y' and 'N'
		getStringFromBooleanValue: function (value) {
			switch (value) {
				case true:
					return 'Y';

				case false:
					return 'N';
			}
		}
	});
});
