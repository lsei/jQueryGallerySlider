jQuery.fn.galSlider = function() {
	galname = $(this).selector;
	var gal = galname + ' ';
	var imgs = $(gal + 'img');
	var imgsCount = imgs.length;
	
	var containerWidth = $(gal).width();
	var containerHeight = $(gal).height();
	var containerRatio = containerWidth/containerHeight;
	
	var holderWidth = containerWidth*imgsCount;
	
	// WRAP SPAN TAG AROUND
	$(gal + 'img').wrap('<div class="img-holder" />');
	
	$(gal + 'img').each(function() {
		var imgw = $(this).width();
		var imgh = $(this).height();
		var imgr = imgw/imgh;
		
		if(imgr>=containerRatio) {
			$(this).width(containerWidth);
			$(this).height(containerWidth/imgr);
		} else {	
			$(this).height(containerHeight);
			$(this).width(containerHeight*imgr);
		}
		
		if(imgr>1) {
			var newh = $(this).height();
			var marginTop = (containerHeight-newh)/2
			$(this).css('margin-top',marginTop);	
		}
	});
	$(gal).wrapInner('<div class="gal-slider" />');
	$(gal).wrapInner('<div class="gal-holder" />');
	
	var galleryStyle = {
      'overflow' : 'hidden',
	  'position' : 'relative',
	  'width':'100%',
	  'height':'100%'
    };
	var sliderStyle = {
      'width' : holderWidth,
	  'height' : containerHeight,
	  'position' : 'absolute',
	  'top' : 0,
	  'left' : 0
    };
	var imgHolderStyle = {
      'width' : containerWidth,
	  'height' : containerHeight,
	  'display' : 'inline-block',
	  'text-align' : 'center'
    };
	
	$('.gal-holder').css(galleryStyle);
	$('.gal-slider').css(sliderStyle);
	$('.img-holder').css(imgHolderStyle);
	
	var currImg = 0;
	
	$('.gal-slider').before('<div class="prev-arrow gal-prev gal-nav" />');
	$('.gal-slider').before('<div class="next-arrow gal-next gal-nav" />');
	
	$('.gal-next').click(function() {
		if(currImg!=imgsCount-1) {
			$('.gal-slider').animate({ 'left':containerWidth*(currImg+1)*(0-1)},500);
			currImg += 1;
		}
	});
	
	$('.gal-prev').click(function(e) {
		if(currImg!=0) {
			$('.gal-slider').animate({ 'left':containerWidth*(currImg-1)*(0-1)},500);
			currImg -= 1;
		}
	});
	$(gal).hover(function () {
			$('.gal-nav').fadeIn(500);
		},
		function () {
			$('.gal-nav').fadeOut(500);
  		}
		);
		
	$('.gs-thumb').click(function() {
		goto = $(this).attr('gotoImg');
			$('.gal-slider').animate({ 'left':containerWidth*(goto)*(0-1)},500);
			currImg = goto;
	});
}