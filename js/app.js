var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";

  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.slick();
      Init.formValidation();
      Init.personDetail();
      Init.stickySidebar();
      Init.contactPopupForm();
      Init.contactForm();
    },

    w: function (e) {
    },

    // Slick Slider
    slick: function () {
      if ($(".testimonial-slider").length) {
        $(".testimonial-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          infinite: true,
          loop: true,
          arrows: false,
          dots: false,
          centerPadding: "0",
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1299,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 599,
              settings: {
                autoplay: true,
                autoplaySpeed: 3500,
                speed: 300,
                infinite: true,
                cssEase: 'ease-out',
                swipeToSlide: true,
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      if ($(".brand-slider").length) {
        $(".brand-slider").slick({
          slidesToShow: 7,
          slidesToScroll: 1,
          autoplay: true,
          cssEase: "linear",
          autoplaySpeed: 0,
          speed: 6000,
          infinite: true,
          loop: true,
          arrows: false,
          dots: false,
          pauseOnFocus: false,
          pauseOnHover: false,
          centerPadding: "0",
          responsive: [
            {
              breakpoint: 1499,
              settings: {
                slidesToShow: 6,
              },
            },
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1099,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 490,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
        });
      }
    },

    // Sticky Sidebar
    stickySidebar: function () {
      var sidebar = $('.sidebar');
      var sidebarOffset = sidebar.offset().top;
      var screenWidth = $(window).width(); // Get the current screen width

      $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();

        if (screenWidth >= 1200 && scrollPos >= sidebarOffset) { // Check screen width and scroll position
          sidebar.css({
            'position': 'fixed',
            'top': '48px',
            'z-index': '100'
          });
        } else {
          sidebar.css({
            'top': '0px',
            'position': 'relative'
          });
        }
      });
    },

    // Person Detail
    personDetail: function () {
      if ($(".person-detail").length) {
        $("li").click(function () {
          var classClicked = $(this).attr('class');
          $("li").removeClass("active");
          $(this).addClass("active");
          $(".content div").removeClass("show");
          $(".content-" + classClicked).addClass("show");
        });
      }
    },

    // Form Validation
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },

    // Form Popup
    contactPopupForm: function () {
      $(".contact-btn").on("click", function () {
        var type = $(this).data("type");
        $('#formType').val(type);
        $('.thanksMessage').hide();
        $('.form-content-wrap').show();
        $(".begin-popup").animate({ right: "0px" }, "400");
        $(".begin-popup").find('.overlay').css({ transform: "scale(1)" });
      });
      $(".begin-popupClose").on("click", function () {
        $(".begin-popup").animate({ right: "-100%" }, "400");
        $(".begin-popup").find('.overlay').css({ transform: "scale(0)" });
      });
      $(".overlay").on("click", function () {
        $(".begin-popup").animate({ right: "-100%" }, "400");
        $(".begin-popup").find('.overlay').css({ transform: "scale(0)" });
      });

    },


    // Form Submission
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-5'>Email Sent Successfully</h4>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-5'>There is an error</h4>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return false;
        }
      });
    },
  };

  Init.i();
})(window, document, jQuery);

