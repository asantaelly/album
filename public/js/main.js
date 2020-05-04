// script for navbar editing when scrolling
$(document).ready(function () {
	$(window).scroll(function () {
		var scroll = $(window).scrollTop()
		if (scroll > 300) {
			$('.navbar-custom').css('background-color', '#0F3561!important')
		} else {
			$('.navbar-custom').css('background-color', 'transparent!important')
		}
	})
})
