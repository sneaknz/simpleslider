/* 
	Simple Slider plugin
	v1.0.0
	Mike Harding
	
	A jQuery plugin to create a slider out of an unordered list (or other items within a container)

	For usage see http://code.sneak.co.nz/simpleslider/
	
	Usage: 		
	
	$('ul').simpleSlider({
		show: 4,
		interval: 4,
		size: 698,
		orientation: 'vertical',
		clickevent: function(){
			$(this).parent().find('li').stop().animate({ opacity : 1 });
			$(this).stop().animate({ opacity : 0.4 });
			return false;
		}
	});	
*/
(function($) {
	$.fn.simpleSlider = function(options) {

		var set = $.extend({}, $.fn.simpleSlider.defaultOptions, options);

		return this.each(function() {
			// var $this = $(this);

			var $wrapper,
				$slider = $(this),
				$children = $(this).children(set.children),
				$prev,
				$next,
				horz;
			
			var isSliderAnimating = false;
			var activeIndex = 0;

			if( set.orientation == 'horizontal' ){
				horz = true;
			}
			
			var clc = {
				init : function(){
					clc.detectEasing();
					clc.structure();
					clc.navigation();
					clc.animateItems();
				},
				detectEasing : function(){
					if( !$.easing.def ) {
						if( set.easing != 'swing' && set.easing != 'linear') {
							set.easing = 'swing';
						}
					}
				},
				structure : function(){
					$slider
						.addClass('simple-slider')
						.wrap('<div class="simple-slider-mask"></div>')
						.parent()
						.wrap('<div class="simple-slider-wrap"></div>');
					$wrapper = $slider.closest('.simple-slider-wrap');
					$wrapper.addClass( 'simple-slider-'+set.orientation );

					if( set.size ){
						if( horz ){
							$wrapper.find('.simple-slider-mask').width( set.size );
						} else {
							$wrapper.find('.simple-slider-mask').height( set.size );
						}
					}
					
					if( horz ){
						var itemsWidth = 0;
						$children.each(function() { 
							itemsWidth += $(this).outerWidth(true);
						});
						$slider.width( itemsWidth );
					}
					
					clc.items();
				},
				checkIndex : function(){
					// Limit max movement to length - visible items
					var numItems = $children.length;

					if (activeIndex >= numItems - set.show) {
						$next.addClass('simple-slider-disabled');
						activeIndex = numItems - set.show;
					} else {
						$next.removeClass('simple-slider-disabled');
					}	
					if (activeIndex <= 0) {
						activeIndex = 0;
						$prev.addClass('simple-slider-disabled');
					} else {
						$prev.removeClass('simple-slider-disabled');
					}
				},
				animateItems : function(){
					clc.checkIndex();

					var sliderOffset = 0;
					for ( var i = 0; i < activeIndex; i++ ){
						if( horz ){
							sliderOffset += $children.eq(i).outerWidth(true);
						} else {
							sliderOffset += $children.eq(i).outerHeight(true);
						}
					}
					
					if( horz ){
						$slider.stop().animate({
							left: -sliderOffset
						}, set.speed, set.easing, function() {
							isSliderAnimating = false;
						});
					} else {
						$slider.stop().animate({
							top: -sliderOffset
						}, set.speed, set.easing, function() {
							isSliderAnimating = false;
						});
					}
				},
				navigation : function(){
					var $nav = '<ul class="simple-slider-nav"><li class="simple-slider-prev"><a href="#"><span>'+set.prevlabel+'</span></a></li><li class="simple-slider-next"><a href="#"><span>'+set.nextlabel+'</span></a></li></ul>';
					$wrapper.append($nav);
					
					$prev = $wrapper.find('li.simple-slider-prev a');
					$next = $wrapper.find('li.simple-slider-next a');
					
					$wrapper.find('.simple-slider-nav a').click(function() {
						if (!isSliderAnimating && !($(this).hasClass('simple-slider-disabled'))) {
							isSliderAnimating = true;	

							if( $(this).parent().hasClass('simple-slider-prev') ) {
								if( set.interval ){
									activeIndex -= set.interval;
									if( activeIndex < 0 ) {
										activeIndex = 0;
									}
								} else {
									activeIndex--;
								}
							}

							if( $(this).parent().hasClass('simple-slider-next') ) {
								if( set.interval ){
									activeIndex += set.interval;
									if( activeIndex >= $children.length ) {
										activeIndex = $children.length;
									}
								} else {
									activeIndex++;
								}
							}
							
							clc.animateItems();
						}
						return false;
					});
				},
				items : function(){
					$children.click(function(){
						if ( typeof set.clickevent == 'function' ) {
							clc.selectitem( $(this) );
							set.clickevent.call( $(this) );
						}
					});
				},
				selectitem : function(item){
					$children.removeClass('simple-slider-selected');
					$(item).addClass('simple-slider-selected');
				}
			}

			clc.init();
		});
	};
	
	$.fn.simpleSlider.defaultOptions = {
		show : 4,
		interval : null,
		children : 'li',
		speed : 250,
		prevlabel : 'Prev',
		nextlabel : 'Next',
		size : null,
		orientation : 'horizontal',
		clickevent : null,
		easing : 'easeOutExpo'
	};
	
})(jQuery);