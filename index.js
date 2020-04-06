var seq = [];
var userClicks;
var level;
var myAudio = {
  start: new Audio("sounds/Air Horn.mp3"),
  green: new Audio("sounds/green.mp3"),
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  wrong: new Audio("sounds/wrong.mp3")
};

$(document).on("keypress",function(){
  if(seq.length==0)
  startGame();
});

function startGame(){
  myAudio.start.play();
  userClicks = [];
  level = 1;
  $("#level-title").text("Level 1");
  setTimeout(generateNum,2200);
}

function generateNum(){
    var currentNum = Math.floor(4 * Math.random());
    seq.push(currentNum);
    generateFlashByNum(currentNum);
}

$(".btn").on("click", function() {
  var myId = this.getAttribute("id");

  generateFlashById(myId);

  var myNum = idToNum(myId);
  userClicks.push(myNum);

  clickAuthenticate();
});

function clickAuthenticate(){
  var lastIndex = userClicks.length-1;
  if(userClicks[lastIndex]==seq[lastIndex])
  {
    if(userClicks.length==seq.length)
    {
      userClicks = [];
      level++;
      setTimeout(function(){$("#level-title").text("Level "+level);},700); //400
      setTimeout(generateNum,1300);//1500
    }
  }
  else
  gameOver();
}

function gameOver(){
  userClicks = [];
  seq = [];
  $("#level-title").text("Press any Key to Start");
  myAudio.wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
}

function generateFlashByNum(num){
  id = numToId(num);
  generateFlashById(id);
}

function generateFlashById(id){
  $("#"+id).addClass("pressed");
  setTimeout(function(){
    $("#"+id).removeClass("pressed");
  },100);
  myAudio[id].play();
  setTimeout(function(){},100);
}

function idToNum(id){
  switch (id) {
    case "green":
      return 0;
    case "red":
      return 1;
    case "yellow":
      return 2;
    case "blue":
      return 3;
  }
}

function numToId(num){
  switch (num) {
    case 0:
      return "green";
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "blue";
  }
}
