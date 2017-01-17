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

		document.body.appendChild(canvas)
	}

	render() {
		let { ctx, boardWidth, cellWidth } = this
		let fillYellow = true;
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j += 1) {
				if (fillYellow) {
					ctx.fillStyle = "lightyellow"
				} else {
					ctx.fillStyle = "#404040"
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

		ctx.beginPath();
		ctx.arc(0 + cellWidth/2,0 + cellWidth/2,cellWidth/2 - 3,0,Math.PI*2,true);
		ctx.lineWidth = 1
		ctx.fillStyle = "red"
		ctx.fill()
		ctx.stroke();
	}
}
