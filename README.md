# Simple Slider plugin

A jQuery plugin to create a slider out of an unordered list (or other items within a container). See an example at <a href="http://code.sneak.co.nz/simpleslider/">http://code.sneak.co.nz/simpleslider/</a>.

## Usage

Call the plugin on the parent element of the list/group. This doesn't have to be an unordered list, so long as all direct children of the parent are items belonging to the list or group. 

	$('.slider').simpleSlider({
		show: 3,
		interval: 3,
		size: 590,
		orientation: 'horizontal',
		clickevent: function(){
			$(this).parent().find('li').stop().css({ opacity : 1 });
			$(this).stop().css({ opacity : 0.4 });
			return false;
		}
	});

## Options

<table>
 	<tr>
		<th align="left" valign="top">show</th>
		<td><em>Optional, Int</em>. How many items will be shown at once (default is 4)</td>
	</tr>
	<tr>
		<th align="left" valign="top">interval</th>
		<td><em>Optional, Int</em>. How many items to be scrolled on each prev/next click (default is 1)</td>
	</tr>
	<tr>
		<th align="left" valign="top">children</th>
		<td><em>Optional, String</em>. Child elements that will make up the slider items (default is 'li')</td>
	</tr>
	<tr>
		<th align="left" valign="top">speed</th>
		<td><em>Optional, Int</em>. Speed of animations, in milliseconds (default is 250)</td>
	</tr>
	<tr>
		<th align="left" valign="top">prevlabel</th>
		<td><em>Optional, String</em>. Label for previous sroll button (default is 'Prev')</td>
	</tr>
	<tr>
		<th align="left" valign="top">nextlabel</th>
		<td><em>Optional, String</em>. Label for next sroll button (default is 'Next')</td>
	</tr>
	<tr>
		<th align="left" valign="top">size</th>
		<td><em>Optional, Int</em>. Size dimension, used for width or height depending on orientation</td>
	</tr>
	<tr>
		<th align="left" valign="top">orientation</th>
		<td><em>Optional, String</em>. Orientation of the slider. Options are horizontal or vertical (default is 'horizontal')</td>
	</tr>
	<tr>
		<th align="left" valign="top">clickevent</th>
		<td><em>Optional, Function</em>. Callback for items when they are clicked. The clicked item is passed in with the callback.</td>
	</tr>
</table>