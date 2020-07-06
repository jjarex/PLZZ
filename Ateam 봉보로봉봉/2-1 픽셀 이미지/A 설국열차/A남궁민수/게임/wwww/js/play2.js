$(function(){
// START //

/* 변수 저장 */
    
var pc = $("#pc");
var left_px = pc.position().left;    //PC 가로축 좌표 left
var top_px = pc.position().top;        //PC 세로축 좌표 top

var move_d = 1;     //PC 이동거리
var savex_key;    //눌려진 가로키 저장변수
var savey_key;     //눌려진 세로키 저장변수

var movex_timeId = 0;   //가로 setInterval 함수 저장변수
var movey_timeId = 0;   //세로 setInterval 함수 저장변수
var x_on = 0;       //가로방향 키보드 눌림 감지
var y_on = 0;       //세로방향 키보드 눌림 감지

var br_width = $(".game").innerWidth(); //브라우저 가로크기
var br_height = $(".game").innerHeight();//브라우저 세로크기
var pc_width = pc.innerWidth();
var pc_height = pc.innerHeight();
/* // 변수 저장 */


function onkey_press(event) {
    
    if(event.keyCode==37 || event.keyCode==39){
        event.preventDefault();
        
        savex_key = event.keyCode;
        if(x_on != 1){
            x_on=1;
            movex_timeId = setInterval(keyx_move, 1);
        }
    }
    else if(event.keyCode==38 || event.keyCode==40){
        event.preventDefault();
        savey_key = event.keyCode;
        if(y_on!=1){
            y_on=1;
            movey_timeId = setInterval(keyy_move, 1);
         
        }
    }
}
function onkey_clear(event) {
    if(event.keyCode==37 || event.keyCode==39){
        event.preventDefault();
        clearInterval(movex_timeId);
        x_on=0;
    }
    else if(event.keyCode==38 || event.keyCode==40){
        event.preventDefault();
        clearInterval(movey_timeId);
        y_on=0;

    }
}
// 키 눌림 체크 함수,변수에 키값 저장
function keyx_move() {
    if(savex_key == 37){
        left_px -= move_d;
        if(left_px < 0){
            left_px = 0;
        }
    } else if(savex_key == 39){
        left_px += move_d;
        if(left_px > br_width - pc_width){
            left_px = br_width - pc_width;
        }

    }
    pc.css('left', left_px);

}

function keyy_move(){
    if(savey_key == 38){
        top_px -= move_d;

        if(top_px < 200){
            top_px = 200;
        } 
    } else if(savey_key == 40){
        top_px += move_d;
        if(top_px >400){
            top_px = 400;
        }
        
    }if(top_px > br_height - pc_height){
            top_px = br_height - pc_height;
        }	
    pc.css('top', top_px);

}
    


// 적 오브젝트 움직임
function vill_init2(){
    var villain = $('.vill');
    var v_pos = [];
    for(var i = 0; i < villain.length; i++) {
        v_pos.push(villain.eq(i).position().left);
    };
    var count = 0;
    var play_time = setInterval(function() {
        left_px = pc.position().left;
        for(var j = 0; j < villain.length; j++){
            if(left_px >= v_pos[j] - pc_width && left_px <= v_pos[j] + pc_width){
                count++;
                if(j == 0 || j == 3 || j == 5){
                    villain.eq(j).attr("src", "src/image/villain_b.gif");
                    villain.eq(j).stop().animate({bottom:br_height},100);
                } else {
                    villain.eq(j).attr("src", "src/image/villain_f.gif");
                    villain.eq(j).stop().animate({top:br_height},100);
                }
                
            } else {
                if(j == 0 || j == 3 || j == 5){
                    villain.eq(j).attr("src", "src/image/villain_f.gif");
                    villain.eq(j).stop().animate({bottom:0},50);
                } else {
                    villain.eq(j).attr("src", "src/image/villain_b.gif");
                    villain.eq(j).stop().animate({top:0},50);
                }
                // + 빌런 보였다가 사라지기 //
            }
        }
 // + 충돌 판정 //
    }, 10);
}


//$('.start-message').click(function(){
//    pc.attr("src", "src/image/run.gif");
//    $('.start-message').hide();
//    pc_action();
//    vill_init2();
//
//    x_on=0;
//    y_on=0;
//    
//    var left_px = pc.position().left;    //PC 가로축 좌표 left
//    var top_px = pc.position().top;     //PC 세로축 좌표 top
     
    /*var stage_timeID = 0;
    var stage_timer = 20000;
    stage_timeID = setInterval(function(){
        stage_timer--;
    },100);
    console.log(stage_timer);*/
    
 
    
$(document).keyup(function(e){
     if (e.keyCode == 32) {
            $('.start-message').hide();
            pc.attr("src", "src/image/run_right.gif");
            vill_init2();

            x_on=0;
            y_on=0;
     }
      
     if (e.keyCode == 38) {
         pc.attr("src", "src/image/run_right.gif");	//백
         
     }else if (e.keyCode == 39) {
         pc.attr("src", "src/image/run_left.gif");
         
     }else if (e.keyCode == 37) {
         pc.attr("src", "src/image/run_left.gif");

     }else if (e.keyCode == 40) {
         pc.attr("src", "src/image/idle.gif");

     }
 

         // + 스테이지 클리어 판정 //
        
});

$(document).on({
    keydown: function(event){
        onkey_press(event);
    },
    keyup: function(event){
        onkey_clear(event);
    }
});

    
// END //
    
    
});