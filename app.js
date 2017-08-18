/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,maxScore,previousDice;

init();

var diceDom = document.querySelector('.dice');
var scoreDom = document.querySelector('#score-'+activePlayer);
var currentDom = document.querySelector('#current-'+activePlayer);

function rollBtn() {

  currentDom = document.querySelector('#current-'+activePlayer);

  var dice = Math.round(Math.random()*10%5 +1);

  diceDom.style.display = 'block';
  diceDom.src = 'dice-'+dice+'.png';

  if ( dice==1 ) {

    nextPlayer();
  }

  else {


    if(previousDice==dice) {
        nextPlayer();
        alert(" two same value.. Lost Turn;")
        return;
    }

     roundScore+=dice;
     currentDom.textContent=roundScore;
     previousDice=dice;
  }


}


function init() {

  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  previousDice=0;

  document.querySelector('#current-'+0).textContent=0;
  document.querySelector('#score-'+0).textContent=0;
  document.querySelector('#current-'+1).textContent=0;
  document.querySelector('#score-'+1).textContent=0;

  document.querySelector('.dice').style.display='none';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.getElementById('name-0').textContent='Player 1';
  document.getElementById('name-1').textContent='Player 2';

  maxScore=parseInt(document.getElementById('maxscore').value);
  console.log(maxScore);


}


function nextPlayer() {

  roundScore = 0;
  diceDom.style.display='none';
  currentDom.textContent = roundScore;
  document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-'+ activePlayer + '-panel').classList.add('active');

}



function holdBtn() {

  scoreDom = document.querySelector('#score-'+activePlayer);
  scores[activePlayer]+=roundScore;
  scoreDom.textContent= scores[activePlayer];


  if(scores[activePlayer]>=maxScore) {

    //document.querySelector('#name-'+activePlayer).textContent='Player '+(activePlayer+1)+' Wins';
    document.querySelector('#name-'+activePlayer).textContent='Winner!';
    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
    document.querySelector('.btn-roll').removeEventListener('click',rollBtn);
    document.querySelector('.btn-hold').removeEventListener('click',holdBtn);
    diceDom.style.display='none';
  }
  else {

    nextPlayer();

  }




}


addListener();

function addListener() {

  document.querySelector('.btn-roll').addEventListener('click',rollBtn);
  document.querySelector('.btn-hold').addEventListener('click',holdBtn);

}

document.querySelector('.btn-new').addEventListener('click',function() {

 init();
 addListener()

});
