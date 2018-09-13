"use strict"

$(document).ready(function () {
  $("#nextRound").show();
  const wordList = ["bearlephant", "incorrect", "magic", "console", "javascript", "five"];
  var gameStatus = true; //game is on
  console.log("gameStatus is: " + gameStatus);
  let roundNo = 1;
  

  function startGame() {
    let playerName = prompt("Enter Your Name");
    if (confirm("Press OK to play")) {
      $("#playerName").html(playerName);
      round();
    }

  }



  function round() {
    $("button").hide();
    $("#nextRound").hide();
    let lives = 5;
    $("#livesDisp").html(lives);
    let placeHolder = [];
    let wrongGuess = [];



    //PICKING MYSTERYWORD AND POSTING PLACEHOLDER

    
    let rand = Math.floor(Math.random() * wordList.length);
    let mysteryWord = wordList[rand].split("");
    for (let i = 0; i < mysteryWord.length; i++) {
      placeHolder.push("_");
      $("#wordDisp").html(placeHolder);
    }
    console.log("placeHolder is: " + placeHolder)
    console.log("mysteryWord is: " + mysteryWord)
    
    


    $(document).on("keyup", function (event) {
      let userGuess = event.key;
      console.log("userGuess is: " + userGuess);




      if (mysteryWord.includes(userGuess) || wrongGuess.includes(userGuess)) {
      } else {
        wrongGuess.push(userGuess);
        lives--
        $("#livesDisp").html(lives);
        $("#wrongLetters").prepend("<p class='tryagain'>" + userGuess + "</p><hr>");
        
      }

      for (let i = 0; i < placeHolder.length; i++) {
        if (userGuess === mysteryWord[i]) {
          placeHolder[i] = userGuess;
          $("#wordDisp").html(placeHolder);
          
        }
      }

      var randWord = mysteryWord.join("");
      var userWord = placeHolder.join("");

      // console.log("placeHolder is: " + placeHolder)
      // console.log("mysteryWord is: " + mysteryWord)

      if (randWord == userWord) {
        let placeHolder = [];
        let wrongGuess = [];
        $("button").show();
        $("#nextRound").show();
        roundNo++
        console.log("Round Number: " + roundNo);
        $("#roundDisp").html(roundNo);
        gameStatus = false; // game is off
        console.log("gameStatus is: " + gameStatus);
        console.log("### WINNER ###")
        $("#nextRound").html("WEENER!!");
        

        var nextRoundButton = $("<button>");
        nextRoundButton.addClass("btn button warning");
        nextRoundButton.attr("id", "nextRound");
        nextRoundButton.text("Next Round!")
        $("#nextRound").append(nextRoundButton);

        $(nextRoundButton).on("click", function(){
          round();
        });




        // $("#nextRound").append("<button class='btn button warning' id='nextRound'>Next Round</button>");
        
        

      }


    }); // END OF $(document).on("keyup", function(event){

  }

  startGame();




}); // END OF $(document).ready(function () {