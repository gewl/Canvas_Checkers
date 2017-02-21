export default class Socket {
	constructor(socket, game) {
		this.socket = socket
		this.game = game;
		socket.on('serverPassBoard', board => {
			setTimeout(() => this.game.makeServerMove(board), 1000)
		})
	}

	sendGamestate(gameState) {
		this.socket.emit('clientPassBoard', gameState)
	}
}
