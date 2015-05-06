var args = arguments[0] || {};

$.request_invite.addEventListener('click', function() {
	
	Alloy.createController('auth/request_invitation').getView().open();
});

$.create_account.addEventListener('click', function() {
	
	var registerWindow = Alloy.createController('auth/register').getView();
	
	// We now have to create a facebook proxy for Android (FB module > 4.0) 
	if (OS_ANDROID) {
	
		registerWindow.fbProxy = Alloy.Globals.Facebook.createActivityWorker({lifecycleContainer: registerWindow});
	}
	
	registerWindow.open();
});