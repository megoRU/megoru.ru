/*---Animate---*/ 
jQuery(document).ready(function($) {


    if (jQuery.browser.mobile === false) {

    	// Presentation
        $('#presentation h1').addClass('animated zoomIn delay0');

        $('#presentation .check-list').addClass('animated zoomIn delay0');

        $('#presentation .video-wrap video').addClass('animated fadeInDown delay1');

        $('#presentation .lead').addClass('animated fadeInUp delay1');

        // About
        $('#about h2').addClass('animated zoomIn delay1');

        $('#about p').addClass('animated fadeInUp delay2');

        $('#about .main-img').addClass('animated zoomIn delay1');

        // Pluses
         $('#pluses h2').css('opacity', 0).one('inview', function(isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delay0');}
        });

         $('#pluses p').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInDown delay0');}
        });

         //Scrinshots
          $('#scrinshots h2').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delay0');}
        });

          $('#scrinshots .pull-left').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInLeft delay3');}
        });

          $('#scrinshots .media-body h3').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInDown delay3');}
        });

          $('#scrinshots .media-body p').css('opacity', 0).one('inview', function(event, isInView) {
            if (isInView) {$(this).addClass('animated fadeInUp delay3');}
        });

        // Reviews
        $('#reviews h2').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInUp delay1');}
        });

        $('#reviews .ava').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInLeft delay2');}
        });

        $('#reviews .review-body').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeIn delay3');}
        });

        $('#reviews .review-body').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay4');}
        });

        // Buy
        $('#buy h2').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay1');}
        });

        $('#buy .standart').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay2');}
        });

        $('#buy .premium').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInUp delay2');}
        });

        $('#buy .lux').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay3');}
        });

        // Subscribe
        $('#subscribe h2').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay1');}
        });

        $('#subs_email').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInLeft delay3');}
        });

        $('#subs_btn').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInRight');}
        });

        // Contacts
        $('#contacts h2').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInUp delay1');}
        });

        $('#name').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay2');}
        });

        $('#email').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay3');}
        });

        $('#message').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown delay3');}
        });

        $('#btn').css('opacity', 0).one('inview', function(event, isInView) {
        	if (isInView) {$(this).addClass('animated fadeInDown');}
        });

    }    

});