(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _pieces = require('./pieces');

var _pieces2 = _interopRequireDefault(_pieces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
board.render();

var socket = io.connect('http://localhost:4040');

},{"./board":2,"./pieces":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
	function Board(properties) {
		_classCallCheck(this, Board);

		// create canvas
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");

		var boardWidth = 640;
		var cellWidth = boardWidth / 8;

		canvas.width = boardWidth;
		canvas.height = boardWidth;
		this.ctx = ctx;
		this.boardWidth = boardWidth;
		this.cellWidth = cellWidth;

		document.body.appendChild(canvas);
	}

	_createClass(Board, [{
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
						ctx.fillStyle = "#404040";
					}
					fillYellow = !fillYellow;
					ctx.fillRect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
				}
			}

			for (var _i = 0; _i <= boardWidth; _i += cellWidth) {
				ctx.beginPath();
				ctx.moveTo(_i, 0);
				ctx.lineTo(_i, boardWidth);
				ctx.moveTo(0, _i);
				ctx.lineTo(boardWidth, _i);
				ctx.lineWidth = 2;
				ctx.stroke();
			}

			ctx.beginPath();
			ctx.arc(0 + cellWidth / 2, 0 + cellWidth / 2, cellWidth / 2 - 3, 0, Math.PI * 2, true);
			ctx.lineWidth = 1;
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.stroke();
		}
	}]);

	return Board;
}();

exports.default = Board;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pieces = function Pieces(properties) {
	_classCallCheck(this, Pieces);

	console.log('pieces ran');
};

exports.default = Pieces;

},{}]},{},[1])