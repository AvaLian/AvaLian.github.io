(function($) {
    "use strict";


    // Preloader 
    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(350).fadeOut("slow");
    });

    /*----------------------------
  1. Mobile Menu Activation
-----------------------------*/
    jQuery('.mobile-menu nav').meanmenu({
        meanScreenWidth: "992",
    });


    smoothScroll.init();


     // Main Slider Animation

    (function($) {

        //Function to animate slider captions 
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';

            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });

                // $this.addClass($animationType).delay(3200).removeClass($animationType);

            });
        }

        //Variables on page load 
        var $myCarousel = $('#carousel-example-generic'),
            $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

        //Initialize carousel 
        $myCarousel.carousel();

        //Animate captions in first slide on page load 
        doAnimations($firstAnimatingElems);

        //Pause carousel  
        $myCarousel.carousel('pause');


        //Other slides to be animated on carousel slide event 
        $myCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });


    })(jQuery);



    /*----------------------------
    wow js active
    ------------------------------ */
    new WOW().init();


    //Single page scroll js
    $('.wd_single_index_menu ul li a').on('click', function(e) {
        $('.wd_single_index_menu ul li').removeClass('active');
        $(this).parent().addClass('active');
        var target = $('[section-scroll=' + $(this).attr('href') + ']');
        e.preventDefault();
        var targetHeight = target.offset().top - parseInt('80', 10);
        $('html, body').animate({
            scrollTop: targetHeight
        }, 1000);
    });

    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        var target = $('.wd_single_index_menu ul li');
        if (windscroll >= 0) {
            $('[section-scroll]').each(function(i) {
                if ($(this).position().top <= windscroll + 90) {
                    target.removeClass('active');
                    target.eq(i).addClass('active');
                }
            });
        } else {
            target.removeClass('active');
            $('.wd_single_index_menu ul li:first').addClass('active');
        }

    });


    //Single page scroll js
    $('#cssmenu ul li a').on('click', function(e) {
        $('#cssmenu ul li').removeClass('active');
        $(this).parent().addClass('active');
        var target = $('[section-scroll=' + $(this).attr('href') + ']');
        e.preventDefault();
        var targetHeight = target.offset().top - parseInt('80', 10);
        $('html, body').animate({
            scrollTop: targetHeight
        }, 1000);
    });

    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        var target = $('#cssmenu ul li');
        if (windscroll >= 0) {
            $('[section-scroll]').each(function(i) {
                if ($(this).position().top <= windscroll + 90) {
                    target.removeClass('active');
                    target.eq(i).addClass('active');
                }
            });
        } else {
            target.removeClass('active');
            $('#cssmenu ul li:first').addClass('active');
        }

    });


    // Menu js for Position fixed
    $(window).scroll(function() {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 800) {
            $('.gc_main_menu_wrapper').addClass('menu_fixed animated fadeInDown');
        } else {
            $('.gc_main_menu_wrapper').removeClass('menu_fixed animated fadeInDown');
        }
    });


    /*--- Responsive Menu Start ----*/

    $("#toggle").on("click", function() {
        var w = $('#sidebar').width();
        var pos = $('#sidebar').offset().left;

        if (pos == 0) {
            $("#sidebar").animate({ "left": -w }, "slow");
        } else {
            $("#sidebar").animate({ "left": "0" }, "slow");
        }

    });

    $("#toggle_close").on("click", function() {
        var w = $('#sidebar').width();
        var pos = $('#sidebar').offset().left;

        if (pos == 0) {
            $("#sidebar").animate({ "left": -w }, "slow");
        } else {
            $("#sidebar").animate({ "left": "0" }, "slow");
        }

    });

    /*--------------------------
    scrollUp
    ---------------------------- */
    // $.scrollUp({
    //     scrollText: '<i class="glyphicon glyphicon-chevron-up"></i>',
    //     easingType: 'linear',
    //     scrollSpeed: 900,
    //     animation: 'fade'
    // });
    // 
    
    if ((document.body.scrollTop || document.documentElement.scrollTop) > 600) {
        $("#scrollUp").show();
    } else {
        $("#scrollUp").hide();
    }

    jQuery("#scrollUp").on('click', function(e) {
		e.preventDefault();		
		jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});



})(jQuery);







/*-------------waves effect js------------------*/

var SEPARATION = 200,
    AMOUNTX = 30,
    AMOUNTY = 30;

var container, stats;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 100,
    mouseY = -550;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({

        color: 0xffffff,

        program: function(context) {

            context.beginPath();
            renderer.setClearColorHex(0x1a1c35, 1);
            context.arc(0, 0, 0.5, 0, PI2, true);

            context.fill();

        }

    });

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[i++] = new THREE.Sprite(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
            scene.add(particle);

        }

    }

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);




    //


}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[i++];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
                (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
                (Math.sin((iy + count) * 0.5) + 1) * 4;

        }

    }

    renderer.render(scene, camera);

    count += 0.1;

}