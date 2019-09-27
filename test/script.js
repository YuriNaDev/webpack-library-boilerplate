$(function() {
	var $head = $('.kma-table-head')
	var $body = $('.kma-table-body')
	var lastX = $body.scrollLeft()
	$body.on('scroll', function() {
		var currX = $body.scrollLeft()
		if (lastX !== currX) {
			// $head.css('left', -currX)
			$head.css('transform', 'translateX(' + -currX + 'px)')
			lastX = currX
		}
	})
})

// $(window).on('load', function() {
// 	var $head = $('.kma-table-head')
// 	var $body = $('.kma-table-body')
// 	$body.css('height', 'calc(100% - ' + $head.height() + 'px)')
// })
