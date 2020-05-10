
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(event){
  if(!started)
  {
    nextSequence();
    started = true;
  }
});


$(".btn").click(function()
{
var userChosenColour = $(this).attr("id");
playSound(userChosenColour);
animatePress(userChosenColour);
userClickedPattern.push(userChosenColour);
// console.log(userClickedPattern);

checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");

    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);

    }

  }

  else{
  console.log("wrong");

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  if(level<=5)
  $("#level-title").html("Game Over, You reached till Level  "+level+"<br>"+"<br>"+"You have a Poor Memory 🥺"+"<br>"+"<br>"+"Press Any Key to Restart");
  else if(level<=10)
  $("#level-title").html("Game Over, You reached till Level  "+level+"<br>"+"<br>"+"You can do better🙂"+"<br>"+"<br>"+"Press Any Key to Restart");
  else
  $("#level-title").html("Game Over, You reached till Level  "+level+"<br>"+"<br>"+"You are Brilliant😎"+"<br>"+"<br>"+"Press Any Key to Restart");

  startOver();
}

}

function nextSequence()
{
  userClickedPattern = [];
  $("#level-title").text("Level "+level);
  level++;

  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColours = buttonColours[randomNumber];
  gamePattern.push(randomChosenColours);
  // console.log(gamePattern);
  $("#" + randomChosenColours).fadeOut(100).fadeIn(100);

  playSound(randomChosenColours);

}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass('pressed');
}, 100);
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
