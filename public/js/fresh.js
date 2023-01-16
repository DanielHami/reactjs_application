

(function runFreshJS() {
    function onElementInserted(containerSelector, elementSelector, callback) {
      const onMutationsObserved = function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.addedNodes.length) {
            const elementAdded = [].some.call(mutation.addedNodes, function (el) {
              return el.id && el.id === elementSelector
            });
            if (elementAdded) { callback() }
          }
        });
      };
  
      const target = $(containerSelector)[0];
      const config = {
        childList: true,
        subtree: true
      };
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      const observer = new MutationObserver(onMutationsObserved);
      observer.observe(target, config);
    }
  
    onElementInserted('body', 'navbar-main', function() {
        $(window).on('load', function() { // makes sure the whole site is loaded
            $('#status').fadeOut(); // will first fade out the loading animation
            $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
            $('body').delay(350).css({
              'overflow': 'visible'
            });
          })

     //Mobile menu toggle
     if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function() {
            var menu_id = $(this).attr('data-target');
            $(this).toggleClass('is-active');
            $("#" + menu_id).toggleClass('is-active');
            $('.navbar.is-light').toggleClass('is-dark-mobile')
          });
        }
        $('.menu-icon-trigger').click(function(e) {
            e.preventDefault();
            $('.menu-icon-wrapper').toggleClass('open');
            $('.sidebar').toggleClass('is-active');
          });
          $('.sidebar-close').click(function() {
            $('.sidebar').removeClass('is-active');
            $('.menu-icon-wrapper').removeClass('open');
          })
    if ($('.sidebar').length) {
        $(".sidebar-menu > li.have-children > a").on("click", function(i) {
            i.preventDefault();
            if (!$(this).parent().hasClass("active")) {
              $(".sidebar-menu li ul").slideUp();
              $(this).next().slideToggle();
              $(".sidebar-menu li").removeClass("active");
              $(this).parent().addClass("active");
            } else {
              $(this).next().slideToggle();
              $(".sidebar-menu li").removeClass("active");
            }
          });
        }