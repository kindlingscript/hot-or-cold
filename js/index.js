"use strict";
var magicNumber = getMagicNumber(1, 100);
var guessedNums = [];
var lastGuess = "";
var counter = 0;

// Function to come up with magic number.
function getMagicNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function checkGuess() {
  var input = $("#userGuess").val();

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
  };
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

  // Runs & gives feedback when user clicks / presses Enter on "Guess" button
  $("#guessButton").click(function(e) {
    e.preventDefault();
    checkGuess();

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

    var hot = "HOT! You're closing in! ";
    var burner = "Burner's on, getting hot! ";
    var warmer = "Getting warmer! ";
    var warm = "Slowly warming... ";
    var shivering = "Still s-sh-shivering. ";
    var freezing = "Freezing cold! ";

    var closer = "Your guess is closer now.";
    var farther = "Your guess was closer before.";

    // Show feedback on guess to user
    if (diff == 0) {
      $("#feedback").html("Sizzling! You got it!");
    } else if (diff >= 1 && diff < 10) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${hot} ${closer}`);
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${hot} ${farther}`);
      } else {
        $("#feedback").html(`${hot}`);
      }
    } else if (diff >= 10 && diff < 20) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${burner} ${closer}`);
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${burner} ${farther}`);
      } else {
        $("#feedback").html(`${burner}`);
      }
    } else if (diff >= 20 && diff < 30) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${warmer} ${closer}`);
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${warmer} ${farther}`);
      } else {
        $("#feedback").html(`${warmer}`);
      }
    } else if (diff >= 30 && diff < 40) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${warm} ${closer}`);
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${warm} ${farther}`);
      } else {
        $("#feedback").html(`${warm}`);
      }
    } else if (diff >= 40 && diff < 50) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${shivering} ${closer}`);
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${shivering} ${farther}`);
      } else {
        $("#feedback").html(`${shivering}`);
      }
    } else if (diff >= 50) {
      if (diff < lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${freezing} ${closer}`);
      } else if (diff > lastGuessDiff && lastGuess != "") {
        $("#feedback").html(`${freezing} ${farther}`);
      } else {
        $("#feedback").html(`${freezing}`);
      }
    };

    // Change icons dependent on how close guess is to magicNumber
    if (diff >= 0 && diff < 30) {
      $('.cold-icon').hide();
      $('.hot-icon').show();
    } else if (diff >= 30) {
      $('.hot-icon').hide();
      $('.cold-icon').show();
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
