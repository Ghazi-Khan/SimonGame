
var level = 0;
var isFirstTime = true;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var soundLsit = {
  "blue": "sounds/blue.mp3",
  "green": "sounds/green.mp3",
  "red": "sounds/red.mp3",
  "yellow": "sounds/yellow.mp3",
  "wrong" : "sounds/wrong.mp3"
};


// User clicking on any button.
$(".btn").on("click", function() {

  var userChosenColour = this.id;

  if(userChosenColour === "rst"){
    if(isFirstTime){    // key work only for first time and only if game is ended.
      isFirstTime = false;
      nextSequence();
      $("#"+this.id).text("Restart");
    }else{
      startOver();
    }
  }else if(!isFirstTime){
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }

});


// User enter any key to start the Game
$(document).on("keypress", function(){
  if(isFirstTime){    // key work only for first time and only if game is ended.
    isFirstTime = false;
    nextSequence();
  }
});

// Generating the next color.
function nextSequence() {
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); console.log(gamePattern);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern = [];
  level++;
}

//Checking the asnwer.
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length)
      setTimeout(function(){
        nextSequence();
      },1000);

  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Restart the game.
function startOver(){
  level = 0;
  isFirstTime = true;
  gamePattern = [];
}



function playSound(soundType) {
  var sound = new Audio(soundLsit[soundType]);
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed"), 100
  });
}
