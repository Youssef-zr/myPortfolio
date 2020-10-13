$(document).ready(function () {
  "use strict";

  // LOADING PAGE
  setTimeout(() => {
    $("body.is-loading")
      .css({
        overflow: "visible",
      })
      .find(".loading-page")
      .fadeOut(700);
  }, 1000);

  // COLOR MODE
  $(".color-mode").click(function () {
    $(".color-mode-icon").toggleClass("active");
    $("body").toggleClass("dark-mode");
  });

  // HEADER
  $(".navbar").headroom();

  // PROJECT CAROUSEL
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    // nav: true,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
  });

  // SMOOTHSCROLL
  $(function () {
    $(".nav-link, .custom-btn-link").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });

  // TOOLTIP
  $(".social-links a").tooltip();
  $(".back-top").tooltip();

  // FOOTER CURRENT YEAR
  $("#current-year").html(new Date().getFullYear());

  // BACK TO TOP BUTTON
  let $btnBackTop = $(".back-top");
  $btnBackTop.on("click", () => {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      700
    );
  });

  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= 600) {
      $btnBackTop.fadeIn(500);
    } else {
      $btnBackTop.fadeOut(500);
    }
  });

  // SEND FUCK MESSAGE TO ME
  let name = $("#name"),
    email = $("#email"),
    message = $("#message"),
    $errors = new Map();
  if (name.val() != "" && email.val() != "" && message.val() != "") {
    if ($errors.size == 0) {
      $(".submit-btn").show();
    }
  } else {
    $(".submit-btn").hide();
  }

  $(".submit-btn").on("click", function () {
    if (name.val() != "" && email.val() != "" && message.val() != "") {
      if ($errors.size == 0) {
        $("#loading-form").fadeIn(500);
        setTimeout(() => {
          $(".submit-btn").hide();
          message.val("");
          name.val("");
          email.val("");
          $("#loading-form").fadeOut(500);
          $(".msgSuccess").slideDown(500);
        }, 3000);
        setTimeout(() => {
          $(".msgSuccess").slideUp(500);
        }, 6000);
      }
    }
  });

  function checkInputkeyUp($input) {
    $input.on("keyup", () => {
      if ($input.val() == "") {
        $input.addClass("is-invalid").siblings("span").show();
        $errors.set($input.attr("id"), "error");
      } else {
        $input.removeClass("is-invalid").siblings("span").hide();
        $errors.delete($input.attr("id"));
      }

      if (name.val() != "" && email.val() != "" && message.val() != "") {
        if ($errors.size == 0) {
          $(".submit-btn").show();
        }
      } else {
        $(".submit-btn").hide();
      }
    });
  }

  let spanEmailValue = email.siblings("span").html();
  function isEmailField($input) {
    $input.on("keyup", () => {
      if (
        $input.val().includes("@") == false ||
        $input.val().includes(".") == false
      ) {
        $input.addClass("is-invalid").siblings("span").show();
        $input.siblings("span").html("This not a email adress");
        $errors.set($input.attr("id"), "error");
      } else {
        $input.removeClass("is-invalid").siblings("span").hide();
        $input.siblings("span").html(spanEmailValue);
        $errors.delete($input.attr("id"));
      }

      if (name.val() != "" && email.val() != "" && message.val() != "") {
        if ($errors.size == 0) {
          $(".submit-btn").show();
        }
      } else {
        $(".submit-btn").hide();
      }
    });
  }

  checkInputkeyUp(name);
  isEmailField(email);
  checkInputkeyUp(message);
});
