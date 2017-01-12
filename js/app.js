// create canvas

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

let boardWidth = 640

canvas.width = boardWidth
canvas.height = boardWidth

document.body.appendChild(canvas)

function init() {
	ctx.fillStyle = "lightyellow"
	ctx.fillRect(0, 0, boardWidth, boardWidth)

	for (let i = 0; i <= boardWidth; i += boardWidth/8)	 {
		ctx.beginPath()
		ctx.moveTo(i, 0)
		ctx.lineTo(i, boardWidth)
		ctx.moveTo(0, i)
		ctx.lineTo(boardWidth, i)
		ctx.stroke()
	}
}

init()
