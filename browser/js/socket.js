export default class Socket {
	constructor(socket) {
		this.socket = socket
	}

	sendGamestate(gameState) {
		this.socket.emit('clientPassBoard', gameState)
	}
}
