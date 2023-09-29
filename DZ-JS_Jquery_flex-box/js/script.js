$(document).ready(function () {   
$("#slideLeft").on("click",  function(){    
if($(this).hasClass("fa-solid fa-caret-right")){
     $(".row-1").animate({'width': '300px'}, 200);
    // $(".row-1").width('100px');
     $(".row-1 i").show();
    $(this).attr('class', 'fa-solid fa-caret-left');    
}else if($(this).hasClass("fa-solid fa-caret-left")){
     $(".row-1").animate({'width': 0 }, 200);
    // $(".row-1").width(0);
     $(".row-1 i").hide();
    $(this).attr('class', 'fa-solid fa-caret-right');   
};

})






});