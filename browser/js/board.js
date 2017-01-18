import Piece from './piece';

export default class Board {
	constructor(properties) {
		// create canvas
		const canvas = document.createElement("canvas")
		let boardWidth = 640;
		canvas.width = boardWidth
		canvas.height = boardWidth

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.boardWidth = 640;
		this.cellWidth = boardWidth/8;
		this.board = [];
		this.cellSelected = false;

		//event listener for clicks to allow piece movement
		canvas.addEventListener('mousedown', e => {
			let mouse = this.getMouse(e)
		})

		document.body.appendChild(canvas);
	}

	getMouse(event) {
		let { canvas } = this, offsetX = 0, offsetY = 0, mx, my;

		let x = Math.floor( event.offsetX / 80 )
		let y = Math.floor( event.offsetY / 80 )

		if (this.board[y][x] === 'B' && !this.cellSelected) {
			this.selectCell(x, y)
		} else {
			this.redrawBoard()
		}
	}

	selectCell(x, y) {
		let { cellWidth, ctx } = this
		x = x * cellWidth
		y = y * cellWidth
		ctx.strokeStyle = 'limegreen'
		ctx.beginPath()
		ctx.moveTo(x, y)
		ctx.lineTo(x + cellWidth, y)
		ctx.lineTo(x + cellWidth, y + cellWidth)
		ctx.lineTo(x, y + cellWidth)
		ctx.lineTo(x, y)
		ctx.lineWidth = 3
		ctx.stroke()
		this.cellSelected = true;
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

		// this.pieces.forEach(piece => {
		// 	ctx.beginPath();
		// 	ctx.arc(piece.x + cellWidth/2, piece.y + cellWidth/2, cellWidth/2 - 3,0,Math.PI*2,true);
		// 	ctx.lineWidth = 1
		// 	ctx.fillStyle = piece.color
		// 	ctx.fill()
		// 	ctx.stroke();
		// })
	}

	redrawBoard() {
		this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth)
		this.render()
		this.drawPieces()
		this.cellSelected = false
	}

	resetPieces() {
		let { cellWidth } = this

		this.board = [
			[ 0, 'R', 0, 'R', 0, 'R', 0, 'R' ],
			[ 'R', 0, 'R', 0, 'R', 0, 'R', 0 ],
			[ 0, 'R', 0, 'R', 0, 'R', 0, 'R' ],
			[ 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 'B', 0, 'B', 0, 'B', 0, 'B', 0 ],
			[ 0, 'B', 0, 'B', 0, 'B', 0, 'B' ],
			[ 'B', 0, 'B', 0, 'B', 0, 'B', 0 ]
		]

		// for (var i = 0; i < 4; i++) {
		// 	this.pieces.push(
		// 		new Piece("red", (i*2 + 1) * cellWidth, 0),
		// 		new Piece("red", (i*2) * cellWidth, cellWidth),
		// 		new Piece("red", (i*2 + 1) * cellWidth, cellWidth * 2),
		// 		new Piece("black", (i*2) * cellWidth, cellWidth * 5),
		// 		new Piece("black", (i*2 + 1) * cellWidth, cellWidth * 6),
		// 		new Piece("black", (i*2) * cellWidth, cellWidth * 7)
		// 	)
		// }
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
