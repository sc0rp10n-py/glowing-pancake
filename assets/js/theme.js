'use strict';
var theme = function () {

    // prevent empty links
    // ---------------------------------------------------------------------------------------
    function handlePreventEmptyLinks() {
        $('a[href=#]').click(function (event) {
            event.preventDefault();
        });
    }

    // Placeholdem
    // ---------------------------------------------------------------------------------------
    function handlePlaceholdem() {
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

    // BootstrapSelect
    // ---------------------------------------------------------------------------------------
    function handleBootstrapSelect() {
        $('.selectpicker').selectpicker();
    }


    // DateTimePicker
    // ---------------------------------------------------------------------------------------
    function handleBootstrapDate() {
        $(".datetimepicker").datepicker();
    }

    // add hover class for correct view on mobile devices
    // ---------------------------------------------------------------------------------------
    function handleHoverClass() {
        var hover = $('.thumbnail');
        hover.hover(
                function () {
                    $(this).addClass('hover');
                },
                function () {
                    $(this).removeClass('hover');
                }
        );
    }

    // superfish menu
    // ---------------------------------------------------------------------------------------
    function handleSuperFish() {
        $('ul.sf-menu').superfish();
        $('ul.sf-menu a').click(function () {
            $('body').scrollspy('refresh');
        });
        // fixed menu toggle
        $('.menu-toggle').on('click', function () {
            if ($('.navigation').hasClass('opened')) {
                $(this).find('.fa').removeClass('fa-times').addClass('fa-bars');
                $('.navigation').removeClass('opened').addClass('closed');
            } else {
                $(this).find('.fa').removeClass('fa-bars').addClass('fa-times');
                $('.navigation').removeClass('closed').addClass('opened');
            }
        });
        // submenu fix
        $('.mobile-submenu').click(function () {
            $(this).parent().toggleClass('mobile-submenu-open');
        });
        $('ul.sf-menu a').click(function () {
            $('ul.sf-menu li').removeClass('mobile-submenu-open');
        });
    }

    // Smooth scrolling
    // ---------------------------------------------------------------------------------------
    function handleSmoothScroll() {
        $('.sf-menu a, .scroll-to').click(function () {

            if ($(this).hasClass('btn-search-toggle')) {
                $('.header-search-wrapper').fadeToggle();
                $('.header').toggleClass('header-overlay');
            }
            else {

                //var headerH = $('header').outerHeight();
                var headerH = 0;
                $('.sf-menu a').removeClass('active');
                $(this).addClass('active');
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - headerH + 'px'
                }, {
                    duration: 1200,
                    easing: 'easeInOutExpo'
                });
                return false;

            }
        });
    }

    // Text Rotate
    // ---------------------------------------------------------------------------------------
    (function ($) {
        $.fn.extend({
            rotaterator: function (options) {

                var defaults = {
                    fadeSpeed: 900,
                    pauseSpeed: 100,
                    child: null
                };

                var options = $.extend(defaults, options);

                return this.each(function () {
                    var o = options;
                    var obj = $(this);
                    var items = $(obj.children(), obj);
                    items.each(function () {
                        $(this).hide();
                    })
                    if (!o.child) {
                        var next = $(obj).children(':first');
                    } else {
                        var next = o.child;
                    }
                    $(next).fadeIn(o.fadeSpeed, function () {
                        $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () {
                            var next = $(this).next();
                            if (next.length == 0) {
                                next = $(obj).children(':first');
                            }
                            $(obj).rotaterator({child: next, fadeSpeed: o.fadeSpeed, pauseSpeed: o.pauseSpeed});
                        })
                    });
                });
            }
        });
    })(jQuery);

    // prettyPhoto
    // ---------------------------------------------------------------------------------------
    function handlePrettyPhoto() {
        $("a[rel^='prettyPhoto']").prettyPhoto({
            theme: 'facebook',
            slideshow: 5000,
            autoplay_slideshow: true
        });

    }

    // Scroll totop button
    // ---------------------------------------------------------------------------------------
    function handleToTopButton() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                $('.to-top').css({bottom: '15px'});
            } else {
                $('.to-top').css({bottom: '-100px'});
            }
        });
        $('.to-top').click(function () {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });
    }

    // preloader
    // ---------------------------------------------------------------------------------------
    $(window).load(function () {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut(100);
    });

    // Isotope
    $(window).load(function () {
        /*if ($().isotope) {
         $('.isotope').isotope({ // initialize isotope
         itemSelector: '.isotope-item' // options...
         //,transitionDuration: 0 // disable transition
         });
         $('#filtrable a').click(function () { // filter items when filter link is clicked
         var selector = $(this).attr('data-filter');
         $('#filtrable a').parent().removeClass('current');
         $(this).parent().addClass('current');
         $('.isotope').isotope({filter: selector});
         return false;
         });
         $('.isotope').isotope('reLayout'); // layout/reLayout
         }*/
        if ($().isotope) {
            $('.isotope.events').isotope({// initialize isotope
                filter: '.festival',
                itemSelector: '.isotope-item' // options...
                        //,transitionDuration: 0 // disable transition
            });
            $('#filtrable-events a').click(function () { // filter items when filter link is clicked
                var selector = $(this).attr('data-filter');
                $('#filtrable-events a').parent().removeClass('current');
                $(this).parent().addClass('current');
                $('.isotope.events').isotope({filter: selector});
                $('.isotope').isotope('reLayout', $.waypoints('refresh')); // layout/reLayout
                return false;
            });
        }
        if ($().isotope) {
            $('.isotope.gallery').isotope({// initialize isotope
                itemSelector: '.isotope-item' // options...
                        //,transitionDuration: 0 // disable transition
            });
            $('#filtrable-gallery a').click(function () { // filter items when filter link is clicked
                var selector = $(this).attr('data-filter');
                $('#filtrable-gallery a').parent().removeClass('current');
                $(this).parent().addClass('current');
                $('.isotope.gallery').isotope({filter: selector});
                $('.isotope').isotope('reLayout', $.waypoints('refresh')); // layout/reLayout
                return false;
            });
        }
    });

    $(window).resize(function () {
        // Refresh isotope
        if ($().isotope) {
            $('.isotope').isotope('reLayout', $.waypoints('refresh')); // layout/relayout on window resize
        }
    });

    // Shrink header on scroll
    // ---------------------------------------------------------------------------------------
    function handleAnimatedHeader() {
        var header = $('.header.fixed');
        function refresh() {
            var scroll = $(window).scrollTop();
            if (scroll >= 99) {
                header.addClass('shrink');
            } else {
                header.removeClass('shrink');
            }
            $.waypoints('refresh');
        }
        ;
        $(window).load(function () {
            refresh();
        });
        $(window).scroll(function () {
            refresh();
        });
        $(window).on('touchstart', function () {
            refresh();
        });
        $(window).on('scrollstart', function () {
            refresh();
        });
        $(window).on('scrollstop', function () {
            refresh();
        });
        $(window).on('touchmove', function () {
            refresh();
        });

    }

    // handleTabsFAQ
    // ---------------------------------------------------------------------------------------
    function handleTabsFAQ() {
        if ($('#tabs-faq').length) {
            var tabs = $('#tabs-faq');
            tabs.find('a').on('click', function () {
                tabs.find('.fa-angle-right').removeClass('fa-angle-right').addClass('fa-plus');
                $(this).find('.fa').removeClass('fa-plus').addClass('fa-angle-right');
            });
        }
    }

    // resize page
    // ---------------------------------------------------------------------------------------
    function resizePage() {
        if ($('body').hasClass('boxed')) {
            $('#main-slider').find('.page').each(function () {
                $(this).removeAttr('style');
            });
        }
//        if ($('body').hasClass('coming-soon')) {
//            $('#main-slider').find('.page').each(function () {
//                $(this).removeAttr('style');
//                $('.page').css('min-height', $(window).height());
//            });
//        }
//        else {
//            $('.page').css('min-height', $(window).height());
//        }
        $('#main-slider').trigger('refresh');
        $('#testimonials').trigger('refresh');
        $('.partners-carousel .owl-carousel').trigger('refresh');
        $('.partners-carousel-2 .owl-carousel').trigger('refresh');
        $('.carousel-slider .owl-carousel').trigger('refresh');
    }

    // INIT FUNCTIONS
    // ---------------------------------------------------------------------------------------
    return {
        onResize: function () {
            resizePage();
        },
        init: function () {
            handlePrettyPhoto();
            handlePreventEmptyLinks();
            handlePlaceholdem();
            handleBootstrapSelect();
            handleBootstrapDate();
            handleHoverClass();
            handleSuperFish();
            handleSmoothScroll();
            handleToTopButton();
            handleAnimatedHeader();
            handleTabsFAQ();
        },
        // Main Slider
        initMainSlider: function () {
            $('#main-slider').owlCarousel({
                //items: 1,
                autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                margin: 0,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });

        },
        // CountDown
        initCountDown: function () {
            var austDay = new Date();
            austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
            $('#defaultCountdown').countdown({until: austDay});
            $('#defaultCountdown2').countdown({until: austDay});
        },
        // Images carousel
        initImageCarousel: function () {
            $('.img-carousel').owlCarousel({
                autoplay: false,
                loop: true,
                margin: 0,
                dots: true,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        },
        initCorouselSlider4: function () {
            $('.carousel-slider .owl-carousel.slide-4').owlCarousel({
                autoplay: true,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    767: {items: 2},
                    991: {items: 3},
                    1024: {items: 4}
                }
            });

        },
        initCorouselSlider3: function () {
            $('.carousel-slider .owl-carousel.slide-3').owlCarousel({
                autoplay: true,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    767: {items: 2},
                    991: {items: 3},
                    1024: {items: 3}
                }
            });

        },
        // Partners Slider
        initPartnerSlider: function () {
            $('.partners-carousel .owl-carousel').owlCarousel({
                autoplay: true,
                loop: true,
                margin: 25,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    768: {items: 3},
                    991: {items: 5},
                    1024: {items: 6}
                }
            });
        },
        // Partners Slider
        initPartnerSlider2: function () {
            $('.partners-carousel-2 .owl-carousel').owlCarousel({
                autoplay: true,
                loop: true,
                margin: 25,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    768: {items: 3},
                    991: {items: 5},
                    1024: {items: 5}
                }
            });
        },
        // Partners Slider
        initEventCarousel: function () {
            $('.event-carousel .owl-carousel').owlCarousel({
                autoplay: false,
                loop: false,
                margin: 25,
                dots: true,
                nav: true,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 2},
                    991: {items: 3},
                    1024: {items: 4}
                }
            });
        },
        // Main Slider

        // Testimonials
        initTestimonials: function () {
            $('#testimonials').owlCarousel({
                items: 1,
                autoplay: true,
                loop: true,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-caret-left'></i>",
                    "<i class='fa fa-caret-right'></i>"
                ]
            });
        },
        // Animation on Scroll
        initAnimation: function () {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile == false) {
                $('*[data-animation]').addClass('animated');
                $('.animated').waypoint(function (down) {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + ' visible');
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + ' visible');
                        }
                    }
                }, {
                    offset: $.waypoints('viewportHeight')
                            //offset: 'bottom-in-view'
                            //offset: '95%'
                });
            }
            // Refresh Waypoints on tab click / animation
            $('#tabs-lv1 li a[data-toggle="tab"]').on('shown.bs.tab', function () {
                $.waypoints('refresh');
            });
            $('#tabs-lv2 li a[data-toggle="tab"]').on('shown.bs.tab', function () {
                $.waypoints('refresh');
            });
        },
        // Google map
        initGoogleMap: function () {
            var map;
            var marker;
            var image = 'assets/img/icon-google-map.png'; // marker icon
            function initialize() {
                var mapOptions = {
                    scrollwheel: false,
                    zoom: 10,
                    center: new google.maps.LatLng(28.5458535,77.2720008) // map coordinates
                };
                map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(28.5458535,77.2720008), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
            }
            google.maps.event.addDomListener(window, 'load', initialize);
        }

    };

}();

$(document).ready(function () {

    $('#rotate').rotaterator({fadeSpeed: 900, pauseSpeed: 100});

    // Google map
    // ---------------------------------------------------------------------------------------
    if (typeof google === 'object' && typeof google.maps === 'object') {
        if ($('#map-canvas1').length) {

            var map;
            var marker, marker2, marker3, marker4, marker5, marker6, marker7, marker8;
            var infowindow;

            var image = 'assets/img/icon-google-map.png'; // marker icon
            google.maps.event.addDomListener(window, 'load', function () {
                var mapOptions = {
                    scrollwheel: false,
                    zoom: 10,
                    center: new google.maps.LatLng(41.079379, 28.9984466) // map coordinates
                };

                map = new google.maps.Map(document.getElementById('map-canvas1'),
                        mapOptions);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(41.0096559, 28.9755535), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
                marker2 = new google.maps.Marker({
                    position: new google.maps.LatLng(41.007135, 28.910556), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
                marker3 = new google.maps.Marker({
                    position: new google.maps.LatLng(41.040807, 28.848071), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
                marker4 = new google.maps.Marker({
                    position: new google.maps.LatLng(41.051164, 29.078097), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
                marker5 = new google.maps.Marker({
                    position: new google.maps.LatLng(41.077050, 28.995013), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });

                infowindow = new google.maps.InfoWindow({
                    content: contentString
                    , maxWidth: 50
                            //,maxHeight: 500
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
                // more markers
                google.maps.event.addListener(marker2, 'click', function () {
                    infowindow.open(map, marker2);
                });
                google.maps.event.addListener(marker3, 'click', function () {
                    infowindow.open(map, marker3);
                });
                google.maps.event.addListener(marker4, 'click', function () {
                    infowindow.open(map, marker4);
                });
                google.maps.event.addListener(marker5, 'click', function () {
                    infowindow.open(map, marker5);
                });

                // open marker when google map init
                function initialize() {
                    google.maps.event.trigger(marker, 'click');
                }
                initialize();

                /*
                 * The google.maps.event.addListener() event waits for
                 * the creation of the infowindow HTML structure 'domready'
                 * and before the opening of the infowindow defined styles
                 * are applied.
                 */
                google.maps.event.addListener(infowindow, 'domready', function () {

                    // Reference to the DIV which receives the contents of the infowindow using jQuery
                    var iwOuter = $('.gm-style-iw');

                    /* The DIV we want to change is above the .gm-style-iw DIV.
                     * So, we use jQuery and create a iwBackground variable,
                     * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
                     */
                    var iwBackground = iwOuter.prev();

                    // Remove the background shadow DIV
                    iwBackground.children(':nth-child(2)').css({'display': 'none'});

                    // Remove the white background DIV
                    iwBackground.children(':nth-child(4)').css({'display': 'none'});

                    // Moves the infowindow 115px to the right.
                    iwOuter.parent().parent().css({left: '10px'});

                    // Moves the shadow arrow // hide
                    iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
                        return s + 'display: none !important;'
                    });

                    // Moves the arrow 76px to the left margin
                    iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
                        return s + 'left: 80px !important; margin-top: -10px; z-index: 0;'
                    });

                    // Changes the desired color for the tail outline.
                    // The outline of the tail is composed of two descendants of div which contains the tail.
                    // The .find('div').children() method refers to all the div which are direct descendants of the previous div.
                    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(255, 255, 255, 0.1) 0px 1px 6px', 'z-index': '1'});

                    // Taking advantage of the already established reference to
                    // div .gm-style-iw with iwOuter variable.
                    // You must set a new variable iwCloseBtn.
                    // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
                    // Is this div that groups the close button elements.
                    var iwCloseBtn = iwOuter.next();

                    // Apply the desired effect to the close button
                    iwCloseBtn.css({
                        opacity: '1',
                        right: '48px', top: '14px',
                        width: '19px', height: '19px',
                        border: '3px solid #ffffff',
                        'border-radius': '17px',
                        'background-color': '#ffffff'
                    });

                    // The API automatically applies 0.7 opacity to the button after the mouseout event.
                    // This function reverses this event to the desired value.
                    iwCloseBtn.mouseout(function () {
                        $(this).css({opacity: '1'});
                    });

                });

                //

            });

        }
    }

});

