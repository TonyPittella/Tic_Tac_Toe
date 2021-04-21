
const statDisplay = document.querySelector(".status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];

const winningMessage = () => `Player ${currentPlayer} has won, Nice!`;
const drawMessage = () => `Game Over! Draw.`;
const currentTurn = () => `${currentPlayer}, you're up`;


statDisplay.innerHTML = currentTurn();

function handleBoxPlayed(clickedBox, clickedBoxIndex){
    gameState[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
};


function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statDisplay.innerHTML = currentTurn();
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultsValidation(){
    let roundWon = false;
    for(let i =0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if( a === "" || b == "" || c === ""){
            continue;
        }
        if (a === b && b ===c ){
            roundWon = true;
            break;

        }
    }
    if(roundWon){
        statDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let Draw = !gameState.includes("");
    if(Draw){
        statDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
};




function handelBoxClick(clickedBoxEvent){
    const clickedBox = clickedBoxEvent.target;

    const clickedBoxIndex = parseInt(
        clickedBox.getAttribute("data-cell-index")
    );
    if (gameState[clickedBoxIndex] !== "" || !gameActive){
        return;
    }
    handleBoxPlayed(clickedBox, clickedBoxIndex);
    handleResultsValidation();
};




function handelRestartGame(){
    gameActive = true;
    currentPlayer - "X";
    gameState = ["","","","","","","","",""];
    statDisplay.innerHTML = currentTurn();
    document.querySelectorAll(".box").forEach(box => box.innerHTML = "");
};


document.querySelectorAll(".box").forEach(box => box.addEventListener("click", handelBoxClick));

document.querySelector("#restart").addEventListener("click",handelRestartGame);







