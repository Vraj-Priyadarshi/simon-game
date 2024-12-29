var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){

    
    $("#level-title").text(`level ${level}`);
    nextsequence();
    started = true;
    }
})


$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextsequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text(`level ${level}`);
    var randomNumber = Math.floor(Math.random()*(4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);
} 



function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("yeee");
        if (userClickedPattern.length === gamePattern.length){

           
            setTimeout(function () {
              nextsequence();
            }, 1000);
    
          }
    }else{
        playsound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over Press any key");
        startOver();

    }
}

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}