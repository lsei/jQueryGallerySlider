jQueryGallerySlider
=============

Put together this jQuery slider for my own use. Feel free to fork. 

Usage
-------

Include the  javascript file in the html head: 

```html
<script type="text/javascript" src="jQuery.galSlider.min.js"></script>
```

Put images into an element: 

```html
<div class="gallery">
	<img src="img1.jpg" width="800" height="600" alt="Image 01">
	<img src="img2.jpg" width="800" height="600" alt="Image 02">
	<img src="img3.jpg" width="800" height="600" alt="Image 03">
</div>
```

To initiate the slider use to following command: 

```js
$('.gallery').galSlider();
```

If you have not specified the height and width of the images you will have to wait until the document is finished loading:

```js
$(document).load(function() {
	$('.gallery').galSlider();
});
```
Todo List
-------

* Touch Swipe
* Resize & recalculate on page resize
* CSS
* Sample Page
* Documentation
* Comments
* Slider Options
