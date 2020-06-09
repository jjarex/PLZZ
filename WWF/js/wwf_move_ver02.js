$(window).on("load resize scroll", function() {
  $(".oc_box2").each(function() {
    var windowTop = $(window).scrollTop();
    var elementTop = $(this).offset().top;
    var leftPosition = windowTop - elementTop;
      $(this)
        .find(".picmove")
        .css({ left: leftPosition -700});
        
      $(window).scroll(function(){
               if($(this).scrollTop() >= 520){
                   $(".picmove")
                   .animate({left:-700},700);
               } 
                
            });
  });
  
$(".oc_box2").each(function() {
    var windowTop = $(window).scrollTop();
    var elementTop = $(this).offset().top;
    var leftPosition = windowTop - elementTop;
      $(this)
        .find(".picmove")
        .css({ left: leftPosition -700});
        
      $(window).scroll(function(){
               if($(this).scrollTop() >= 520){
                   $(".picmove")
                   .animate({left:-700},700);
               } 
                
            });
  });
    
    
});

$(window).scroll(function(){
   $('.on_box2').each(function(i){
       
   });
});
