const Gameboard = (function () {
	const dim = 3;
	let gameboard = [];

	for (let i = 0; i < dim; i++) {
		gameboard[i] = [];
		for (let j = 0; j < dim; j++) {
			gameboard[i][j] = 0;
		}
	}
	
	function print() {
		for (let i = 0; i < dim; i++) {
			gameboard[i] = [];
			for (let j = 0; j < dim; j++) {
				gameboard[i][j] = 0;
			}
		}
	}

	function playerMove(x, y) {
		gameboard[x][y] = X;	
	}

	function checkGameFinish() {
		
	}
}) ()

const displayController = (function () {
	
})()
