'use stict';

$(document).ready(function () {
	//apply flip animation to social icons
	$('.social img').hover(function () {
		$(this).toggleClass('animated flip');
	});

	//apply hover effect to main menu blocks
	$('.left-block').hover(function () {
		$(this).toggleClass('left-block-hover');
	});
	$('.left-center-block').hover(function () {
		$(this).toggleClass('left-center-block-hover');
	});

	$('.right-center-block').hover(function () {
		$(this).toggleClass('right-center-block-hover');
	});

	$('.right-block').hover(function () {
		$(this).toggleClass('right-block-hover');
	});
	//apply hover effect to top menu
	$('.menu-overlay li').hover(function () {
		$(this).toggleClass('menu-overlay-hover');
	});

	//make block slide up effect for upcoming event blocks
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200)
		});

	//make box behind slideshow text dynamically resize
	// $('.slideshow div').each(function () {
	// 	var newHeight = 0;
	// 	// var newWidth = $(this).first().width();
	// 		// newWidth = $(this).width();
	// 	$(this).children().not(':last-child').each(function (i) {
	// 		newHeight += $(this).height();
	// 	});

	// 		console.log(newHeight);
	// 		$(this).children(':first').css('line-height', newHeight);
	// 	// $(this).height(newHeight);
	// 	// $(this).width(newWidth);
	// 	// $(this).css('left', '100px')
	// });

})