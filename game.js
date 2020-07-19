var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index = 0;
var started = false;

$("h1").click(function(){
  if(!started){
    level=0;
    started = true;
    nextSequence();
  }
});

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkSequence(userChosenColour);
});

function checkSequence(clickedColour){
  if(clickedColour == gamePattern[index]){
    index++;
    console.log("succes");
    if(index==gamePattern.length){
      setTimeout(nextSequence(),1000);
    }
  }
  else{
    console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    started=false;
    $("h1").text("Click here to Start");
    gamePattern=[];
    userClickedPattern=[];
  }
}

function nextSequence() {
  level++;
  index=0;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("." + randomChosenColour).fadeOut(500).fadeIn(500);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("https://rajatupadhyay9.github.io/simon/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");}, 100);
}
