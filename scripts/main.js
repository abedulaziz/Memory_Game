
/*

Steps:
1. get reference to the needed elements
2. if the user pressed on any key the game will begin
3. game will select a random button and add it to the queue
4. if the user guessed the button, another random button will be selected and so on.
5. if the user failed to guess the order of the queue, then loosing message will fire 
6. the user can replay the game after loosing with the same scenario
7. if the user arrived level 10 without any mistake he/she will win
8. if the user win, also he/she can replay the game.

*/


const buttsContainers = document.querySelectorAll("buttons .but-wrapper"),
    buttons = document.getElementsByClassName("button"),
    gameBackground = document.querySelector(".content")
    header = document.getElementById("gameHeader");


const sounds = [
  new Audio("assets/sounds/green.mp3"),
  new Audio("assets/sounds/red.mp3"),
  new Audio("assets/sounds/yellow.mp3"),
  new Audio("assets/sounds/blue.mp3"),
  new Audio("assets/sounds/wrong.mp3")
]

document.addEventListener('keydown', startGame);

function startGame() {
  document.removeEventListener('keydown', startGame)
  var clicksOrder = [],
      level = 1;

  header.innerText = "Level " + level;

  clicksLoop()

  function clicksLoop() {

    if (level <= 10) {
      header.innerText = "Level " + level
      randomNum = Math.floor(Math.random() * 4);
      clicksOrder.push(randomNum)
      console.log(clicksOrder) // I kept this expression just to simplify your debugging. It prints the array of choices
  
      // this is just a hack for CSS animation to work more than one time ------- 
      var targetButton = buttons[randomNum],
          parent = targetButton.parentElement;
      parent.removeChild(targetButton)
      parent.appendChild(targetButton)
      // ------------------------------------------------------------------------
  
      buttons[randomNum].classList.add("animated-button")
      sounds[randomNum].play()
  
      numOfClicks = 0
    
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", isTrueGuess)
      }
    }
    else {
      header.innerText = "You won"
      document.addEventListener('keydown', startGame);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", isTrueGuess)
      }

    }

  }
  
  function isTrueGuess() {

    // same previous hack
    var parent = this.parentElement;
    parent.removeChild(this)
    parent.appendChild(this)


    sounds[parseInt(this.dataset.random_num)].play();
    cloneQueue = JSON.parse(JSON.stringify(clicksOrder));
    
    if (parseInt(this.dataset.random_num) === cloneQueue[numOfClicks]) {
      numOfClicks++
      
      if (numOfClicks === level) {
        level++
        setTimeout(clicksLoop, 1000)
      }
    }
    else {
      gameBackground.parentElement.removeChild(gameBackground)
      document.querySelector(".game").append(gameBackground)
      
      gameBackground.style.animation = "false-choice .3s"

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", isTrueGuess)
      }
      header.innerText = "Game Over, Press Any Key to Restart"

      sounds[4].play()
      document.addEventListener('keydown', startGame);
    }

  }
}


