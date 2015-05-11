var args = arguments[0] || {};
var moment = require('alloy/moment');

var tabMapping = {
	about : {
		title : L('profile'),
		controller : 'profile/profile_about'
	},
	favorite : {
		title : L('favorite_items'),
		controller : 'profile/profile_favorite'
	},
	shops : {
		title : L('favorite_shops'),
		controller : 'profile/profile_shops'
	},
	feedback : {
		title : L('feedback'),
		controller : 'profile/profile_feedback'
	},
};

function openTab(tab, data) {

	$.tabTitle.text = tabMapping[tab].title.toUpperCase();

	$.tabContent.removeAllChildren();
	$.tabContent.add(Alloy.createController(tabMapping[tab].controller, data).getView());
}

if (args.user_id) {

	Alloy.Globals.API.getUser(args.user_id, function(result) {

		$.avatar.image = result.avatar_medium.image;
		$.userName.text = result.firstname + ' ' + result.lastname;
		$.gender.text = result.gender ? result.gender : '';

		var date = moment(result.date_added);

		$.joined.text = 'Joined ' + date.format("MMMM D, YYYY");

		if (result.city && result.country_iso_code_3) {

			$.userLocation.text = result.city + ', ' + result.country_iso_code_3;
		} else if (result.city || result.country_iso_code_3) {

			$.userLocation.text = result.city || result.country_iso_code_3;
		}

		openTab('about', result);

		//$.tabTitle.addEventListener('click', function() {

			//var selectList = [];

			//for (var i in tabMapping) { 
 
//				selectList.push(tabMapping[i].title);
	//		}

		//	var popupDialog = Alloy.createWidget('ti.ux.popup.list', 'widget', {
			//	options : selectList,
	//		});

	//		popupDialog.getView('table').addEventListener('click', function(e) {

		//		openTab(tabMapping[e.index], result);
		//		popupDialog.hide();
		//	});

		//	popupDialog.getView().show();
		//});

	}, function(error) {

	});
}

