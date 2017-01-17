import Piece from './piece';

export default class Board {
	constructor(properties) {
		// create canvas
		const canvas = document.createElement("canvas")
		const ctx = canvas.getContext("2d")

		let boardWidth = 640
		let cellWidth = boardWidth/8

		canvas.width = boardWidth
		canvas.height = boardWidth
		this.ctx = ctx;
		this.boardWidth = boardWidth;
		this.cellWidth = cellWidth;
		this.pieces = []

		document.body.appendChild(canvas)
	}

	getPieces() {
		return this.pieces
	}

	setPieces(pieces) {
		this.pieces = pieces
	}

	drawPieces() {
		let { cellWidth, ctx } = this

		this.pieces.forEach(piece => {
			ctx.beginPath();
			ctx.arc(piece.x + cellWidth/2, piece.y + cellWidth/2, cellWidth/2 - 3,0,Math.PI*2,true);
			ctx.lineWidth = 1
			ctx.fillStyle = piece.color
			ctx.fill()
			ctx.stroke();
		})
	}

	resetPieces() {
		let { cellWidth } = this

		for (var i = 0; i < 4; i++) {
			this.pieces.push(
				new Piece("red", (i*2 + 1) * cellWidth, 0),
				new Piece("red", (i*2) * cellWidth, cellWidth),
				new Piece("red", (i*2 + 1) * cellWidth, cellWidth * 2),
				new Piece("black", (i*2) * cellWidth, cellWidth * 5),
				new Piece("black", (i*2 + 1) * cellWidth, cellWidth * 6),
				new Piece("black", (i*2) * cellWidth, cellWidth * 7)
			)
		}
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
