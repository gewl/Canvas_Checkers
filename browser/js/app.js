import Board from './board'
import Piece from './piece'

let board = new Board()
board.render()

let socket = io.connect('http://localhost:4040')

socket.on('gameStart', () => {
	board.resetPieces()
})

