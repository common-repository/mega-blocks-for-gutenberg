jQuery(document).ready(function($) {
	setTimeout(function() {
		jQuery('.static-caption-zoom, .caption-slide-up, .zoom-image-in-caption-twist, .zoom-out-twist, .zoom-caption-out-image-in, .zoom-out, .slide-left-to-right, .slide-right-to-left, .slide-top-to-bottom, .slide-bottom-to-top, image-turn-around, .zoom-and-pan, .move-image-right, .move-image-left, .move-image-top, .move-image-bottom').closest('.image-caption-box').css('overflow', 'hidden');
		jQuery('.flip-image-vertical, .flip-image-horizontal, .flip-image-vertical-back, .flip-image-horizontal-back, .page-turn-from-top, .page-turn-from-bottom, .page-turn-from-right, .page-turn-from-left').closest('.image-caption-box').css({
			'-webkit-perspective'		: '2500px',
			'perspective'				: '2500px',
			'-webkit-perspective-origin': '50% 50%',
			'perspective-origin': '50% 50%',
		});
	}, 500);
	jQuery('select').change(function(event) {
		jQuery('.static-caption-zoom, .caption-slide-up, .zoom-image-in-caption-twist, .zoom-out-twist, .zoom-caption-out-image-in, .zoom-out, .slide-left-to-right, .slide-right-to-left, .slide-top-to-bottom, .slide-bottom-to-top, image-turn-around, .zoom-and-pan, .move-image-right, .move-image-left, .move-image-top, .move-image-bottom').closest('.image-caption-box').css('overflow', 'hidden');
		jQuery('.flip-image-vertical, .flip-image-horizontal, .flip-image-vertical-back, .flip-image-horizontal-back, .page-turn-from-top, .page-turn-from-bottom, .page-turn-from-right, .page-turn-from-left').closest('.image-caption-box').css({
			'-webkit-perspective'		: '2500px',
			'perspective'				: '2500px',
			'-webkit-perspective-origin': '50% 50%',
			'perspective-origin': '50% 50%',
		});
	});
});