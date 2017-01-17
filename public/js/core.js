(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const board = require('./board')

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

let socket = io.connect('http://localhost:4040')


},{"./board":2}],2:[function(require,module,exports){
// export default Board {
// 	init: function() {
// 		ctx.fillStyle = "lightyellow"
// 		ctx.fillRect(0, 0, boardWidth, boardWidth)

// 		for (let i = 0; i <= boardWidth; i += cellWidth)	 {
// 			ctx.beginPath()
// 			ctx.moveTo(i, 0)
// 			ctx.lineTo(i, boardWidth)
// 			ctx.moveTo(0, i)
// 			ctx.lineTo(boardWidth, i)
// 			ctx.stroke()
// 		}

// 		ctx.beginPath();
// 		ctx.arc(0 + cellWidth/2,0 + cellWidth/2,cellWidth/2 - 3,0,Math.PI*2,true);
// 		ctx.lineWidth = 3
// 		ctx.fillStyle = "red"
// 		ctx.fill()
// 		ctx.stroke();
// 	}
// }

},{}]},{},[1])