// submitの時、内容validation起動

$('.primaryButton, .PrimaryButton , .SecondaryButton').not(".st2,.lxnxtbtn,.modalclose").click(function() {
   $("select[data-required=\"true\"]").each(function() {
     var el = $(this);
      if (el.data("business-job")) {
       if ($.inArray(parseInt(el.val()), [ 6, 7, 9, 11 ]) != -1) {
         flag = true;
         $(el.data("visible-field")).find(".formContent__row").find("input[data-required=\"true\"],select[data-required=\"true\"],textarea[data-required=\"true\"]").each(function() {
             $(this).parents(".formContent__row").find(".formContent__row__error span.message").text("");
             $(this).removeAttr("data-required");
          });
         }
        }
    });
    // submit から　起きる事をセット
    $('#zipCode1').data("is-submit", true);
    // input text
    // input checkbox, radio
    $("input[data-required=\"true\"]").not(".zipCd").keyup();
   
    if($(this).hasClass("creditcardbtn") || $(this).hasClass("confirm")){
      if(!$("input[type=\"radio\"]:checked").val()){     
        $("input[data-required=\"true\"]").change();
      }
    }else if($(this).hasClass("guarantor2")){
      $("input[name='gender']").not(".chgreq").change();
      $("input[name='confirmPlaceCode']").not(".chgreq").change();
    }else{
      $("input[data-required=\"true\"]").change();
    }
    
    //textarea
    $("textarea[data-required=\"true\"]").keyup();
    // select
    $("select[data-required=\"true\"]").change();
    // どちら電話番号
    $("input[data-tel-group]").keyup();
    // ご連絡の取りやすい時間帯
    $("div[data-check-group=\"true\"] input[type=\"checkbox\"]").change();
    
    $(".entry-agreement__AgreeWrapper input[type=\"checkbox\"]").change();
    
    $(".Contract_checkbox input[type=\"checkbox\"]").change();
    
    $("input[data-email-exist=\"true\"]").blur();
    
    var flag = true;
    if($(this).hasClass("loginbtn")){
      $(".loginForm__row__error span.message").each(function(){      
        if ($(this).text()) {
          var el = $(this).parents(".formContent__row");
          flag = false;
          if (el && el.offset()) {
              $(window).scrollTop(
              parseInt(el.offset().top)
              -
              parseInt(el.height())
              );
          }
          return false;
        }
      }); 
    }else{
      $(".formContent__row__error span.message").each(function(){      
        if ($(this).text()) {
          var el = $(this).parents(".formContent__row");
          flag = false;
          if (el && el.offset()) {
              $(window).scrollTop(
              parseInt(el.offset().top)
              -
              parseInt(el.height())
              );
          }
          return false;
        }
      }); 
    }
    if (!flag) {
        return false;
    } else {
        // noDoubleClickがあった場合、disabled true
        if ($(this).hasClass("noDoubleClick")) {
            $(this).prop('disabled', true);
            $('.noDoubleClickForm').submit();
            return false;
        }
        if($(this).hasClass("confirm")) {
          $('#ConfirmPopup').attr('aria-hidden', 'false'); 
          return false;
        }
        if($(this).hasClass("creditcardbtn")){
          submitForm();
          return false;
        }
       return true;
    }
});

$('.exclusiveAction').each(function() {
  $(this).click(function() {
    var clicked = this;
    $('.exclusiveAction').each(function() {
      if (this !== clicked) {
        if ($(this).is('a')) {
          $(this).attr('href', 'javascript: void(0)');
        } else {
          $(this).attr('disabled', true);
        }
      }
    })
  })
})
