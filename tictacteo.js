let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset-btn")
//let newGameBtn = document.querySelector("#new-btn")
let winnerMsg = document.querySelector("#msg")
let msgContainer = document.querySelector(".msg-container")
let turnO = true;
let oChoice = document.querySelector("#Ochoice")
let xChoice = document.querySelector("#Xchoice")
let plChoice = document.querySelector(".plChoice")
let startGame = document.querySelector(".start-game")
let player1 = ""
let player2 = ""
let play1ChoiceBox = document.querySelector("#play1choice")
let play2ChoiceBox = document.querySelector("#play2choice")
let choiceContainer = document.querySelector(".choice-container")


for(box of boxes){
    box.disabled = true
   }

startGame.classList.remove("hide")

oChoice.addEventListener("click",()=>{
    turnO = true
    for(let box of boxes){
        box.disabled = false
    }
    startGame.classList.add("hide")
    plChoice.classList.remove("hide")
    player1 = oChoice.innerText
    player2 = "X"
    confirmChoice(player1,player2)
})

xChoice.addEventListener("click",()=>{
    turnO = false
    for(let box of boxes){
        box.disabled = false
    }
    startGame.classList.add("hide")
    plChoice.classList.remove("hide")
    player1 = xChoice.innerText
    player2 = "O"
    confirmChoice(player1,player2)
})

const confirmChoice = (player1,player2)=>{
    if(player1 === "X"){
    play1ChoiceBox.innerText = `Player 1 : ${player1}`
    play2ChoiceBox.innerText = `Player 2 : ${player2}`
    }
    else if(player1 ==="O"){
        play1ChoiceBox.innerText = `Player 1 : ${player1}`
        play2ChoiceBox.innerText = `Player 2 : ${player2}`
    }
    choiceContainer.classList.remove("hide")

    
}

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const resetAll = ()=>{
    for(box of boxes){
        box.disabled = true
       }
}

const resetGame = ()=>{
    enableBoxes()
    msgContainer.classList.add("hide")
    startGame.classList.remove("hide")
    plChoice.classList.add("hide")
    resetAll()
    choiceContainer.classList.add("hide")
}

boxes.forEach((box)=>{
   box.addEventListener("click",()=>{
    if(turnO){
        box.innerText = "O";  
        box.style.color = "#333333"  
        turnO = false
    }
    else{
        box.innerText = "X";
        turnO = true
    }
    box.disabled = true;
    checkWinner()
   })
})

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false
        box.innerText = ""
    }
}
const showWinner =(winner)=>{
    confirmChoice(player1,player2)
    if(winner === player1){  
        winnerMsg.innerText = `🎉 Congratulations, Player 1 (${player1}) wins! 🎉`
        disableBoxes()
        plChoice.classList.add("hide")
        choiceContainer.classList.add("hide")
    }
    else{
        winnerMsg.innerText = `🎉 Congratulations, Player 2 (${player2}) wins! 🎉`;
        disableBoxes()
        plChoice.classList.add("hide")
        choiceContainer.classList.add("hide")
    }
    // winnerMsg.innerText =  `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide")  
}
const checkWinner = ()=>{
    

    for(let pattern of winPatterns){
    let pos1 = boxes[pattern[0]].innerText
    let pos2 = boxes[pattern[1]].innerText
    let pos3 = boxes[pattern[2]].innerText

   // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])

    // console.log(pattern[0]
    //  ,pattern[1]
    //  ,pattern[2])

    // console.log(pos1)
    // console.log(pos2)
    // console.log(pos3)
    if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 == pos2 && pos2 == pos3){
           showWinner(pos1)
        }
    }
}
}

resetBtn.addEventListener("click",resetGame)

const matchTie = ()=>{
    winnerMsg.innerText = "Tie"
    for(let box of boxes){
        box.disabled = true
    }
}

const movingText = document.getElementById("moving-text");
    let inactivityTimeout;

    const startAnimation = () => {
      movingText.style.animation = "slideLeftToRight 15s linear infinite";
    };

    const stopAnimation = () => {
      movingText.style.animation = "none"; // Stop animation
      movingText.style.transform = "translateX(0)"; // Reset position to original
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      stopAnimation(); // Stop animation on user interaction
      inactivityTimeout = setTimeout(() => {
        startAnimation(); // Start animation after 10 seconds of inactivity
      }, 5000);
    };

    // Monitor user interaction
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);
    window.addEventListener("scroll", resetInactivityTimer);

    // Start the inactivity timer when the page loads
    resetInactivityTimer();