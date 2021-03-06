
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
    gameBackground = document.querySelector(".content"),
    header = document.getElementById("gameHeader");


const sounds = [
  new Audio("assets/sounds/green.mp3"),
  new Audio("assets/sounds/red.mp3"),
  new Audio("assets/sounds/yellow.mp3"),
  new Audio("assets/sounds/blue.mp3"),
  new Audio("assets/sounds/wrong.mp3")
]

document.addEventListener('keydown', startGame); // on any keyboard key click

function startGame() {
  document.removeEventListener('keydown', startGame)
  var clicksOrder = [], // the random numbers that are generated by CPU on each level
      level = 1; // level of the game that grows by one on everly level

  header.innerText = "Level " + level;
  clicksLoop()

  // rest of the function "startGame" kepted in a seperate function because we want to loop over this part of code
  function clicksLoop() {

    if (level <= 10) { // while the level doesn't exceed 10

      header.innerText = "Level " + level
      randomNum = Math.floor(Math.random() * 4);
      clicksOrder.push(randomNum) // append the new generated number into the game queue
      console.log(clicksOrder) // I kept this expression just to simplify your debugging. It prints the array of choices
  
      // this is just a hack for CSS animation to work more than one time ------- 
      var targetButton = buttons[randomNum],
          parent = targetButton.parentElement;
      parent.removeChild(targetButton)
      parent.appendChild(targetButton)
      // ------------------------------------------------------------------------
  
      buttons[randomNum].classList.add("animated-button") // this class has animation for button-clicked
      sounds[randomNum].play() // play the appropriate sound for the button
  
      numOfClicks = 0
      
      // loop over the buttons and link a function for their "click" event
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", isTrueGuess)
      }
    }
    else { // if the user passed 10 levels 
      header.innerText = "You won"
      document.addEventListener('keydown', startGame); // return the keydown event on the document to enable the user to restart the game
      for (let i = 0; i < buttons.length; i++) { // remove click event on buttons to disable the user click on them
        buttons[i].removeEventListener("click", isTrueGuess)
      }
    }
  }
  
  // function occurs when any button is clicked during the game
  function isTrueGuess() {

    // same previous hack
    var parent = this.parentElement;
    parent.removeChild(this)
    parent.appendChild(this)

    // grab "data-random_num" attribute of the clicked button and play its appropriate sound
    sounds[parseInt(this.dataset.random_num)].play();
    
    if (parseInt(this.dataset.random_num) === clicksOrder[numOfClicks]) { // if the user clicked on the correct button
      numOfClicks++
      
      if (numOfClicks === level) {
        level++

        for (let i = 0; i < buttons.length; i++) { // remove click event from buttons while recreating new random number to not ruin the process
          buttons[i].removeEventListener("click", isTrueGuess)
        }
        setTimeout(clicksLoop, 1000) // wai a second and loop over the resursion function
      }
    }

    // if user choice is incorrect
    else {
      // same hack
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
