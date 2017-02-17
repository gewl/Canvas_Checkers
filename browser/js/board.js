import Game from './game';
import _ from 'lodash';

export default class Board {
	constructor(properties) {
		// create canvas
		const canvas = document.createElement("canvas")
		// maintaining reference to HTML5 canvas for rendering
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		// setting dimensions
		let boardWidth = 640;
		canvas.width = boardWidth
		canvas.height = boardWidth

		// sizing
		this.boardWidth = 640;
		this.cellWidth = boardWidth/8;
		
		//event listener for clicks to allow piece movement
		canvas.addEventListener('mousedown', e => {
			let mouse = this.getMouse(e)
		})

		document.body.appendChild(canvas);
	}

	getMouse(event) {
		// click coordinate
		let x = Math.floor( event.offsetX / 80 )
		let y = Math.floor( event.offsetY / 80 )

		// pass coordinates to Game method
		this.game.evaluateClick(x, y)

		this.drawBoard()
	}

	// all-purpose function for highlighting cell
	markCell(x, y, color) {
		let { cellWidth, ctx } = this
		let coordsX = x * cellWidth
		let coordsY = y * cellWidth
		ctx.strokeStyle = color
		ctx.beginPath()
		ctx.moveTo(coordsX, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY)
		ctx.lineTo(coordsX + cellWidth, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY + cellWidth)
		ctx.lineTo(coordsX, coordsY)
		ctx.lineWidth = 3
		ctx.stroke()
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

	drawPieces(gameState) {
		let { cellWidth, ctx } = this

		gameState.forEach(( row, y ) => {
			row.forEach(( square, x ) => {
				if (square === 'R') {
					this.drawPiece('red', x * cellWidth, y * cellWidth)
				} else if (square === 'B') {
					this.drawPiece('black', x * cellWidth, y * cellWidth)
				}
			})
		})
	}

	passGame(game) {
		this.game = game
	}

	drawBoard() {
		let { game } = this

		this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth)
		let selectedCell = game.getSelected()
		let availableMoves = game.getMoves()
		let gameState = game.getState()
		
		this.render()
		this.drawPieces(gameState)
		if (selectedCell) {
			let x = selectedCell[0]
			let y = selectedCell[1]
			this.markCell(x, y, 'limegreen')
		}

		if (availableMoves) {
			availableMoves.forEach(cell => {
				let x = cell[0]
				let y = cell[1]
				this.markCell(x, y, 'lightblue')
			})
		}
	}

	resetPieces() {
		let { cellWidth } = this

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

	deleteBoard() {
		document.body.removeChild(this.canvas)
	}
}
