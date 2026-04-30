const score = JSON.parse(localStorage.getItem('score')) ||{
  wins: 0,
  looses: 0,
  ties: 0
};

updateScore();

let isAutoPlay = false;
let intervalID;

function autoPlay(){
  if(!isAutoPlay){
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoPlay = true;
  }
  else{
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}
//Using addEventListner
document.querySelector('.js-rock-button').addEventListener('click',() => {
  playGame('Rock')
})

document.body.addEventListener('keydown',(event) =>{
  if(event.key === 'r'){
    playGame('Rock');
  }
  else if(event.key === 'p'){
    playGame('Paper');
  }
  else if(event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){

  const computerMove = pickComputerMove();
  let result = '';

  if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
      result = 'Tie';
    }
    else if(computerMove === 'Paper'){
      result = 'You Lose';
    }
    else if(computerMove === 'Scissors'){
      result = 'You Win'
    }
  }

  else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){
      result = 'You Win';
    }
    else if(computerMove === 'Paper'){
      result = 'Tie';
    }
    else if(computerMove === 'Scissors'){
      result = 'You Lose'
    }
  }

  else if(playerMove === 'Scissors'){
    if(computerMove === 'Rock'){
      result = 'You Lose';
    }
    else if(computerMove === 'Paper'){
      result = 'You Win';
    }
    else if(computerMove === 'Scissors'){
      result = 'Tie'
    }
  }
  if(result === 'You Win'){
    score.wins += 1;
  }
  else if(result === 'You Lose'){
    score.looses += 1;
  }
  else if(result === 'Tie'){
    score.ties += 1;
  }

  localStorage.setItem ('score', JSON.stringify(score));

  updateScore();

  document.querySelector('.js_result').innerHTML = result;

  document.querySelector('.js_moves').innerHTML = `You 
  <img src="${playerMove}-emoji.png" class = "move-icon">
  <img src="${computerMove}-emoji.png" class = "move-icon">
  Computer`;
}

function updateScore(){
  document.querySelector('.js_score')
  .innerHTML = `Wins ${score.wins} , Looses ${score.looses} , Ties ${score.ties}`;
}

function pickComputerMove(){
  const randomNumber =Math.random();
  let computerMove = '';
  
  if(randomNumber>=0 && randomNumber<1/3){
    computerMove = 'Rock';
  }
  else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove = 'Paper';
  }
  else if(randomNumber>=2/3 && randomNumber<1){
    computerMove = 'Scissors';
  }
  return computerMove;
}
