$(document).ready(function(){
    
          var visual = $('#slide>ul>li');
          var button = $('#buttonList > ul > li');
          var current = 0;
          var setIntervalId;
          var timerID = 0;
           
            button.on({
                click:function(){
                    var tg = $(this);
                    var i = tg.index();
                    button.removeClass('on');
                    tg.addClass('on');
                    move(i);
                }
            })
            
            timer();
            
            $("#wrap").on({
                mouseover:function(){
                    clearInterval(setInterval);
           timerID = 0;
            if(!timerID==0){
                timerID = 0;
            }
                },
                
//                mouseout:function(){
//                     setInterval(function(){
//                    $('#next').click();
//                },1800);
//                }
                
            });
            
            function timer(){
                  clearInterval(timerID);
           timerID = 0;
            if(timerID==0){
                timerID = 
                    setInterval(function(){
                    $('#next').click();
                },5800);
              }
//            
            }
            function move(i){
                if(current == i) return; //==i 는, 그냥 아무것도 실행하지 말란 뜻
                var current1 = visual.eq(current);
                var next1 = visual.eq(i);
                
                current1.css({left:0}).stop().animate({left:'-100%'});
                next1.css({left:"100%"}).stop().animate({left:0});
                
                current = i;
            }
            
            function move_pre(i){
                
                if(current == i) return; //==i 는, 그냥 아무것도 실행하지 말란 뜻
                var current2 = visual.eq(current);
                var next2 = visual.eq(i);
                
                current2.css({left:0}).stop().animate({left:'100%'});
                next2.css({left:"-100%"}).stop().animate({left:0});
                
                current = i;
            }
            
            
//            $("#next").click(function(){
//                    var i = current + 1;
//                    if(i > visual.length -1) i = 0;                
//                    button.eq(i).trigger('click');
//                    console.log("aaa");
//            
//            });
            $("#next").click(function(){
                 var i = current + 1;
                    if(i > visual.length -1) i = 0;                
                    button.eq(i).trigger('click');
                    console.log("aaa");
            });
    
            $("#pre").on({
                click:function(){
                    var i = current -1;
                    if (i < 0) i = visual.length -1;        
                    
                    move_pre(i);
                    button.eq(i).trigger('click');
                }
            });
            
      $(window).scroll(function(){
               if($(this).scrollTop() >= 500){
                   $("#gotoTop").fadeIn();
               } else {
                   $("#gotoTop").fadeOut();
               }
            });
            $("#gotoTop").click(function(){
               $('html, body').animate({scrollTop:0},1000); 
            });
    
});
      
