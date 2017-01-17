"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	console.log('hi');
};

var board = require('./board');

// create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

var boardWidth = 640;
var cellWidth = boardWidth / 8;

canvas.width = boardWidth;
canvas.height = boardWidth;

document.body.appendChild(canvas);

function init() {
	ctx.fillStyle = "lightyellow";
	ctx.fillRect(0, 0, boardWidth, boardWidth);

	for (var i = 0; i <= boardWidth; i += cellWidth) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, boardWidth);
		ctx.moveTo(0, i);
		ctx.lineTo(boardWidth, i);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.arc(0 + cellWidth / 2, 0 + cellWidth / 2, cellWidth / 2 - 3, 0, Math.PI * 2, true);
	ctx.lineWidth = 1;
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.stroke();
}

board.default();

// export default Board {
// 	init: function() {
//
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
var socket = io.connect('http://localhost:4040');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJib2FyZCIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjdHgiLCJnZXRDb250ZXh0IiwiYm9hcmRXaWR0aCIsImNlbGxXaWR0aCIsIndpZHRoIiwiaGVpZ2h0IiwiYm9keSIsImFwcGVuZENoaWxkIiwiaW5pdCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiaSIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImFyYyIsIk1hdGgiLCJQSSIsImxpbmVXaWR0aCIsImZpbGwiLCJkZWZhdWx0Iiwic29ja2V0IiwiaW8iLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQUEsWUFBQTtBQUNBQSxTQUFBQyxHQUFBLENBQUEsSUFBQTtBQUNBLEM7O0FDRkEsSUFBQUMsUUFBQUMsUUFBQSxTQUFBLENBQUE7O0FBRUE7QUFDQSxJQUFBQyxTQUFBQyxTQUFBQyxhQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0EsSUFBQUMsTUFBQUgsT0FBQUksVUFBQSxDQUFBLElBQUEsQ0FBQTs7QUFFQSxJQUFBQyxhQUFBLEdBQUE7QUFDQSxJQUFBQyxZQUFBRCxhQUFBLENBQUE7O0FBRUFMLE9BQUFPLEtBQUEsR0FBQUYsVUFBQTtBQUNBTCxPQUFBUSxNQUFBLEdBQUFILFVBQUE7O0FBRUFKLFNBQUFRLElBQUEsQ0FBQUMsV0FBQSxDQUFBVixNQUFBOztBQUVBLFNBQUFXLElBQUEsR0FBQTtBQUNBUixLQUFBUyxTQUFBLEdBQUEsYUFBQTtBQUNBVCxLQUFBVSxRQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQVIsVUFBQSxFQUFBQSxVQUFBOztBQUVBLE1BQUEsSUFBQVMsSUFBQSxDQUFBLEVBQUFBLEtBQUFULFVBQUEsRUFBQVMsS0FBQVIsU0FBQSxFQUFBO0FBQ0FILE1BQUFZLFNBQUE7QUFDQVosTUFBQWEsTUFBQSxDQUFBRixDQUFBLEVBQUEsQ0FBQTtBQUNBWCxNQUFBYyxNQUFBLENBQUFILENBQUEsRUFBQVQsVUFBQTtBQUNBRixNQUFBYSxNQUFBLENBQUEsQ0FBQSxFQUFBRixDQUFBO0FBQ0FYLE1BQUFjLE1BQUEsQ0FBQVosVUFBQSxFQUFBUyxDQUFBO0FBQ0FYLE1BQUFlLE1BQUE7QUFDQTs7QUFFQWYsS0FBQVksU0FBQTtBQUNBWixLQUFBZ0IsR0FBQSxDQUFBLElBQUFiLFlBQUEsQ0FBQSxFQUFBLElBQUFBLFlBQUEsQ0FBQSxFQUFBQSxZQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBYyxLQUFBQyxFQUFBLEdBQUEsQ0FBQSxFQUFBLElBQUE7QUFDQWxCLEtBQUFtQixTQUFBLEdBQUEsQ0FBQTtBQUNBbkIsS0FBQVMsU0FBQSxHQUFBLEtBQUE7QUFDQVQsS0FBQW9CLElBQUE7QUFDQXBCLEtBQUFlLE1BQUE7QUFDQTs7QUFFQXBCLE1BQUEwQixPQUFBOztBRC9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1dBLElBQUFDLFNBQUFDLEdBQUFDLE9BQUEsQ0FBQSx1QkFBQSxDQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ2hpJylcbn1cblxuLy8gZXhwb3J0IGRlZmF1bHQgQm9hcmQge1xuLy8gXHRpbml0OiBmdW5jdGlvbigpIHtcbi8vXG4vLyBcdFx0Y3R4LmZpbGxTdHlsZSA9IFwibGlnaHR5ZWxsb3dcIlxuLy8gXHRcdGN0eC5maWxsUmVjdCgwLCAwLCBib2FyZFdpZHRoLCBib2FyZFdpZHRoKVxuXG4vLyBcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPD0gYm9hcmRXaWR0aDsgaSArPSBjZWxsV2lkdGgpXHQge1xuLy8gXHRcdFx0Y3R4LmJlZ2luUGF0aCgpXG4vLyBcdFx0XHRjdHgubW92ZVRvKGksIDApXG4vLyBcdFx0XHRjdHgubGluZVRvKGksIGJvYXJkV2lkdGgpXG4vLyBcdFx0XHRjdHgubW92ZVRvKDAsIGkpXG4vLyBcdFx0XHRjdHgubGluZVRvKGJvYXJkV2lkdGgsIGkpXG4vLyBcdFx0XHRjdHguc3Ryb2tlKClcbi8vIFx0XHR9XG5cbi8vIFx0XHRjdHguYmVnaW5QYXRoKCk7XG4vLyBcdFx0Y3R4LmFyYygwICsgY2VsbFdpZHRoLzIsMCArIGNlbGxXaWR0aC8yLGNlbGxXaWR0aC8yIC0gMywwLE1hdGguUEkqMix0cnVlKTtcbi8vIFx0XHRjdHgubGluZVdpZHRoID0gM1xuLy8gXHRcdGN0eC5maWxsU3R5bGUgPSBcInJlZFwiXG4vLyBcdFx0Y3R4LmZpbGwoKVxuLy8gXHRcdGN0eC5zdHJva2UoKTtcbi8vIFx0fVxuLy8gfVxuIiwiY29uc3QgYm9hcmQgPSByZXF1aXJlKCcuL2JvYXJkJylcblxuIC8vIGNyZWF0ZSBjYW52YXNcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcblxubGV0IGJvYXJkV2lkdGggPSA2NDBcbmxldCBjZWxsV2lkdGggPSBib2FyZFdpZHRoLzhcblxuY2FudmFzLndpZHRoID0gYm9hcmRXaWR0aFxuY2FudmFzLmhlaWdodCA9IGJvYXJkV2lkdGhcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpXG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cdGN0eC5maWxsU3R5bGUgPSBcImxpZ2h0eWVsbG93XCJcblx0Y3R4LmZpbGxSZWN0KDAsIDAsIGJvYXJkV2lkdGgsIGJvYXJkV2lkdGgpXG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPD0gYm9hcmRXaWR0aDsgaSArPSBjZWxsV2lkdGgpXHQge1xuXHRcdGN0eC5iZWdpblBhdGgoKVxuXHRcdGN0eC5tb3ZlVG8oaSwgMClcblx0XHRjdHgubGluZVRvKGksIGJvYXJkV2lkdGgpXG5cdFx0Y3R4Lm1vdmVUbygwLCBpKVxuXHRcdGN0eC5saW5lVG8oYm9hcmRXaWR0aCwgaSlcblx0XHRjdHguc3Ryb2tlKClcblx0fVxuXG5cdGN0eC5iZWdpblBhdGgoKTtcblx0Y3R4LmFyYygwICsgY2VsbFdpZHRoLzIsMCArIGNlbGxXaWR0aC8yLGNlbGxXaWR0aC8yIC0gMywwLE1hdGguUEkqMix0cnVlKTtcblx0Y3R4LmxpbmVXaWR0aCA9IDFcblx0Y3R4LmZpbGxTdHlsZSA9IFwicmVkXCJcblx0Y3R4LmZpbGwoKVxuXHRjdHguc3Ryb2tlKCk7XG59XG5cbmJvYXJkLmRlZmF1bHQoKVxuXG5sZXQgc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2xvY2FsaG9zdDo0MDQwJylcblxuIl19
