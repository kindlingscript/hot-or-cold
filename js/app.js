// Function to come up with magic number.
function getMagicNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to make sure input is between 1 - 100
function checkInputValidity(input) {
  if (input < 1 || input > 100) {
    $("#feedback").html("Please enter a number between 1 and 100.");
  } 
}

// Function to find difference between user input and magic number.
// See how close or far away they are from guessing right.
function getDiff(input, magicNumber) {
  var diff = input - magicNumber;
  if (diff === 0) {
    $("#feedback").html("Sizzling! You got it!");
  } else if (diff >= 1 && diff < 10) { 
    $("#feedback").html("HOT! You're closing in!");
  } else if (diff >= 10 && diff < 20) {
    $("#feedback").html("Burner's on, getting hot!");
  } else if (diff >= 20 && diff < 30) {
    $("#feedback").html("Getting warmer!");
  } else if (diff >= 30 && diff < 40) {
    $("#feedback").html("Slowly warming...");
  } else if (diff >= 40 && diff < 50) {
    $("#feedback").html("Still s-sh-shivering.");
  } else if (diff >= 50) {
    $("#feedback").html("Freezing cold!");
  }
}

/***
If there is a difference between user guess and magic number, then log their guess in #guessList and increment guess count (#count) by 1. 
***/
function logGuesses(input, magicNumber) {
  var diff = input - magicNumber;
  var counter = 0;
  if (diff > 0) {
    counter += 1;
    $("#count").html(counter);
    $("#guessList").append("<li>" + input + "</li>");
  }
}

// Render new game when user click on "+ New Game" link.
function newGame() {

}

$(document).ready(function(){
  /*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  // Generate a new magicNumber.
  var magicNumber = getMagicNumber(1, 100);

  // To run when the user enters a number.
  $("form").on("click", "#guessButton", function(e) {
    e.preventDefault();
    var input = $("#userGuess").val();
    checkInputValidity(input);
    getDiff(input, magicNumber);
    logGuesses(input, magicNumber);
  })
});