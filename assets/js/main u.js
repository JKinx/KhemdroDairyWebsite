/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

// var $form = $('form#interest-form'),
//     url = 'https://script.google.com/macros/u/2/s/AKfycbxtom-eFPN128d-XQN3bEX6oP5jaZVNZZ_yYYevm1mgj6ioG9I/exec';

function showMessage() {
    if (document.getElementById('more-info').checked) {
    	$("#messageerror").remove();
    	$('#message').prop('required',true);
        $('#messageholder').slideDown( "slow" );
    } else {
    	$("#messageerror").remove();
    	$('#message').prop('required',false);
        $('#messageholder').slideUp();
    }
};

var $form = $('form#interest-form'),
    url = 'https://script.google.com/a/khemdrodairy.org/macros/s/AKfycbwA3dw_yx1blJNgg_XAcTOeXtbRzYG8XO5T-8oiXfpbUBElo-DX/exec';


function submitForm() {
	// show the loading 
    var jqxhr = $.post(url, $form.serialize(), function(data) {
        console.log("Success! Data: " + data.statusText);
    })
        .fail(function(data) {
            console.warn("Error! Data: " + data.statusText);
            // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
            if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                $(location).attr('href',redirectUrl);                
            }
        });

    $("#form-area").fadeOut('slow');
    $("#thanks").delay('slow').fadeIn('1000'); 
}

/* Light YouTube Embeds by @labnol */
    /* Web: http://labnol.org/?p=27941 */

document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    });


function labnolThumb(id) {
    var thumb = "<img src='http://img.youtube.com/vi/ID/sddefault.jpg'>",
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}


function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("width", "560");
    iframe.setAttribute("height", "315");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}

var first1 = true;
var first2 = true;


$(document).ready(function(){
	setTimeout(function (){
		if (first1 == true) {
			first1 = false;
			$("#videopopup1").prepend('<img class="top-corner" src="assets/css/images/close.svg"><iframe id="v1" class="popup_video" src="https://www.youtube.com/embed/EEOBWUb9i3I?enablejsapi=1" frameborder="0" allowfullscreen></iframe>')

			$("#v1").load(function() { 
				$("#popup-wrapper1").removeClass("no-popup");
				$("#popup-wrapper1").addClass("show-popup");
				document.getElementById("v1").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			});
		}

	}, 5000);
	
		
    $("#more-info").change(function(){
    	showMessage();
	});

	$("#reset").click(function(){
    	$('#messageholder').slideUp();
	});

	$("#reload").click(function(){
    	window.location.reload();
	});

	

	// $('#submit-form').on('click', function(e) {
	//   e.preventDefault();
	//   var jqxhr = $.ajax({
	//     url: url,
	//     method: "GET",
 //    	dataType: 'json',
	//     data: $form.serializeObject()
	//   }).success(
	//     console.log("sent")
	//   );
	// })

	

    
	$('#submit-form').on('click', function(e) {
		e.preventDefault();

		var validity = true;
		
		if(document.getElementById("name").checkValidity() == true){
			$("#nameerror").remove();
			validity = validity && true
		} else{
			validity = false;
			$("#nameerror").remove();
			$("#name").after("<label id='nameerror' class='error' for='name'>Please enter your name</label>")
		};

		if(document.getElementById("email").checkValidity() == true){
			$("#emailerror").remove();
			validity = validity && true
		} else{
			validity = false;
			$("#emailerror").remove();
			$("#email").after("<label id='emailerror' class='error' for='email'>Please enter your valid email address</label>")
		};

		if(document.getElementById("message").checkValidity() == true){
			$("#messageerror").remove();
			validity = validity && true
		} else{
			validity = false;
			$("#messageerror").remove();
			$("#message").after("<label id='messageerror' class='error' for='message'>Please enter your message</label>")
		};

		if(validity){
			submitForm()
		}	
	})

	$("#video1").on("click", function(e) {
		if (first1 == true) {
			first1 = false;
			$("#videopopup1").prepend('<img class="top-corner" src="assets/css/images/close.svg"><iframe id="v1" class="popup_video" src="https://www.youtube.com/embed/EEOBWUb9i3I?enablejsapi=1" frameborder="0" allowfullscreen></iframe>')

			$("#v1").load(function() { 
					$("#popup-wrapper1").removeClass("no-popup");
					$("#popup-wrapper1").addClass("show-popup");
					document.getElementById("v1").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			});
		}

		else {
		$("#popup-wrapper1").removeClass("no-popup");
		$("#popup-wrapper1").addClass("show-popup");
		document.getElementById("v1").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}
	})

	$("#videopopup1").on("click", function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    
	    document.getElementById("v1").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
	
	    $("#popup-wrapper1").removeClass("show-popup");
	    $("#popup-wrapper1").addClass("no-popup");
	 });



	$("#video2").on("click", function(e) {
		if (first2 == true) {
			first2 = false;
			$("#videopopup2").prepend('<img class="top-corner" src="assets/css/images/close.svg"><iframe id="v2" class="popup_video" src="https://www.youtube.com/embed/oTkKtCbLfec?enablejsapi=1" frameborder="0" allowfullscreen></iframe>');


			$("#v2").load(function() { 
				$("#popup-wrapper2").removeClass("no-popup");
				$("#popup-wrapper2").addClass("show-popup");
				document.getElementById("v2").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			});
		}

		else {
			$("#popup-wrapper2").removeClass("no-popup");
			$("#popup-wrapper2").addClass("show-popup");
			document.getElementById("v2").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}
	})

	$("#videopopup2").on("click", function(e) {
	    e.preventDefault();
	    e.stopPropagation();

	    document.getElementById("v2").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
	    $("#popup-wrapper2").removeClass("show-popup");
	    $("#popup-wrapper2").addClass("no-popup");
	});

	$(".popup > iframe").on("click", function(e) {
	    e.stopPropagation();
	});

});

(function($) {
    var $window = $(window),
        $html = $('html');

    function resize() {
        if ($window.width() < 736) {
            return $("#model").attr("src","images/sml.svg");
        }
		
		$("#model").attr("src","images/lrg.svg");

    }
    
    $window
        .resize(resize)
        .trigger('resize');

})(jQuery);





