/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
above are the originl rules of the game from the udemy course i followed about javascript. I decided since halloween is coming up
to chanfe the photos from dice to pumpkins and depending on which face comes up, it will add points the user will lose all
their points and it will change to the other user's turn. Still the same rules, just changing the photos really.
*/
var scores, roundScore, activePlayer;

//call init function
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  //when someone clicks the button, we need a random number
  var nightmare = Math.floor(Math.random() * 6) + 1;
  // console.log(pumpkin);
  //then we need to display result
  var nightmareDOM = document.querySelector(".nightmare");
  nightmareDOM.style.display = "block";
  nightmareDOM.src = "nightmare-" + nightmare + ".png";

  //Update the round score but only if the rolled pumpkin is not pumpkin1
  if (nightmare !== 1) {
    //add score
    roundScore += nightmare;
    //first update roundScore
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    //then display roundScore
  } else {
    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  //add current score to players global score
  scores[activePlayer] += roundScore;
  //the above is equivalent to scores[activePlayer] = score[activePlayer] + roundScore
  //so the scores that the active player had plus the round score

  //update user interface(UI)
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  //check if player won the game
  if (scores[activePlayer] >= 100) {
    //must be >= because of how the idce is rolled, if its over 100 and we only used ====
    //then it wouldnt count that as a win
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    //after winning the dice with not be shown
    document.querySelector(".pumpkin").style.display = "none";
    //below, using a class made in css, when a user wins, we use that class to remove the
    //active player effect
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("winner");
  }

  nextPlayer();
});

//implement DRY
//by creating this function, we can use it in our others that require similar/same code. this way
//we do not repeat ourselves or make our code confusing/messy
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //same as an if statement, but its a turnery

  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //now reset the score to 0 when a 1/sad pumpkin is rolled

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //remove active class and move it to the player whos turn it actually is

  document.querySelector(".pumpkin").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector(".nightmare").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";

  //remove winner class when clicking new game or at beginning
  //remove class from both because we dont know who won/wins the game
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  //do the same for the active player as well
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  //we remove the active class so we are sure it is not anywhere

  //then add it back to the first one
  document.querySelector(".player-0-panel").classList.add("active");
}

//the abover was used to test something but may need it later
