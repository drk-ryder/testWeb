jQuery(document).ready(function($) {

  'use strict';

//***************************
    // Url base class add
    //***************************

  var path = window.location.pathname.split("/").pop();      
  var target = $('a[href="'+path+'"]');
  target.addClass('active');
target.parents("li.ccg-dropdown").addClass("dropdown-active");




    $(".ccg-dropdown").click(function(){
        $(".ccg-dropdown").not($(this)).removeClass('dropdown-active');
        $(this).toggleClass("dropdown-active");
    });


$("#click").click(function() {
  $(".header-search").addClass("active");
  $(".click").addClass("active");
});

      //***************************
    // Click to Top Button
    //***************************
    jQuery('.top-btn').on("click", function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 3000);
        return false;
    });


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
      

});



$(function () {
        $('.select').multipleSelect({
        });
      });
