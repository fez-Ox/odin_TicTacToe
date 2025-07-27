const Gameboard = class {
  gameboard = [];
  dim = 3;
  win = false;
  tie = false;

  constructor() {
    for (let i = 0; i < dim; i++) {
      gameboard[i] = [];
      for (let j = 0; j < dim; j++) {
        gameboard[i][j] = ".";
      }
    }
  }

  checkGameFinish() {
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
        return true;
      }
      return false;
    }

    tie = true;
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
  }

  display() {
    console.log("\nDisplay:");
    for (let x = 0; x < dim; x++) {
      console.log(gameboard[x]);
    }
  }

  playerMove(x, y, type) {
    gameboard[x][y] = type;
    display();
    checkGameFinish();
  }

  getWin() {
    return win;
  }

  getTie() {
    return tie;
  }

  restart() {
    tie = false;
    win = false;

    for (let i = 0; i < dim; i++) {
      gameboard[i] = [];
      for (let j = 0; j < dim; j++) {
        gameboard[i][j] = ".";
      }
    }
  }
};

const displayController = class {
  currType = "X";
  xName = "";
  oName = "";

  constructor() {
    const submitDialogbtn = document.querySelector(".dialogsubmit-btn");
    const nameDialog = document.querySelector(".addname-dialog");
    const gameBoxes = document.querySelectorAll(".game-div");
    const endMsg = document.querySelector(".end-msg");
    const restartBtn = document.querySelector(".restart-btn");

    submitDialogbtn.addEventListener("click", (e) => {
      const xInput = document.querySelector('[name="xName"');
      const oInput = document.querySelector('[name="oName"');
      xName = xInput.value;
      oName = oInput.value;

      if (xName && oName) {
        e.preventDefault();
        nameDialog.close();
      }
    });

    gameBoxes.forEach((e) => {
      e.addEventListener("click", () => {
        let coords = e.dataset.xy;
        let xCord = Number(coords[0]);
        let yCord = Number(coords[1]);

        if (!Gameboard.getWin() && updatePlayerPos(xCord, yCord)) {
          Gameboard.playerMove(xCord, yCord, currType);
          const endMsg = document.querySelector(".end-msg");

          if (Gameboard.getWin()) {
            let winnerName = currType === "X" ? xName : oName;
            endMsg.textContent = `${winnerName} has won the match.`;
          }

          if (Gameboard.getTie()) {
            endMsg.textContent = `The Match has been tied`;
          }

          currType = currType === "X" ? "O" : "X";
        }
      });
    });

    restartBtn.addEventListener("click", (event) => {
      Gameboard.restart();

      const gameBoxes = document.querySelectorAll(".game-div");
      gameBoxes.forEach((e) => {
        e.textContent = "";
      });

      endMsg.textContent = "";
    });
  }

  updatePlayerPos(x, y) {
    const gameBox = document.querySelector(
      `[data-xy="${String(x) + String(y)}"]`
    );

    if (gameBox.textContent != "") return false;

    gameBox.textContent = currType;
    return true;
  }
};
