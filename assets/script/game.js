"use strict"

$(document).ready(function () {
  $("#nextRound").show();
  const wordList = ["hendricks", "bighetti", "dinesh", "gilfoyle", "monica", "jared", "gavin", "bachman", "bream", "gregory", "raviga", "compression", "hooli", "weissman"];
  var gameStatus = true; //game is on
  console.log("gameStatus is: " + gameStatus);
  var roundNo = 0;
  $("#roundDisp").html(roundNo);


  // IN GAME MUSIC AND SOUNDS
  var gameMusic = document.createElement("audio");
  gameMusic.setAttribute("src", "assets/music/song.mp3");
  var correctSound = document.createElement("audio");
  correctSound.setAttribute("src", "assets/music/correctSound.mp3");
  $("#musicPause").on("click", function () {
    gameMusic.pause()
  });
  $("#musicPlay").on("click", function () {
    gameMusic.play()
  });



  // START GAME FUNCTION
  function startGame() {
    let playerName = prompt("Enter Your Name");
    if (confirm("Welcome to Word Guesser 1.0. The instructions are simple- Guess the Word! Play by simply pressing a key on your keyboard to guess letters. You only get 5 lives incase you incorrectly guess a letter. Press OK to play")) {
      $("#playerName").html(playerName);
      round();
    }

  }


  // EACH ROUND FUNCTION
  function round() {
    roundNo++
    console.log("Round Number: " + roundNo);
    $("#roundDisp").html(roundNo);
    $(".nextRoundBTN").hide();
    $("#nextRound").hide();
    var lives = 5;
    $("#livesDisp").html(lives);
    var placeHolder = [];
    var wrongGuess = [];



    //PICKING MYSTERYWORD AND POSTING PLACEHOLDER
    var rand = Math.floor(Math.random() * wordList.length);
    var mysteryWord = wordList[rand].split("");
    for (let i = 0; i < mysteryWord.length; i++) {
      placeHolder.push("_");
      $("#wordDisp").html(placeHolder);
    }
    console.log("placeHolder is: " + placeHolder)
    console.log("mysteryWord is: " + mysteryWord)




    $(document).on("keyup", function (event) {
      var userGuess = event.key;
      console.log("userGuess is: " + userGuess);




      if (mysteryWord.includes(userGuess) || wrongGuess.includes(userGuess)) {
      } else {
        wrongGuess.push(userGuess);
        lives--
        console.log("lives remaining: " + lives)
        $("#lives").html(lives);
        $("#wrongLetters").prepend("<p class='tryagain'>" + userGuess + "</p><hr>");

      }

      for (let i = 0; i < placeHolder.length; i++) {
        if (userGuess === mysteryWord[i]) {
          placeHolder[i] = userGuess;
          $("#wordDisp").html(placeHolder);
          correctSound.play()


        }
      }

      var randWord = mysteryWord.join("");
      var userWord = placeHolder.join("");

      // console.log("placeHolder is: " + placeHolder)
      // console.log("mysteryWord is: " + mysteryWord)

      if (randWord == userWord) {
        placeHolder = [];
        wrongGuess = [];
        $(".nextRoundBTN").show();
        $("#nextRound").show();

        gameStatus = false; // game is off
        console.log("gameStatus is: " + gameStatus);
        console.log("### WINNER ###")
        $("#nextRound").html("WEENER!!");


        var nextRoundButton = $("<button>");
        nextRoundButton.addClass("btn button btn-success nextRoundBTN");
        nextRoundButton.attr("id", "nextRound");
        nextRoundButton.text("Next Round!")
        $("#nextRound").append(nextRoundButton);

        $(nextRoundButton).on("click", function () {
          round();
        });




        // $("#nextRound").append("<button class='btn button warning' id='nextRound'>Next Round</button>");



      }


    }); // END OF $(document).on("keyup", function(event){

  }

  startGame();




}); // END OF $(document).ready(function () {