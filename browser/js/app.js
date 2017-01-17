import Board from './board'
import Pieces from './pieces'

let board = new Board()
board.render()

let socket = io.connect('http://localhost:4040')

