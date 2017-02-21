`use strict`
import socketio from 'socket.io';

export default class SocketServer {
	constructor(server) {
		const io = socketio.listen(server)

		io.sockets.on('connection', this.connectionCb)
	}

	// on connection, sends gameStart trigger for
	// client to instantiate board & game.
	connectionCb(socket) {
		console.log(`Socket connected: ${socket.id}`);
		socket.emit('gameStart');

		// listener for client to pass board back after move
		socket.on('clientPassBoard', board => {
			console.log(board)
			let movablePieceCoords = []
			let jumpablePieceCoords = []
			let placeToJumpCoords = []

			// iterate through every cell on the board, storing coordinates of red pieces that can (A) be moved or (B) be used to jump.
			for (let i = 0; i < board.length; i++) {
				let row = board[i]
				for (let j = 0; j < row.length; j++) {
					if (row[j] === 'R') {
						let testMoveRow = i+1
						// if any empty spaces to move into, places coordinates of piece into movablePieceCoords array
						if (board[testMoveRow] && (board[testMoveRow][j-1] === 0 || board[testMoveRow][j+1] === 0)) {
							movablePieceCoords.push([j, i]);
						}

						// if any possible jumps to make, places coordinates of piece into jumpablePieceCoords array, and
						// stores coordinates of /empty cell to jump into/ at corresponding location in placeToJumpCoords array.
						// if one piece can make two possible jumps, it's coordinates are stored twice in jumpablePiecesCoords - one for each jump.
						if (board[testMoveRow]) {
							if (board[testMoveRow][j-1] === 'B' && board[testMoveRow + 1] && board[testMoveRow + 1][j - 2] === 0) {
								jumpablePieceCoords.push([j, i]);
								placeToJumpCoords.push([j - 2, i + 2])
							}
							if (board[testMoveRow][j+1] === 'B' && board[testMoveRow + 1] && board[testMoveRow + 1][j + 2] === 0) {
								jumpablePieceCoords.push([j, i]);
								placeToJumpCoords.push([j + 2, i + 2])
							}
						}
					}
				}
			}

			if (jumpablePieceCoords.length) {
				// if any pieces can be jumped, chooses a random available jump and executes it by editing the board
				let pieceToMove = randomIndex(jumpablePieceCoords)
				console.log(jumpablePieceCoords[pieceToMove])
				console.log(placeToJumpCoords[pieceToMove])

				let originX = jumpablePieceCoords[pieceToMove][0]
				let originY = jumpablePieceCoords[pieceToMove][1]
				let destinationX = placeToJumpCoords[pieceToMove][0]
				let destinationY = placeToJumpCoords[pieceToMove][1]

				board[originY][originX] = 0;
				board[destinationY][destinationX] = 'R';

				let jumpedX = ( originX + destinationX )/2
				let jumpedY = ( originY + destinationY )/2
				board[jumpedY][jumpedX] = 0;
			} else if (movablePieceCoords.length) {
				// if no jumpable pieces, chooses a random movable piece, then randomizes an available move
				let pieceToMove = randomIndex(movablePieceCoords)

				let originX = movablePieceCoords[pieceToMove][0]
				let originY = movablePieceCoords[pieceToMove][1]

				let possibleMove1X = originX - 1
				let possibleMove1Y = originY + 1
				
				let possibleMove2X = originX + 1
				let possibleMove2Y = originY + 1

				if (board[possibleMove1Y][possibleMove1X] === 0 && board[possibleMove2Y][possibleMove2X] === 0) {
					let coinflip = Math.random()				

					if (coinflip < .5) {
						board = executeMove(board, originX, originY, possibleMove1X, possibleMove1Y)
					} else {
						board = executeMove(board, originX, originY, possibleMove2X, possibleMove2Y)
					}
				} else if (board[possibleMove1Y][possibleMove1X] === 0) {
					board = executeMove(board, originX, originY, possibleMove1X, possibleMove1Y)
				} else if (board[possibleMove2Y][possibleMove2X] === 0) {
					board = executeMove(board, originX, originY, possibleMove2X, possibleMove2Y)
				}
			}

			socket.emit('serverPassBoard', board)
		})
	}
}

var executeMove = function(board, origX, origY, destX, destY) {
	board[origY][origX] = 0;
	board[destY][destX] = 'R';
	return board
}

var randomIndex = function(arr) {
	return parseInt(Math.random() * (arr.length-1))
}
