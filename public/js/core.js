(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _piece = require('./piece');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
board.render();

var socket = io.connect('http://localhost:4040');

socket.on('gameStart', function () {
	board.resetPieces();
});

},{"./board":2,"./piece":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _piece = require("./piece");

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
	function Board(properties) {
		var _this = this;

		_classCallCheck(this, Board);

		// create canvas
		var canvas = document.createElement("canvas");
		var boardWidth = 640;
		canvas.width = boardWidth;
		canvas.height = boardWidth;

		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.boardWidth = 640;
		this.cellWidth = boardWidth / 8;
		this.board = [];
		this.cellSelected = false;

		//event listener for clicks to allow piece movement
		canvas.addEventListener('mousedown', function (e) {
			var mouse = _this.getMouse(e);
		});

		document.body.appendChild(canvas);
	}

	_createClass(Board, [{
		key: "getMouse",
		value: function getMouse(event) {
			var canvas = this.canvas,
			    offsetX = 0,
			    offsetY = 0,
			    mx = void 0,
			    my = void 0;

			var x = Math.floor(event.offsetX / 80);
			var y = Math.floor(event.offsetY / 80);

			if (this.board[y][x] === 'B' && !this.cellSelected) {
				this.selectCell(x, y);
			} else {
				this.redrawBoard();
			}
		}
	}, {
		key: "selectCell",
		value: function selectCell(x, y) {
			var cellWidth = this.cellWidth,
			    ctx = this.ctx;

			x = x * cellWidth;
			y = y * cellWidth;
			ctx.strokeStyle = 'limegreen';
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + cellWidth, y);
			ctx.lineTo(x + cellWidth, y + cellWidth);
			ctx.lineTo(x, y + cellWidth);
			ctx.lineTo(x, y);
			ctx.lineWidth = 3;
			ctx.stroke();
			this.cellSelected = true;
		}
	}, {
		key: "getBoard",
		value: function getBoard() {
			return this.board;
		}
	}, {
		key: "setBoard",
		value: function setBoard(board) {
			this.board = board;
		}
	}, {
		key: "drawPiece",
		value: function drawPiece(color, x, y) {
			var cellWidth = this.cellWidth,
			    ctx = this.ctx;

			ctx.beginPath();
			ctx.arc(x + cellWidth / 2, y + cellWidth / 2, cellWidth / 2 - 3, 0, Math.PI * 2, true);
			ctx.lineWidth = 1;
			ctx.fillStyle = color;
			ctx.fill();
			ctx.stroke();
		}
	}, {
		key: "drawPieces",
		value: function drawPieces() {
			var _this2 = this;

			var cellWidth = this.cellWidth,
			    ctx = this.ctx;


			this.board.forEach(function (row, y) {
				row.forEach(function (square, x) {
					if (square === 'R') {
						_this2.drawPiece('red', x * cellWidth, y * cellWidth);
					} else if (square === 'B') {
						_this2.drawPiece('black', x * cellWidth, y * cellWidth);
					}
				});
			});

			// this.pieces.forEach(piece => {
			// 	ctx.beginPath();
			// 	ctx.arc(piece.x + cellWidth/2, piece.y + cellWidth/2, cellWidth/2 - 3,0,Math.PI*2,true);
			// 	ctx.lineWidth = 1
			// 	ctx.fillStyle = piece.color
			// 	ctx.fill()
			// 	ctx.stroke();
			// })
		}
	}, {
		key: "redrawBoard",
		value: function redrawBoard() {
			this.ctx.clearRect(0, 0, this.boardWidth, this.boardWidth);
			this.render();
			this.drawPieces();
			this.cellSelected = false;
		}
	}, {
		key: "resetPieces",
		value: function resetPieces() {
			var cellWidth = this.cellWidth;


			this.board = [[0, 'R', 0, 'R', 0, 'R', 0, 'R'], ['R', 0, 'R', 0, 'R', 0, 'R', 0], [0, 'R', 0, 'R', 0, 'R', 0, 'R'], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], ['B', 0, 'B', 0, 'B', 0, 'B', 0], [0, 'B', 0, 'B', 0, 'B', 0, 'B'], ['B', 0, 'B', 0, 'B', 0, 'B', 0]];

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
			this.drawPieces();
		}
	}, {
		key: "render",
		value: function render() {
			var ctx = this.ctx,
			    boardWidth = this.boardWidth,
			    cellWidth = this.cellWidth;

			var fillYellow = true;
			for (var i = 0; i < 9; i++) {
				for (var j = 0; j < 9; j += 1) {
					if (fillYellow) {
						ctx.fillStyle = "lightyellow";
					} else {
						ctx.fillStyle = "#606060";
					}
					fillYellow = !fillYellow;
					ctx.fillRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
				}
			}

			ctx.strokeStyle = 'black';
			for (var _i = 0; _i <= boardWidth; _i += cellWidth) {
				ctx.beginPath();
				ctx.moveTo(_i, 0);
				ctx.lineTo(_i, boardWidth);
				ctx.moveTo(0, _i);
				ctx.lineTo(boardWidth, _i);
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		}
	}]);

	return Board;
}();

exports.default = Board;

},{"./piece":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function Piece(color, x, y) {
	_classCallCheck(this, Piece);

	this.color = color;
	this.x = x;
	this.y = y;
};

exports.default = Piece;

},{}]},{},[1])