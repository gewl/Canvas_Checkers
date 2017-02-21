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
			for (let i = 0; i < board.length; i++) {
				let row = board[i]
				for (let j = 0; j < row.length; j++) {
					if (row[j] === 'R') {
						let testMoveRow = i+1
						if (board[testMoveRow] && (board[testMoveRow][j-1] === 0 || board[testMoveRow][j+1] === 0)) {
							movablePieceCoords.push([j, i]);
						}
						if (board[testMoveRow]) {
							if (board[testMoveRow][j-1] === 'B' && board[testMoveRow + 1] && board[testMoveRow + 1][j - 2] === 0) {
								jumpablePieceCoords.push([j, i]);
								placeToJumpCoords.push([j + 2, i - 2])
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
				let pieceToMove = randomIndex(jumpablePieceCoords)

				let originX = jumpablePieceCoords[pieceToMove][0]
				let originY = jumpablePieceCoords[pieceToMove][1]
				let destinationX = placeToJumpCoords[pieceToMove][0]
				let destinationY = placeToJumpCoords[pieceToMove][1]

				board[originY][originX] = 0;
				board[destinationY][destinationX] = 'R';

				let jumpedX = ( originX + destinationX )/2
				let jumpedY = ( originY + destinationY )/2
				board[jumpedY][jumpedX] = 0;
			}
			socket.emit('serverPassBoard', board)
		})
	}
}

var randomIndex = function(arr) {
	return parseInt(Math.random() * (arr.length-1))
}
