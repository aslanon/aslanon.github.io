jQuery(document).ready(function(){
  $(window).scroll(function(e){
  	parallaxScroll();
	});
	 
	function parallaxScroll(){
		var scrolled = $(window).scrollTop();
		$('#container_layout_me').css('margin-top',((50-scrolled*.80))+'px');
		$('#moon').css('bottom',((-260+scrolled*.8))+'px');
		$('#star').css('bottom',((-250+scrolled*.9))+'px');
		$('#mountain1').css('bottom',((+0-scrolled*.2))+'px');
		$('#boat').css('bottom',((-150+scrolled*.55))+'px');
		$('#wave1').css('top',((120-scrolled*.51))+'px');
		$('#wave2').css('top',((190-scrolled*.51))+'px');
		$('#page_container').css('top',((120-scrolled*.51))+'px');

	}
 
 });



// walkway.js lib
!function(t,n){"function"==typeof define&&define.amd?define(["exports"],function(){n(t)}):n("object"==typeof exports?exports:t)}(this,function(t){"use strict";function n(t){var n=["path","line"],e=n.reduce(function(n,e){return n+t+" "+e+", "},"");return e.slice(0,-2)}function e(t){return this instanceof e?("string"==typeof t&&(t={selector:t}),t.selector?(this.opts=t,this.selector=t.selector,this.duration=t.duration||500,this.easing=s[t.easing]||s.easeInOutCubic,this.paths=this.getPaths(),this.setInitialStyles(),void(this.id=!1)):this.error("A selector needs to be specified")):new e(t)}function i(t,n,e){this.el=t,this.length=t.getTotalLength(),this.duration=n,this.easing=e,this.animationStart=null,this.animationStarted=!1}function a(t,n,e){this.el=t,this.length=o(t),this.duration=n,this.easing=e,this.animationStart=null,this.animationStarted=!1}function o(t){var n=t.getAttribute("x1"),e=t.getAttribute("x2"),i=t.getAttribute("y1"),a=t.getAttribute("y2");return Math.sqrt(Math.pow(n-e,2)+Math.pow(i-a,2))}var r=0;window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,window.cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame,window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),e=Math.max(0,16-(n-r)),i=window.setTimeout(function(){t(n+e)},e);return r=n+e,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});var s={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return.5>t?2*t*t:-1+(4-2*t)*t},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return.5>t?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t}};e.prototype.error=function(t){console.log("Walkway error: "+t)},e.prototype.getPaths=function(){var t=this,e=n(this.selector),o=document.querySelectorAll(e);return o=Array.prototype.slice.call(o),o.map(function(n){return"path"===n.tagName?new i(n,t.duration,t.easing):"line"===n.tagName?new a(n,t.duration,t.easing):void 0})},e.prototype.setInitialStyles=function(){this.paths.forEach(function(t){t.el.style.strokeDasharray=t.length+" "+t.length,t.el.style.strokeDashoffset=t.length})},e.prototype.draw=function(t){var n,e=this.paths.length;if(0===e)return t&&"function"==typeof t&&t(),window.cancelAnimationFrame(this.id);for(;e--;){n=this.paths[e];var i=n.update();i&&this.paths.splice(e,1)}this.id=window.requestAnimationFrame(this.draw.bind(this,t))},i.prototype.update=function(){this.animationStarted||(this.animationStart=Date.now(),this.animationStarted=!0);var t=this.easing((Date.now()-this.animationStart)/this.duration);return t>=1?!0:(this.el.style.strokeDashoffset=Math.floor(this.length*(1-t)),!1)},a.prototype.update=function(){this.animationStarted||(this.animationStart=Date.now(),this.animationStarted=!0);var t=this.easing((Date.now()-this.animationStart)/this.duration);return t>=1?!0:(this.el.style.strokeDashoffset=Math.floor(this.length*(1-t)),!1)},t.Walkway=e});