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
		// if already jumped this turn, this tracks (and points to) piece that is jumping
		this.hasJumped = false;
		this.jumpCell = [];

		this.doneMoving = false;

		//event listener for clicks to allow piece movement
		canvas.addEventListener('mousedown', e => {
			let mouse = this.getMouse(e)
		})

		document.body.appendChild(canvas);
	}

	getMouse(event) {
		let { canvas, availableMoves, cellSelected, hasJumped, jumpCell, doneMoving } = this, offsetX = 0, offsetY = 0, mx, my;

		// click coordinate
		let x = Math.floor( event.offsetX / 80 )
		let y = Math.floor( event.offsetY / 80 )
		// console.log('break')
		// console.log(hasJumped)
		// console.log(doneMoving)
		// console.log(_.isEqual([x, y], jumpCell))

		// if selected valid piece to move, highlight square;
		if (this.board[y][x] === 'B' && !cellSelected && !hasJumped && !doneMoving) {
			this.markCell(x, y, "select")
		// if selected available square to move selected to,
		// move piece & redraw
		} else if (hasJumped && !doneMoving && _.isEqual([x, y], jumpCell)) {
			this.markCell(x, y, "select")
		} else if ( availableMoves.some( coords => _.isEqual(coords, [x,y]) ) ) {
			this.movePiece( cellSelected[0], cellSelected[1], x, y )
		// else, dehighlight/deselect
		} else {
			this.redrawBoard()
		}
	}

	movePiece(originX, originY, destinationX, destinationY) {
		this.board[destinationY][destinationX] = 'B'
		this.board[originY][originX] = 0
		let distanceTraveled = Math.abs(destinationY - originY)
		// if piece traveled further than one row, delete the pieces it passed over
		if (distanceTraveled > 1) {
			let jumpedX = ( originX + destinationX )/2
			let jumpedY = ( originY + destinationY )/2
			this.board[jumpedY][jumpedX] = 0
			this.jumpCell = [destinationX, destinationY]
			this.hasJumped = true;
		}
		this.redrawBoard();
		if (this.hasJumped && this.highlightMoves(...this.jumpCell)) {
			this.markCell(...this.jumpCell, "select")
		} else {
			this.doneMoving = true
		}
	}

	// all-purpose function for highlighting cell
	markCell(x, y, action) {
		let { cellWidth, ctx } = this
		let coordsX = x * cellWidth
		let coordsY = y * cellWidth
		if (action === "highlight")	 {
			this.availableMoves.push([x, y])
			ctx.strokeStyle = 'lightblue'
		} else if (action === "select") {
			this.cellSelected = [x, y];
			this.highlightMoves(x, y)
			ctx.strokeStyle = 'limegreen'
		}
		// push dimensions to availableMoves
		ctx.beginPath()
		ctx.moveTo(coordsX, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY)
		ctx.lineWidth = 3
		ctx.stroke()
	}

	highlightMoves(x, y) {
		let { board } = this
		let cellsToEvaluate = [
			[ x-1, y-1 ],
			[ x+1, y-1 ]
		]

		let anyJumpableSquares = false
		
		// evaluate possible move cells to discern legal moves
		cellsToEvaluate.forEach(cell => {
			switch ( board[ cell[1] ][ cell[0] ] ) {
				// empty cell: can move	
				case 0:
					this.markCell(...cell, "highlight");
					break;
				// enemy piece: can skip
				case 'R':
					var jumpCell
					if ( cell[0] < x) {
						jumpCell = [ cell[0] - 1, cell[1] - 1 ]
					} else {
						jumpCell = [ cell[0] + 1, cell[1] - 1 ]
					}
					if (board[ jumpCell[1]] != undefined && board[ jumpCell[1] ][ jumpCell[0] ] === 0) {
						this.highlightCell(...jumpCell);
						anyJumpableSquares = true;
					}
					break;
			}
		})

		return anyJumpableSquares;
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
			[ 'R', 0, 'R', 0, 0, 0, 'R', 0 ],
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
