$(window).on("load resize scroll", function() {
  $(".oc_box2").each(function() {
    var windowTop = $(window).scrollTop();
    var elementTop = $(this).offset().top;
//    var leftPosition = windowTop - elementTop;
//      $(this)
//        .find(".picmove")
//        .css({ left: leftPosition -700});
//        
      $(window).scroll(function(){
               if($(this).scrollTop() >= 520){
                   $(".picmove")
                   .animate({left:-700},900);
               } 
            });
  });
  
$(".k_act").each(function() {
    var windowTop = $(window).scrollTop();
    var elementTop = $(this).offset().top;
      
      $(window).scroll(function(){
               if($(this).scrollTop() >= 4200){
                   $(".k_act")
                   .fadeIn(300);
               } 
                
            });
  });
   
    
});
