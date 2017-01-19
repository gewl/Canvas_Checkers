import Piece from './piece';
import _ from 'lodash';

export default class Board {
	constructor(properties) {
		// create canvas
		const canvas = document.createElement("canvas")
		let boardWidth = 640;
		canvas.width = boardWidth
		canvas.height = boardWidth

		// maintaining reference to HTML5 canvas for rendering
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		// sizing
		this.boardWidth = 640;
		this.cellWidth = boardWidth/8;
		// arrangement of pieces/empty cells
		this.board = [];
		// if a valid move target has been clicked
		this.cellSelected = false;
		// cells that selected piece can move to
		this.availableMoves = []

		//event listener for clicks to allow piece movement
		canvas.addEventListener('mousedown', e => {
			let mouse = this.getMouse(e)
		})

		document.body.appendChild(canvas);
	}

	getMouse(event) {
		let { canvas, availableMoves, cellSelected } = this, offsetX = 0, offsetY = 0, mx, my;

		let x = Math.floor( event.offsetX / 80 )
		let y = Math.floor( event.offsetY / 80 )

		// if selected valid piece to move, highlight square;
		if (this.board[y][x] === 'B' && !cellSelected) {
			this.selectCell(x, y)
		// if selected available square to move selected to,
		// move piece & redraw
		} else if ( availableMoves.some( coords => _.isEqual(coords, [x,y]) ) ) {
			this.board[y][x] = 'B'
			this.board[cellSelected[1]][cellSelected[0]] = 0
			this.redrawBoard()
		// else, dehighlight/deselect
		} else {
			this.redrawBoard()
		}
	}

	//select piece that can be moved
	selectCell(x, y) {
		//highlight selected square in green
		let { cellWidth, ctx } = this
		let coordsX = x * cellWidth
		let coordsY = y * cellWidth
		ctx.strokeStyle = 'limegreen'
		ctx.beginPath()
		ctx.moveTo(coordsX, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY)
		ctx.lineWidth = 3
		ctx.stroke()
		this.cellSelected = [x, y];
		this.highlightMoves(x, y)
	}

	highlightMoves(x, y) {
		let { board } = this
		let cellsToEvaluate = [
			[ x-1, y-1 ],
			[ x+1, y-1 ]
		]

		cellsToEvaluate.forEach(cell => {
			switch ( board[ cell[1] ][ cell[0] ] ) {
				case 0:
					this.highlightCell(...cell);
					break;
				case 'R':
					this.highlightMoves(...cell);
					break;
			}
		})
	}

	highlightCell(x, y) {
		//highlight selected square in blue
		let { cellWidth, ctx } = this
		let coordsX = x * cellWidth
		let coordsY = y * cellWidth
		ctx.strokeStyle = 'lightblue'
		ctx.beginPath()
		ctx.moveTo(coordsX, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY)
		ctx.lineWidth = 3
		ctx.stroke()
		// push dimensions to availableMoves
		this.availableMoves.push([x, y])
	}

	getBoard() {
		return this.board
	}

	setBoard(board) {
		this.board = board
	}

	drawPiece(color, x, y) {
		let { cellWidth, ctx } = this
		ctx.beginPath();
		ctx.arc(x + cellWidth/2, y + cellWidth/2, cellWidth/2 - 3,0,Math.PI*2,true);
		ctx.lineWidth = 1
		ctx.fillStyle = color
		ctx.fill()
		ctx.stroke();
	}

	drawPieces() {
		let { cellWidth, ctx } = this

		this.board.forEach(( row, y ) => {
			row.forEach(( square, x ) => {
				if (square === 'R') {
					this.drawPiece('red', x * cellWidth, y * cellWidth)
				} else if (square === 'B') {
					this.drawPiece('black', x * cellWidth, y * cellWidth)
				}
			})
		})
	}

	redrawBoard() {
		this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth)
		this.render()
		this.drawPieces()
		this.cellSelected = false
		this.availableMoves = []
	}

	resetPieces() {
		let { cellWidth } = this

		this.board = [
			[ 0, 'R', 0, 'R', 0, 'R', 0, 'R' ],
			[ 'R', 0, 'R', 0, 'R', 0, 'R', 0 ],
			[ 0, 'R', 0, 'R', 0, 'R', 0, 'R' ],
			[ 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 'R', 0, 0, 0, 0, 0, 0 ],
			[ 'B', 0, 'B', 0, 'B', 0, 'B', 0 ],
			[ 0, 'B', 0, 'B', 0, 'B', 0, 'B' ],
			[ 'B', 0, 'B', 0, 'B', 0, 'B', 0 ]
		]

		this.drawPieces()
	}

	render() {
		let { ctx, boardWidth, cellWidth } = this
		let fillYellow = true;
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j += 1) {
				if (fillYellow) {
					ctx.fillStyle = "lightyellow"
				} else {
					ctx.fillStyle = "#606060"
				}
				fillYellow = !fillYellow
				ctx.fillRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth)
			}
		}

		ctx.strokeStyle = 'black'
		for (let i = 0; i <= boardWidth; i += cellWidth)	 {
			ctx.beginPath()
			ctx.moveTo(i, 0)
			ctx.lineTo(i, boardWidth)
			ctx.moveTo(0, i)
			ctx.lineTo(boardWidth, i)
			ctx.lineWidth = 2
			ctx.stroke()
		}
	}
}
