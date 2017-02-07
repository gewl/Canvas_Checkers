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
		})
	}
}
