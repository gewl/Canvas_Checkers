import Board from './board'
import Piece from './piece'
import Game from './game'

let board = new Board()
board.render()

let socket = io.connect('http://localhost:4040')

socket.on('gameStart', () => {
	let game = new Game(board)
})

