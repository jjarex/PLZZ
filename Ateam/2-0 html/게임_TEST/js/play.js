$(function(){
// START //

/* 변수 저장 */
var pc = $("#pc");
var left_px = 0;    //PC 가로축 좌표 marginLeft
var top_px = 0;     //PC 세로축 좌표 marginTop
var move_d = 2;     //PC 이동거리
var savex_key;    //눌려진 가로키 저장변수
var savey_key;    //눌려진 세로키 저장변수
var movex_timeId = 0;   //가로 setInterval 함수 저장변수
var movey_timeId = 0;   //세로 setInterval 함수 저장변수
var x_on = 0;       //가로방향 키보드 눌림 감지
var y_on = 0;       //세로방향 키보드 눌림 감지

var br_width = $(".game").innerWidth(); //브라우저 가로크기
var br_height = $(".game").innerHeight();//브라우저 세로크기
var br_width = pc.innerWidth();
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
        if(left_px > 1500 - 152){
            left_px = 150 - 152;
        }

    }
    pc.css('left', left_px);
    console.log(left_px);
}

function keyy_move(){
    if(savey_key == 38){
        top_px -= move_d;

        if(top_px < 0){
            top_px = 0;
        }	
    } else if(savey_key == 40){
        top_px += move_d;
        if(top_px > 750 - 120){
            top_px = 750 - 120;
        }	
    }
    pc.css('top', top_px);
    console.log(top_px);
}

// 적 오브젝트 움직임
function vill_init2(){
    var vill_1 = $('.vill1');
    var vill_2 = $('.vill2');
    var vill_3 = $('.vill3');
    var vill_4 = $('.vill4');
    var vill_5 = $('.vill5');
    var vill_6 = $('.vill6');
    
    vill_1.addClass('villain').css('bottom', 0).stop().animate({'marginBottom':410}, 2000);
    vill_2.addClass('villain').css('top', 0);
    vill_3.addClass('villain').css('top', 0);
    vill_4.addClass('villain').css('bottom', 0);
    vill_5.addClass('villain').css('top', 0);
    vill_6.addClass('villain').css('bottom', 0);
}


$('.start-message').click(function(){
    pc.attr("src", "src/image/okja.gif");
    $('.start-message').hide();
    vill_init2();

    x_on=0;
    y_on=0;
    
    var stage_timeID = 0;
    var stage_timer = 20000;
    stage_timeID = setInterval(function(){
        stage_timer--;
    },100);
    console.log(stage_timer);
    
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