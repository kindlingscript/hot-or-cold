"use strict"; 
var magicNumber;
var input;
var guessedNums;
var lastGuess = "";
var counter;

/*--- Functions for app ---*/

// Function to come up with magic number.
function getMagicNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Function to find difference between user input and magic number. See how close or far away they are from guessing right. */
function getDiff(input, magicNumber) {
  console.log("guessedNums: " + guessedNums);
  // See if input has already been entered.
  for (var i = 0; i < guessedNums.length; i++) {
    if (input === guessedNums[i] && guessedNums != null) {
      alert("You've already guessed that number. Try another!");
    } else {
      logGuesses();
    }
  };
  
  if (input <= 1 || input >= 100) {
    $("#feedback").html("Please enter a number between 1 and 100.");
  } else {
    guessedNums.push(input);
    // Variables to get difference between current input and magicNum.
    var smallerNum = Math.min(input, magicNumber);
    var largerNum = Math.max(input, magicNumber);
    var diff = largerNum - smallerNum;
    console.log("diff: " + diff);
    console.log("lastGuess: " + lastGuess);
    // Variables to get diff between the last guessed number and magicNum.
    var lastGuessSmallerNum = Math.min(lastGuess, magicNumber);
    var lastGuessLargerNum = Math.max(lastGuess, magicNumber);
    var lastGuessDiff = lastGuessLargerNum - lastGuessSmallerNum;

   // Give feedback on guess.
    if (diff == 0) {
      $("#feedback").html("Sizzling! You got it!");
    } else if (diff >= 1 && diff < 10) { 
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("HOT! You're closing in! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("HOT! You're closing in! Your guess was closer before.");
      } else {
        $("#feedback").html("HOT! You're closing in!");
      }
    } else if (diff >= 10 && diff < 20) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Burner's on, getting hot! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Burner's on, getting hot! Your guess was closer before.");
      } else {
        $("#feedback").html("Burner's on, getting hot!");
      }
    } else if (diff >= 20 && diff < 30) {
      if (diff < lastGuessDiff) { 
        $("#feedback").html("Getting warmer! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Getting warmer! Your guess was closer before.");
      } else {
        $("#feedback").html("Getting warmer!");
      }
    } else if (diff >= 30 && diff < 40) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Slowly warming... your guess is closer now!");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Slowly warming... your guess was closer before.");
      } else {
        $("#feedback").html("Slowly warming...");
      }
    } else if (diff >= 40 && diff < 50) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Still s-sh-shivering. Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Still s-sh-shivering. Your guess was closer before.");
      } else {
        $("#feedback").html("Still s-sh-shivering.");
      }
    } else if (diff >= 50) {
      if (diff < lastGuessDiff) {
        $("#feedback").html("Freezing cold! Your guess is closer now.");
      } else if (diff > lastGuessDiff) {
        $("#feedback").html("Freezing cold! Your guess was closer before.");
      } else {
        $("#feedback").html("Freezing cold!");
      }
    }
  };
  console.log("input: " + input);
  // $("#userGuess").val("").focus();
};

/* If there is a difference between user guess and magic number, then log their guess in #guessList and increment guess count (#count) by 1. */
function logGuesses(input, magicNumber) {
  if (input != magicNumber && (input >= 1 && input <= 100)) {
    $("#guessList").append("<li>" + input + "</li>");
  }
};

// Every time the user submits input, increment guess count until they get the magicNumber.
function incrementGuessCount(input, magicNumber) {
  if (input != magicNumber && (input >= 1 && input <= 100)) {
    counter++;
    $("#count").html("<span>" + counter + "</span>");
  }
};

// Render new game when user click on "+ New Game" link.
function newGame() {
  $("#count").html("<span>0</span>");
  counter = 0;
  $("#guessList").html("");
  $("#feedback").html("Make your guess!");
  guessedNums = [];
  magicNumber = getMagicNumber(1, 100);
  lastGuess = "";
  console.log("magicNumber: " + magicNumber);
  $("#guessButton").click(function(e) {
    e.preventDefault();
    input = $("#userGuess").val();
    // if (input == '') {
    //   alert("Please enter a number first.");
    // } else {
      getDiff(input, magicNumber);
      // console.log(getDiff);
      logGuesses(input, magicNumber);
      // console.log(logGuesses);
      incrementGuessCount(input, magicNumber);
      // console.log(incrementGuessCount);
    // }
  });
};

$(document).ready(function(){
  /*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);
	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

  newGame();

  // To run when the user enters a number.
  // $("#guessButton").click(function(e) {
  //   e.preventDefault();
  //   var input = $("#userGuess").val();
  //   if (input == '') {
  //     alert("Please enter a number first.");
  //   } else {
  //     getDiff(input, magicNumber);
  //     logGuesses(input, magicNumber);
  //     incrementGuessCount(input, magicNumber);
  //   }
  // });

  $("a.new").click(function() {
    newGame();
  });
});