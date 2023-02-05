const X_ClASS = "x";
const O_ClASS = "o";

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const restartButton = document.getElementById('restart');
const winningMessageElement = document.getElementById("win-message");
const winningTextElement = document.querySelector(
  "[data-winning-message-text]"
  );
const cellElement = document.querySelectorAll("[data-cell");
const Board = document.getElementById("board");
let circleTurn;

startGame();

restartButton.addEventListener('click',startGame);

function startGame() {
  circleTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(X_ClASS);
    cell.classList.remove(O_ClASS);
    cell.removeEventListener('click',handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');

}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_ClASS : X_ClASS;
  
  //placeMark
  placeMark(cell, currentClass);
  
  //Check for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //check for draw
  else if (isDraw()) {
    endGame(true);
  }else{
      // switch turns
      swapTurn();
      setBoardHoverClass();
  }


}

function endGame(draw) {
  if (draw) {
    winningTextElement.innerText = "Draw!";
  } else {
    winningTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw(){
  return [...cellElement].every(cell=> {
    return cell.classList.contains(X_ClASS)|| cell.classList.contains(O_ClASS);
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  Board.classList.remove(X_ClASS);
  Board.classList.remove(O_ClASS);
  if (circleTurn) {
    Board.classList.add(O_ClASS);
  } else {
    Board.classList.add(X_ClASS);
  }
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}
