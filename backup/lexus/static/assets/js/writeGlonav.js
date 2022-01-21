$(function () {
  // header loading
  const glonavTempContainerId = "glonavTempContainer";
  const glonavTargetUrlId = "glonav";
  const $glonav = $("#" + glonavTargetUrlId);
  const isIE = function () {
    let userAgent = window.navigator.userAgent.toLowerCase();
    if (
      userAgent.indexOf("msie") !== -1 ||
      userAgent.indexOf("trident") !== -1
    ) {
      return true;
    }
    return false;
  };
  if ($glonav.length) {
    const url = $glonav.data("src");
    const targetUrl = !url ? "/customer/header" : url;
    $.get(targetUrl, function (data) {
      $glonav.before(
        '<div id="' + glonavTempContainerId + '" style="display:none;"></div>'
      );
      $("#" + glonavTempContainerId).html(data);
      const innerPcData = $("#" + glonavTempContainerId).find(".appHeader");
      const innerSpMenu = $("#" + glonavTempContainerId).find(".appSpMenu");
      $glonav.append(innerPcData).append(innerSpMenu);
      const thisData = $glonav.html();
      $glonav.replaceWith(thisData);
      $("#" + glonavTempContainerId).remove();

      // ie custom setting
      if (isIE) {
        let headerHeight = $("body").find(".appHeader").height();
        $("body").find(".appHeader").css({ position: "fixed" });
        $("body").css({ "padding-top": headerHeight });

        let timer = false;
        $(window).on("resize", function () {
          if (timer !== false) {
            clearTimeout(timer);
          }
          timer = setTimeout(function () {
            let resizeHeaderHeight = $("body").find(".appHeader").height();
            if (headerHeight !== resizeHeaderHeight) {
              headerHeight = resizeHeaderHeight;
              $("body").css({ "padding-top": resizeHeaderHeight });
            }
          }, 200);
        });
      }

      // for ie sticky position, trigger resize
      // setTimeout(function () {
      //   var resizeEvent = window.document.createEvent("UIEvents");
      //   resizeEvent.initUIEvent("resize", true, false, window, 0);
      //   window.dispatchEvent(resizeEvent);
      // }, 500);

      // header navi action
      $(".appHeader__nav__sp,.appSpMenu").click(function () {
        $(this).blur(),
          "true" == $(".appSpMenu").attr("aria-hidden")
            ? ($(".appSpMenu").attr("aria-hidden", !1),
              $(".appHeader__inner").attr("aria-hidden", !1),
              $(".appHeader__nav__sp span").attr("aria-hidden", !1),
              $("img").hasClass("appLogo__img") &&
              $(this)
                .closest(".loggedin")
                .find(".appLogo__img")
                .attr(
                  "src",
                  $(".appLogo__img").attr("src").replac$(/white/, "blue")
                ),
              $(".appHeader__nav__sp__menu").hide(),
              $(".appHeader__nav__sp__close").show(),
              $(".appHeader__nav__user").hide(),
              $(".appHeader__nav__login").hide())
            : ($(".appSpMenu").attr("aria-hidden", !0),
              $(".appHeader__inner").attr("aria-hidden", !0),
              $(".appHeader__nav__sp span").attr("aria-hidden", !0),
              $("img").hasClass("appLogo__img") &&
              $(this)
                .closest(".loggedin")
                .find(".appLogo__img")
                .attr(
                  "src",
                  $(".appLogo__img").attr("src").replac$(/blue/, "white")
                ),
              $(".appHeader__nav__sp__menu").show(),
              $(".appHeader__nav__sp__close").hide(),
              $(this).closest(".appHeader").hasClass("loggedin") ||
              $(".appHeader__nav__user").show(),
              $(".appHeader__nav__login").show());
      }),
        $(window).on("load resize", function () {
          window.matchMedia("screen and (min-width: 835px)").matches
            ? $(".loggedin .appHeader__nav__user").show()
            : $(".loggedin .appHeader__nav__user").hide();
        }),
        $(".appSpMenu li").click(function (e) {
          e.stopPropagation();
        }),
        $(".appHeader__nav__list li").hover(
          function () {
            $(this).find(".appHeader__nav__list__sub").show();
          },
          function () {
            $(this).find(".appHeader__nav__list__sub").hide();
          }
        );
      $(".appSpMenu .appSpMenu__navi__subNav").click(function (t) {
        t.preventDefault(),
          $(this).hasClass("header-active")
            ? ($(this).removeClass("active"), $(this).removeClass("header-active"), $(this).find(".appSpMenu__navi__sub").slideUp())
            : ($(this).addClass("active"), $(this).addClass("header-active"), $(this).find(".appSpMenu__navi__sub").slideDown());
      });
      $('.appSpMenu__navi__subNav .appSpMenu__navi__sub a').on('click', function (e) {
        e.stopPropagation();
      });

      // web site 遷移
      // login 遷移
      let pageInit = function () {
        $(document).ready(function () {
          let bind = function (dialog, button, link, form, call) {
            if (0 < dialog.length) {
              link.on('click', function () {
                dialog.attr('aria-hidden', false);
                let timer = setTimeout(function () {
                  timer = null;
                  dialog.attr('aria-hidden', true);
                  // form.submit();
                  button.trigger('click');
                  call(form, timer);
                }, 1000 * 5);
                call(form, timer);
              });
            }
          };

          var timer = null;
          var form = null;
          let dialog = $('#page-move-dialog');
          let button = $('#page-move-dialog button');
          // web site 遷移
          bind(dialog, button, $('#website-dialog-link'), $('#website-dialog-form'), function (f, t) {
            form = f;
            timer = t;
          });

          // login 遷移
          bind(dialog, button, $('#login-dialog-link'), $('#login-dialog-form'), function (f, t) {
            form = f;
            timer = t;
          });

          if (0 < button.length) {
            button.on('click', function () {
              if (null != timer) {
                clearTimeout(timer);
                timer = null;
              }

              dialog.attr('aria-hidden', true);
              if (null != form) {
                form.submit();
                form = null;
              }
            });
          }
        });
      };

      var pool = function () {
        if (typeof jQuery == 'undefined') {
          setTimeout(function () {
            pool();
          }, 1);
        } else {
          pageInit();
        }
      };
      pool();

    });
  }

  // footer loading
  const footerTempContainerId = "footerTempContainer";
  const footerTargetUrlId = "footerContainer";
  const $footer = $("#" + footerTargetUrlId);
  if ($footer.length) {
    const url = $footer.data("src");
    const targetUrl = !url ? "/customer/footer" : url;
    $.get(targetUrl, function (data) {
      $footer.before(
        '<div id="' + footerTempContainerId + '" style="display:none;"></div>'
      );
      $("#" + footerTempContainerId).html(data);
      const innerData = $("#" + footerTempContainerId).find(
        "footer.footerWrapper"
      );
      $footer.append(innerData);
      const thisData = $footer.html();
      $footer.replaceWith(thisData);
      $("#" + footerTempContainerId).remove();
      $(".appSpMenuFooter .appSpMenu__navi__subNav .appSpMenu__navi__subIcon").click(function (t) {
        t.preventDefault();
        const $nav = $(this).closest(".appSpMenu__navi__subNav");
        if ($nav.hasClass("footer-active")) {
          $nav.find(".appSpMenu__navi__sub").slideUp(function () {
            $nav.removeClass("footer-active");
          });
        } else {
          $nav.find(".appSpMenu__navi__sub").slideDown(function () {
            $nav.addClass("footer-active");
          });
        }
      });
      $('.appSpMenu__navi__subNav .appSpMenu__navi__sub a').on('click', function (e) {
        e.stopPropagation();
      });
    });
  }
});
