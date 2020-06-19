$(document).ready(function(){
    var btn01 = $(".showtc01");
    var btn02 = $(".showtc02");
    btn01.click(function(e){
        e.preventDefault();
        $(".tcagree02").stop().slideUp();
        $(".tcagree01").stop().slideToggle();
    });
    btn02.click(function(e){
        e.preventDefault();
        $(".tcagree01").stop().slideUp();
        $(".tcagree02").stop().slideToggle();
    });
    
});