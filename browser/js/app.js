 // create canvas
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

let boardWidth = 640
let cellWidth = boardWidth/8

canvas.width = boardWidth
canvas.height = boardWidth

document.body.appendChild(canvas)

function init() {
	ctx.fillStyle = "lightyellow"
	ctx.fillRect(0, 0, boardWidth, boardWidth)

	for (let i = 0; i <= boardWidth; i += cellWidth)	 {
		ctx.beginPath()
		ctx.moveTo(i, 0)
		ctx.lineTo(i, boardWidth)
		ctx.moveTo(0, i)
		ctx.lineTo(boardWidth, i)
		ctx.stroke()
	}

	ctx.beginPath();
	ctx.arc(0 + cellWidth/2,0 + cellWidth/2,cellWidth/2 - 3,0,Math.PI*2,true);
	ctx.lineWidth = 1
	ctx.fillStyle = "red"
	ctx.fill()
	ctx.stroke();
}

Board.init()
