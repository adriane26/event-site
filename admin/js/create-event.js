'use strict';
$(document).ready(function () {
	var $addEventMenuTab = $('#addEventSection');
	var $adminHeader = $('#admin-header');
	$('#add-event-menu-tab').click(function () {
		$('#mainAdmin').children().hide();
		$adminHeader.html('<h1>Create Your Event</h1>');
		$addEventMenuTab.show();
	});

	// $('#createEventButton').click(alert('hola'));
})