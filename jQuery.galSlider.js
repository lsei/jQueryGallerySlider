jQuery.fn.galSlider = function() {

	var galname = $(this).selector; // Get the selector so that we can use it the next functions. 
	var gal = galname + ' '; // Adding a space after the selector to be able to select child elements easily. 
	var imgs = $(gal + 'img'); // Selecting all <img /> tags inside of the main element. 
	var imgsCount = imgs.length; // Counting the number of images. 
	
	// Here we get the size of the containing element. This will define the size of the images within the container as they will be automatically resized in order to fit. 
	var containerWidth = $(gal).width();
	var containerHeight = $(gal).height();
	var containerRatio = containerWidth/containerHeight; // We save the aspect ratio of the container in order to compare it to the individual images later. 
	
	// The width of the holding element which will slide back and forth is defined by the number of images times the width of the container element. 
	var holderWidth = containerWidth*imgsCount;
	
	// Wrapping all of the images inside a <div /> tag with the class name "img-holder". 
	$(gal + 'img').wrap('<div class="img-holder" />');
	
	// This function cycles through all of the images and adjusts their size according to the size of the container. 
	$(gal + 'img').each(function() {
		var imgw = $(this).width();
		var imgh = $(this).height();
		var imgr = imgw/imgh;
		
		if(imgr>containerRatio) { // In this case, the image is wider than the container. Thus the image width is set equal to the container width and the height is adjusted accordingly. 
			$(this).width(containerWidth);
			$(this).height(containerWidth/imgr);

			// In order to centre he image in the containing frame we calculate the difference between the container height and new image height which we then halve in order to find the distance that we must move the image from the top so that it is located centrally within the container.

			var marginTop = (containerHeight-(containerWidth/imgr))/2
			$(this).css('margin-top',marginTop);

		} else { // Otherwise the image must be taller than the container. In this case we adjust the image height to be equal to the height of the container and adjust the width accordingly in order to preserve the correct image aspect ratio. 
			$(this).height(containerHeight);
			$(this).width(containerHeight*imgr);

			// We do not have to add a distance to left of the image as the CSS: text-align:center; already centers in within the element. 
		}
		
	});
	// Wrapping all of the images in a slider element. This element will be one long bar that will slide to the left and right. 
	$(gal).wrapInner('<div class="gal-slider" />');
	// Wrapping the slider in a holder. This is essentially the viewport and will only show one image at a time, hiding the others. 
	$(gal).wrapInner('<div class="gal-holder" />');
	
	// Style to be applied to .gal-holder
	var galleryStyle = {
      'overflow' : 'hidden',
	  'position' : 'relative',
	  'width':'100%',
	  'height':'100%'
    };

    // Style to be applied to .gal-slider
	var sliderStyle = {
      'width' : holderWidth,
	  'height' : containerHeight,
	  'position' : 'absolute',
	  'top' : 0,
	  'left' : 0
    };

    // Style to be applied to .img-holder
	var imgHolderStyle = {
      'width' : containerWidth,
	  'height' : containerHeight,
	  'display' : 'inline-block',
	  'text-align' : 'center'
    };
	
	// Applying styles. 
	$('.gal-holder').css(galleryStyle);
	$('.gal-slider').css(sliderStyle);
	$('.img-holder').css(imgHolderStyle);
	
	// Initiating the variable currImg which will hold the information on the image that is being displayed in any point in time. 
	var currImg = 0;
	
	// Adding the arrows to the container. The are being placed before the .gal-slider element (within .gal-holder).
	$('.gal-slider').before('<div class="prev-arrow gal-prev gal-nav" />');
	$('.gal-slider').before('<div class="next-arrow gal-next gal-nav" />');
	
	//This is the event listener for any click event on the .gal-next element. We add an if-condition in order to make sure the slider does not go to far, beyond the area where images are. 
	$('.gal-next').click(function() {
		if(currImg!=imgsCount-1) { // If we are not at the last image, goto the next image.
			$('.gal-slider').animate({ 'left':containerWidth*(currImg+1)*(0-1)},500); // We use the left attribute to define where the slider is. The value is derived by the container width by the number of the image that we want to goto, then multiplying this by -1 in order to get a negative value since we want to move the slider element to the left. 

			currImg += 1; // Update the currImg variable. 
		}
	});
	
	$('.gal-prev').click(function(e) {
		if(currImg!=0) { // If we are not at the first image, goto the previous image
			$('.gal-slider').animate({ 'left':containerWidth*(currImg-1)*(0-1)},500);
			currImg -= 1;
		}
	});

	// Here we set the listener for the hover event. 
	$(gal).hover(function () {
			$('.gal-nav').fadeIn(500); 
		},
		function () {
			$('.gal-nav').fadeOut(500);
  		}
		);
		
		// This final click event listener listens to click on the small image thumbnails. I had added pseudo-attribute gotoImg in which we have the number for the image which the slider should goto. This number is then again multiplied by the container width in order to find the correct 'left' value to slide to. 
	$('.gs-thumb').click(function() {
		goto = $(this).attr('gotoImg');
			$('.gal-slider').animate({ 'left':containerWidth*(goto)*(0-1)},500);
			currImg = goto;
	});
}