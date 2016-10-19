define([
	'dojo/_base/array',
	'dojo/_base/declare',
	'dojo/on',
	'dojo/text!./html/SampleApplication.html',
	'app/cells/usercell/UserCell',
	'app/pages/PageWidget'
], function (
	array,
	declare,
	on,
	template,
	UserCell,
	PageWidget
) {
	return declare('app.pages.sampleapplication.SampleApplication', [PageWidget], {
		templateString: template,
		saveData: null,
		userCells: null,
		startup: function () {
			this.inherited(arguments);

			var context = this;

			context.userCells = [];

			context.setupContent();
			context.initInteraction();
		},
		setupContent: function () {
			var context = this;

			// Data will be retrieved from REST call
			// In this case, it is hardcoded
			var response = {
				"list": [{
					"user_mobile": "018399687",
					"user_email": "sbs.yoona1@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "maybankadmin"
				}, {
					"user_mobile": "1234123",
					"user_email": "sbs.yoona@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "user1"
				}, {
					"user_mobile": "0123456789",
					"user_email": "aliceeee@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "Alice"
				}, {
					"user_mobile": "1120159104",
					"user_email": "zhao.95@msn.cn",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY10"
				}, {
					"user_mobile": "0123445564",
					"user_email": "khamarulmokhtar8904@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "A234"
				}, {
					"user_mobile": "0123456789",
					"user_email": "infoprodemo1@gmail.com",
					"smsflg": "Y",
					"mailflg": "Y",
					"crud_flag": "R",
					"tracenum": 0,
					"userid": "JENNY4"
				}, {
					"user_mobile": "01120159104",
					"user_email": "rzlee@infopro.com.my",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY3"
				}, {
					"user_mobile": "34535345",
					"user_email": "pro12@yahoo.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "A112232"
				}, {
					"user_mobile": "176570624",
					"user_email": "rongzhao195@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY8"
				}, {
					"user_mobile": "122371715",
					"user_email": "testt4936@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "tester1"
				}, {
					"user_mobile": "1765624",
					"user_email": "iunknown2013@gmail.com",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY9"
				}, {
					"user_mobile": "0123456789",
					"user_email": "khamarul@infopro.com.my",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY"
				}, {
					"user_mobile": "016570624",
					"user_email": "jenny11@infopro.com.my",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY1"
				}, {
					"user_mobile": "0122377775",
					"user_email": "jenny2@infopro.com.my",
					"smsflg": "N",
					"mailflg": "N",
					"crud_flag": "N",
					"tracenum": 0,
					"userid": "JENNY2"
				}],
				"org_id": "ORG002",
				"account_type": "SA",
				"alertcd": "4",
				"acno": "002400100212992",
				"errorcode": "0",
				"errordesc": "Successful",
				"tracenum": 0,
				"userid": "maybankadmin"
			};

			// Populate to cell
			array.forEach(response.list, function (single) {
				var userCell = new UserCell();
				userCell.placeAt(context.usersContainerNode);
				userCell.construct(single);

				context.userCells.push(userCell);
			});
		},
		initInteraction: function () {
			var context = this;

			on(context.saveNode, 'click', function () {
				// reinitialise context.saveData everytime the save node is clicked
				context.saveData = [];

				array.forEach(context.userCells, function (userCell) {
					// Call each onSave methods on each cells
					var data = userCell.onSave();

					if (data !== null) {
						context.saveData.push(data);
					}
				});

				// Send this over to BE
				console.log(context.saveData);
			});
		}
	});
});
