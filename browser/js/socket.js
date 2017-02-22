export default class Socket {
	constructor(socket, game) {
		this.socket = socket
		this.game = game;

		socket.on('serverPassBoard', board => {
			setTimeout(() => this.game.makeServerMove(board), 1000)
		})

		socket.on('winEvent', board => {
			setTimeout(() => this.game.onWin(board), 1000)
		})

		socket.on('loseEvent', board => {
			setTimeout(() => this.game.onLose(board), 1000)
		})
	}

	sendGamestate(gameState) {
		this.socket.emit('clientPassBoard', gameState)
	}
}
