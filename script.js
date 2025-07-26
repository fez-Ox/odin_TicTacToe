const Gameboard = (function () {
  let gameboard = [];
  let dim = 3;
  let win = true;
  let tie = false;

  for (let i = 0; i < dim; i++) {
    gameboard[i] = [];
    for (let j = 0; j < dim; j++) {
      gameboard[i][j] = ".";
    }
  }

  function checkGameFinish() {
    function checkWin(i, j) {
      const currPiece = gameboard[i][j];
      function checkHorizontal() {
        for (let x = 0; x < dim; x++) {
          if (gameboard[i][x] != currPiece) return false;
        }
        return true;
      }
      function checkVertical() {
        for (let x = 0; x < dim; x++) {
          if (gameboard[x][j] != currPiece) return false;
        }
        return true;
      }
      function checkDiagonal() {
        for (let x = 0; x < dim; x++) {
          if (gameboard[x][x] != currPiece) return false;
        }
        return true;
      }

      if (checkVertical(i, j) || checkHorizontal(i, j) || checkDiagonal(i, j)) {
        console.log(`Player ${gameboard[i][j]} has won the match!`);
        return true;
      }
      return false;
    }

    for (let i = 0; i < dim; i++) {
      for (let j = 0; j < dim; j++) {
        let currentPiece = gameboard[i][j];
        if (currentPiece != "." && checkWin(i, j)) {
          win = true;
          tie = false;
          break;
        }
        if (currentPiece == ".") tie = false;
      }
      if (win) break;
    }

    if (win || tie) {
      const gameBoxes = document.querySelectorAll(".game-div");
      gameBoxes.forEach((e) => {
        e.removeEventListener("click", () => {});
      });
    }
  }

  function display() {
    console.log("\nDisplay:");
    for (let x = 0; x < dim; x++) {
      console.log(gameboard[x]);
    }
  }

  function playerMove(x, y, type) {
    gameboard[x][y] = type;
    display();
    checkGameFinish();
  }

  return { gameboard, playerMove, checkGameFinish, display, win, tie };
})();

const displayController = (function () {
  let currType = "X";

  function updatePlayerPos(x, y) {
    console.log(String(x) + String(y));
    const gameBox = document.querySelector(
      `[data-xy="${String(x) + String(y)}"]`
    );
    if (gameBox.textContent != "") return;

    gameBox.textContent = currType;
  }

  const gameBoxes = document.querySelectorAll(".game-div");
  gameBoxes.forEach((e) => {
    e.addEventListener("click", () => {
      let coords = e.dataset.xy;
      let xCord = Number(coords[0]);
      let yCord = Number(coords[1]);

      updatePlayerPos(xCord, yCord);
      Gameboard.playerMove(xCord, yCord, currType);
      currType = currType === "X" ? "O" : "X";

      if (Gameboard.win) {

      }

      if (Gameboard.tie) {
        
      }
    });
  });

  return { updatePlayerPos };
})();
