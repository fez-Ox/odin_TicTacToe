const Gameboard = (function () {
  let gameboard = [];
  let dim = 3;
  let win = false;
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

  function getWin() {
    return win;
  }

  function getTie() {
    return tie;
  }

  function restart() {
    tie = false;
    win = false;

    for (let i = 0; i < dim; i++) {
      gameboard[i] = [];
      for (let j = 0; j < dim; j++) {
        gameboard[i][j] = ".";
      }
    }
  }

  return {
    gameboard,
    playerMove,
    checkGameFinish,
    display,
    getWin,
    getTie,
    restart,
  };
})();

const displayController = (function () {
  let currType = "X";
  let xName = "";
  let oName = "";

  // Name getting stuff
  const submitDialogbtn = document.querySelector(".dialogsubmit-btn");
  const nameDialog = document.querySelector(".addname-dialog");

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

  function updatePlayerPos(x, y) {
    const gameBox = document.querySelector(
      `[data-xy="${String(x) + String(y)}"]`
    );

    if (gameBox.textContent != "") return false;

    gameBox.textContent = currType;
    return true;
  }

  const gameBoxes = document.querySelectorAll(".game-div");
  const endMsg = document.querySelector(".end-msg");

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

  // Restart button Stuff
  const restartBtn = document.querySelector(".restart-btn");

  restartBtn.addEventListener("click", (event) => {
    Gameboard.restart();

    const gameBoxes = document.querySelectorAll(".game-div");
    gameBoxes.forEach((e) => {
      e.textContent = "";
    });

    endMsg.textContent = "";
  });

  return { updatePlayerPos };
})();
