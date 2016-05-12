"use strict"; 

/*--- Functions for app ---*/

// Function to come up with magic number.
function getMagicNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Function to find difference between user input and magic number. See how close or far away they are from guessing right. */
var guessedNums = []; // Global variable
function getDiff(input, magicNumber) {
  // See if input has already been entered.
  for (var i = 0; i < guessedNums.length; i++) {
    if (input == guessedNums[i]) {
      alert("You've already guessed that number. Try another!");
    }
  }
  guessedNums.push(input);

  // Variables to get difference.
  var smallerNum = Math.min(input, magicNumber);
  var largerNum = Math.max(input, magicNumber);
  var diff = largerNum - smallerNum;

  // Check for valid input.
  if (input <= 1 || input >= 100) {
    $("#feedback").html("Please enter a number between 1 and 100.");
  } else { // Give feedback on guess.
    if (diff == 0) {
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
  $("#userGuess").val("").focus();
};

/* If there is a difference between user guess and magic number, then log their guess in #guessList and increment guess count (#count) by 1. */
function logGuesses(input, magicNumber) {
  if (input != magicNumber && (input >= 1 && input <= 100)) {
    $("#guessList").append("<li>" + input + "</li>");
  }
};

// Every time the user submits input, increment guess count until they get the magicNumber.
var counter = 0;
function incrementGuessCount(input, magicNumber) {
  if (input != magicNumber && (input >= 1 && input <= 100)) {
    counter++;
    $("#count").html("<span>" + counter + "</span>");
  }
};

// Render new game when user click on "+ New Game" link.
function newGame() {
  $("#count").html("<span>" + 0 + "</span>");
  counter = 0;
  $("#guessList").html("");
  $("#feedback").html("Make your guess!");
};

$(document).ready(function(){
  var magicNumber = getMagicNumber(1, 100);

  /*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  // To run when the user enters a number.
  $("#guessButton").click(function(e) {
    e.preventDefault();
    var input = $("#userGuess").val();
    if (input == '') {
      alert("Please enter a number first.");
    } else {
      getDiff(input, magicNumber);
      logGuesses(input, magicNumber);
      incrementGuessCount(input, magicNumber);
    }
  });

  $("a.new").click(function() {
    newGame();
  });
});