"use strict"

$(document).ready(function () {
  $("#nextRound").show();
  const wordList = ["hendricks", "bighetti", "dinesh", "gilfoyle", "monica", "jared", "gavin", "bachman", "bream", "gregory", "raviga", "compression", "hooli", "weissman"];
  const clue = ["mastermind behind the algo", "aka big head", "the tesla guy", "jesus freak", "their only female friend", "this guy f*@%s", "gavin", "steve jobs", "the money robot", "cicadas", "their main source of income", "the entire reason why they're doing this", "their biggest competitor", "the proof!"];
  // var gameStatus = true; //game is on
  var roundNo = 0;
  $("#roundDisp").html(roundNo);
  var wrongGuess = [];
  var placeHolder = [];
  var mysteryWord = [];
  var randWord = "x";
  var userWord = "y";
  var gameStatus = true;
  var lives = 8;


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
    gameStatus = true;
    lives = 8;
    placeHolder = [];
    wrongGuess = [];
    mysteryWord = [];
    randWord = "x";
    userWord = "y";
    // console.log("gameStatus1 is: " + gameStatus);
    console.log("Round Number: " + roundNo);
    $("#roundDisp").html(roundNo);
    $(".nextRoundBTN").hide();
    $("#nextRound").hide();
    $("#lives").html(lives);



    //PICKING MYSTERYWORD AND POSTING PLACEHOLDER
    var rand = Math.floor(Math.random() * wordList.length);
    mysteryWord = wordList[rand].split("");
    $("#clue").html(clue[rand]);
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

        if(lives === 0){
          if(confirm("GAME OVER! Try Again?")){
            location.reload()
          }else{
            location.assign("https://www.github.com/trizmo")
          }

        }


        console.log("lives remaining: " + lives)
        $("#lives").html(lives);
        $("#wrongLetters").prepend("<p class='tryagain'>" + userGuess + "</p><hr>");

      }

      for (let i = 0; i < placeHolder.length; i++) {
        if (userGuess === mysteryWord[i]) {
          placeHolder[i] = userGuess;
          $("#wordDisp").html(placeHolder);
          console.log("placeHolder is: " + placeHolder)
          correctSound.play()


        }
      }

      randWord = mysteryWord.join("");
      userWord = placeHolder.join("");

      // console.log("placeHolder is: " + placeHolder)
      // console.log("mysteryWord is: " + mysteryWord)

      if (randWord === userWord) {
        // placeHolder = [];
        // wrongGuess = [];
        $(".nextRoundBTN").show();
        $("#nextRound").show();

        gameStatus = false; // game is off
        console.log("gameStatus2 is: " + gameStatus);
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