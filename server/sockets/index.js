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
						movablePieceCoords.push([j, i]);
						let testJumpRow = i+1
						if (board[testJumpRow]) {
							if (board[testJumpRow][j-1] === 'B' && board[testJumpRow + 1] && board[testJumpRow + 1][j - 2] === 0) {
								jumpablePieceCoords.push([j, i]);
								placeToJumpCoords.push([j + 2, i - 2])
							}
							if (board[testJumpRow][j+1] === 'B' && board[testJumpRow + 1] && board[testJumpRow + 1][j + 2] === 0) {
								jumpablePieceCoords.push([j, i]);
								placeToJumpCoords.push([j + 2, i + 2])
							}
						}
					}
				}
			}

			console.log(movablePieceCoords)
			console.log(jumpablePieceCoords)
			console.log(placeToJumpCoords)
		})
	}
}
