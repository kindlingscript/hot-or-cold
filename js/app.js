"use strict"; 
var magicNumber = getMagicNumber(1, 100);
var guessedNums = [];
var lastGuess = "";
var counter = 0;

// Function to come up with magic number.
function getMagicNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

  // Runs & gives feedback when user clicks / presses Enter on "Guess" button
  $("#guessButton").click(function(e) {
    e.preventDefault();
    
    var input = $("#userGuess").val();
    
    // First four blocks here = preliminary checks before moving on
    if (input == "") {
      alert("Please enter a number first.");
      return;
    };

    for (var i = 0; i < guessedNums.length; i++) {
      if (input === guessedNums[i] && guessedNums != null) {
        $("#feedback").html("You've already guessed that number. Try another!");
        return;
      };
    };

    if (isNaN(input)) {
      $("#feedback").html("Please only enter numbers.");
      return;
    };

    if (input < 1 || input > 100) {
      $("#feedback").html("Please enter a number between 1 and 100.");
      return;
    }; // End preliminary checks

    // Add input to list of guessed numbers
    if (input != magicNumber) {
      $("#guessList").append("<li>" + input + "</li>");
    };

    // Add input to array of guessedNums
    guessedNums.push(input);

    // Get last user guess for comparison of guesses
    // Go back 2 as we already pushed the current guess to array
    lastGuess = guessedNums[guessedNums.length - 2]; 

    // Get current difference between magicNum and input
    var smallerNum = Math.min(input, magicNumber);
    var largerNum = Math.max(input, magicNumber);
    var diff = largerNum - smallerNum;

    // Get difference between lastGuess input and magicNum for comparison feedback
    var lastGuessSmallerNum = Math.min(lastGuess, magicNumber);
    var lastGuessLargerNum = Math.max(lastGuess, magicNumber)
    var lastGuessDiff = lastGuessLargerNum - lastGuessSmallerNum;

    // Show feedback on guess to user
    if (diff == 0) {
      $("#feedback").html("Sizzling! You got it!");
    } else if (diff >= 1 && diff < 10) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("HOT! You're closing in! Your guess is closer now.");
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html("HOT! You're closing in! Your guess was closer before.");
      } else {
        $("#feedback").html("HOT! You're closing in!");
      }
    } else if (diff >= 10 && diff < 20) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Burner's on, getting hot! Your guess is closer now.");
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Burner's on, getting hot! Your guess was closer before.");
      } else {
        $("#feedback").html("Burner's on, getting hot!");
      }
    } else if (diff >= 20 && diff < 30) {
      if (diff < lastGuessDiff && lastGuess != "") { 
        $("#feedback").html("Getting warmer! Your guess is closer now.");
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Getting warmer! Your guess was closer before.");
      } else {
        $("#feedback").html("Getting warmer!");
      }
    } else if (diff >= 30 && diff < 40) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Slowly warming... your guess is closer now!");
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Slowly warming... your guess was closer before.");
      } else {
        $("#feedback").html("Slowly warming...");
      }
    } else if (diff >= 40 && diff < 50) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Still s-sh-shivering. Your guess is closer now.");
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Still s-sh-shivering. Your guess was closer before.");
      } else {
        $("#feedback").html("Still s-sh-shivering.");
      }
    } else if (diff >= 50) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Freezing cold! Your guess is closer now.");
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html("Freezing cold! Your guess was closer before.");
      } else {
        $("#feedback").html("Freezing cold!");
      }
    };

    // Increment the counter
    if (input != magicNumber) {
      counter++;
      $("#count").html("<span>" + counter + "</span>");
    };

    // Clear out the last guess & focus on input box
    $("#userGuess").val("").focus();
  });

  // Render new game
  $(".new").click(function() {
    $("#count").html("<span>0</span>");
    counter = 0;
    magicNumber = getMagicNumber(1, 100);
    $("#guessList").html("");
    $("#feedback").html("Make your guess!");
    guessedNums = [];
    lastGuess = "";
    $("#userGuess").val("").focus();
  });
});