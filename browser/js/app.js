import Board from './board'
import Piece from './piece'

let board = new Board()
board.render()
board.resetPieces()

let socket = io.connect('http://localhost:4040')

