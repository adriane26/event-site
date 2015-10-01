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
	// $('.menu-overlay li').hover(function () {
	// 	$(this).toggleClass('menu-overlay-hover');
	// });

	//make block slide up effect for upcoming event blocks
	$('.event_block').hover(
		function () {
		$(this).find('div').stop(true, true).animate({'bottom': '0'}, 200);
		},
		function () {
			$(this).find('div').stop(true, true).animate({'bottom': '-100%'}, 200)
		});

	function changeSize (div) {
		// var $eventBlock = $('.event_block');
		var tallestBlock = 0;
		div.each(function () {
			if ($(this).height() > tallestBlock) {
				tallestBlock = $(this).height();
			}
		})

		div.each(function () {
			$(this).height(tallestBlock);
		})
	}

 	// show upcoming sub-menu when hovered
 	$('.upcoming-menu').hover(
 		function () {
 		var $menuHeight = $('.upcoming-menu').height();
 		var $menuWidth  = $('.upcoming-menu').width();
 		$('.upcoming-sub-menu:first').css('margin-top', $menuHeight);
 		$('.expanding-menu').height($(this).parent());
 		$('.expanding-menu').width($menuWidth);
 		$('.upcoming-sub-menu').slideDown('fast');
 		$('.upcoming-sub-menu').css('display', 'inline');
 		},
 		function () {

 			if ($('.expanding-menu').is(':hover')) {
 				$('.upcoming-sub-menu').css('display', 'inline');
 			} else {
 				$('.upcoming-sub-menu').slideUp('fast');
 			}
 		}
	);

	$('.expanding-menu').hover(function () {
		$('.upcoming-sub-menu').css('display', 'inline');
		},
		function () {
			$('.upcoming-sub-menu').slideUp('fast');
		}
	)

	// $('.upcoming-sub-menu').hover(
 // 		function () {
 // 		var $menuHeight = $('.upcoming-menu').height();
 // 		var $menuWidth  = $('.upcoming-menu').width();
 // 		$('.upcoming-sub-menu:first').css('margin-top', $menuHeight);
 // 		$('.expanding-menu').height($(this).parent());
 // 		$('.expanding-menu').width($menuWidth);
 // 		$('.upcoming-sub-menu').css('display', 'inline');
 // 		},
 // 		function () {
 // 			$('.upcoming-sub-menu:first').css('margin-top', '');
 // 			$('.expanding-menu').height('');
 // 			$('.expanding-menu').width('');
 // 			$('.upcoming-sub-menu').slideUp('fast');
 // 		}
	// );

 // 	$('.upcoming-sub-menu').hover(
 // 		function () {
 // 		var $menuHeight = $('.upcoming-menu').height();
 // 		var $menuWidth  = $('.upcoming-menu').width();
 // 		// $('.upcoming-sub-menu:first').css('margin-top', $menuHeight);
 // 		// $('.expanding-menu').height($(this).parent());
 // 		// $('.expanding-menu').width($menuWidth);
 // 		$('.upcoming-sub-menu').css('display', 'inline-block');
 // 		},
 // 		function () {
 // 			// $('.upcoming-sub-menu:first').css('margin-top', '');
 // 			// $('.expanding-menu').height('');
 // 			// $('.expanding-menu').width('');
 // 			$('.upcoming-sub-menu').css('display', 'hide');
 // 		}	
	// )

	$(window).resize(changeSize($('.event_block')));
	$(window).load(changeSize($('.event_block')));
	$(window).resize(changeSize($('.past_events')));
	$(window).load(changeSize($('.past_events')));
	$(window).load(changeSize($('.individual-homepage-expert')));

	//make mobile menu slide up and down when it's pressed

	$('.hamburger-menu').click(function () {
		// $('.mobile-menu:first').toggleClass('add-space');
  	if ($('.hidden-div').is(':hidden')) {
  	  $('.hidden-div').slideDown('slow');
  	  $('.menu-overlay').css('height', '100%');
  	} else {
  	  $('.hidden-div').slideUp('slow');
  	  $('.menu-overlay').css('height', '');
  	}
	});

	//make past events buttons and homepage content full width on mobile

	// function fullWidthMobile(div) {
	// 	if ($(window).width() < 768) {
	// 		div.addClass('flex');
	// 	}
	// 	if ($(window).width() > 768) {
	// 		div.removeClass('flex');
	// 	}
		
	// }

	// $(window).resize(fullWidthMobile($('.past-events-menu')));
	// $(window).load(fullWidthMobile($('.past-events-menu')));
	// $(window).resize(fullWidthMobile($('.main-page-content')));
	// $(window).load(fullWidthMobile($('.main-page-content')));

	//make footer stick to bottom of content or page, whichever is taller

	function stickyFooter(foot) {
	  var footerHeight = foot.height();
	  var heightDiff = $(window).height() - $('body').height() + footerHeight;
	  if ($(window).height() > $('body').outerHeight(true) + footerHeight + 20) {
	    foot.addClass('stick-footer');
	    $('body').css('margin-bottom', footerHeight);
	  }

	  if ($(window).height() <= $('body').outerHeight(true) + footerHeight + 20) {
	  	foot.removeClass('stick-footer');
	  	$('body').css('margin-bottom', 0);
	  }
	}

	$(window).load(stickyFooter($('.footer-at-bottom')));

	$(window).resize(stickyFooter($('.footer-at-bottom')));

	//hide slider on phones

	function addCSS(changeWidth, div, cssProp, smallScreenVal, largeScreenVal) {
		if ($(window).width() < changeWidth) {
			div.css(cssProp, smallScreenVal);
		}
		if ($(window).width() > changeWidth) {
			div.css(cssProp, largeScreenVal);
		}
		
	}

	$(window).load(addCSS(768, $('.slider'), 'display', 'none', 'inline'));
	$(window).resize(addCSS(768, $('.slider'), 'display', 'none', 'inline'));

	//make bottom button scroll to top
	$('.scroll-button .fa-chevron-up').click( function() {
   $('html, body').animate({ scrollTop: 0 }, 'fast');
 	});


})
