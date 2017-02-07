import Game from './game'

let socket = io.connect('http://localhost:4040')

socket.on('gameStart', () => {
	let game = new Game(socket)
})

