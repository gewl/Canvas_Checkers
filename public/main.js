"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var board = new Board();
board.render();

var socket = io.connect('http://localhost:4040');

var Board = exports.Board = function () {
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
	}]);

	return Board;
}();

var Pieces = function Pieces(properties) {
	_classCallCheck(this, Pieces);
};

exports.default = Pieces;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJvYXJkLmpzIiwicGllY2VzLmpzIl0sIm5hbWVzIjpbImJvYXJkIiwiQm9hcmQiLCJyZW5kZXIiLCJzb2NrZXQiLCJpbyIsImNvbm5lY3QiLCJwcm9wZXJ0aWVzIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY3R4IiwiZ2V0Q29udGV4dCIsImJvYXJkV2lkdGgiLCJjZWxsV2lkdGgiLCJ3aWR0aCIsImhlaWdodCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiaSIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImFyYyIsIk1hdGgiLCJQSSIsImxpbmVXaWR0aCIsImZpbGwiLCJQaWVjZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxJQUFBQSxRQUFBLElBQUFDLEtBQUEsRUFBQTtBQUNBRCxNQUFBRSxNQUFBOztBQUVBLElBQUFDLFNBQUFDLEdBQUFDLE9BQUEsQ0FBQSx1QkFBQSxDQUFBOztJQ0pBSixLLFdBQUFBLEs7QUFDQSxnQkFBQUssVUFBQSxFQUFBO0FBQUE7O0FBQ0E7QUFDQSxNQUFBQyxTQUFBQyxTQUFBQyxhQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0EsTUFBQUMsTUFBQUgsT0FBQUksVUFBQSxDQUFBLElBQUEsQ0FBQTs7QUFFQSxNQUFBQyxhQUFBLEdBQUE7QUFDQSxNQUFBQyxZQUFBRCxhQUFBLENBQUE7O0FBRUFMLFNBQUFPLEtBQUEsR0FBQUYsVUFBQTtBQUNBTCxTQUFBUSxNQUFBLEdBQUFILFVBQUE7QUFDQSxPQUFBRixHQUFBLEdBQUFBLEdBQUE7QUFDQSxPQUFBRSxVQUFBLEdBQUFBLFVBQUE7QUFDQSxPQUFBQyxTQUFBLEdBQUFBLFNBQUE7O0FBRUFMLFdBQUFRLElBQUEsQ0FBQUMsV0FBQSxDQUFBVixNQUFBO0FBQ0E7Ozs7MkJBRUE7QUFBQSxPQUNBRyxHQURBLEdBQ0EsSUFEQSxDQUNBQSxHQURBO0FBQUEsT0FDQUUsVUFEQSxHQUNBLElBREEsQ0FDQUEsVUFEQTtBQUFBLE9BQ0FDLFNBREEsR0FDQSxJQURBLENBQ0FBLFNBREE7O0FBRUFILE9BQUFRLFNBQUEsR0FBQSxhQUFBO0FBQ0FSLE9BQUFTLFFBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBUCxVQUFBLEVBQUFBLFVBQUE7O0FBRUEsUUFBQSxJQUFBUSxJQUFBLENBQUEsRUFBQUEsS0FBQVIsVUFBQSxFQUFBUSxLQUFBUCxTQUFBLEVBQUE7QUFDQUgsUUFBQVcsU0FBQTtBQUNBWCxRQUFBWSxNQUFBLENBQUFGLENBQUEsRUFBQSxDQUFBO0FBQ0FWLFFBQUFhLE1BQUEsQ0FBQUgsQ0FBQSxFQUFBUixVQUFBO0FBQ0FGLFFBQUFZLE1BQUEsQ0FBQSxDQUFBLEVBQUFGLENBQUE7QUFDQVYsUUFBQWEsTUFBQSxDQUFBWCxVQUFBLEVBQUFRLENBQUE7QUFDQVYsUUFBQWMsTUFBQTtBQUNBOztBQUVBZCxPQUFBVyxTQUFBO0FBQ0FYLE9BQUFlLEdBQUEsQ0FBQSxJQUFBWixZQUFBLENBQUEsRUFBQSxJQUFBQSxZQUFBLENBQUEsRUFBQUEsWUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQWEsS0FBQUMsRUFBQSxHQUFBLENBQUEsRUFBQSxJQUFBO0FBQ0FqQixPQUFBa0IsU0FBQSxHQUFBLENBQUE7QUFDQWxCLE9BQUFRLFNBQUEsR0FBQSxLQUFBO0FBQ0FSLE9BQUFtQixJQUFBO0FBQ0FuQixPQUFBYyxNQUFBO0FBQ0E7Ozs7OztJQ3RDQU0sTSxHQUNBLGdCQUFBeEIsVUFBQSxFQUFBO0FBQUE7QUFFQSxDOztrQkFIQXdCLE0iLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxubGV0IGJvYXJkID0gbmV3IEJvYXJkKClcbmJvYXJkLnJlbmRlcigpXG5cbmxldCBzb2NrZXQgPSBpby5jb25uZWN0KCdodHRwOi8vbG9jYWxob3N0OjQwNDAnKVxuXG4iLCJleHBvcnQgY2xhc3MgQm9hcmQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzKSB7XG5cdFx0Ly8gY3JlYXRlIGNhbnZhc1xuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcblx0XHRjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG5cblx0XHRsZXQgYm9hcmRXaWR0aCA9IDY0MFxuXHRcdGxldCBjZWxsV2lkdGggPSBib2FyZFdpZHRoLzhcblxuXHRcdGNhbnZhcy53aWR0aCA9IGJvYXJkV2lkdGhcblx0XHRjYW52YXMuaGVpZ2h0ID0gYm9hcmRXaWR0aFxuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXHRcdHRoaXMuYm9hcmRXaWR0aCA9IGJvYXJkV2lkdGg7XG5cdFx0dGhpcy5jZWxsV2lkdGggPSBjZWxsV2lkdGg7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcylcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRsZXQgeyBjdHgsIGJvYXJkV2lkdGgsIGNlbGxXaWR0aCB9ID0gdGhpc1xuXHRcdGN0eC5maWxsU3R5bGUgPSBcImxpZ2h0eWVsbG93XCJcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgYm9hcmRXaWR0aCwgYm9hcmRXaWR0aClcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDw9IGJvYXJkV2lkdGg7IGkgKz0gY2VsbFdpZHRoKVx0IHtcblx0XHRcdGN0eC5iZWdpblBhdGgoKVxuXHRcdFx0Y3R4Lm1vdmVUbyhpLCAwKVxuXHRcdFx0Y3R4LmxpbmVUbyhpLCBib2FyZFdpZHRoKVxuXHRcdFx0Y3R4Lm1vdmVUbygwLCBpKVxuXHRcdFx0Y3R4LmxpbmVUbyhib2FyZFdpZHRoLCBpKVxuXHRcdFx0Y3R4LnN0cm9rZSgpXG5cdFx0fVxuXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5hcmMoMCArIGNlbGxXaWR0aC8yLDAgKyBjZWxsV2lkdGgvMixjZWxsV2lkdGgvMiAtIDMsMCxNYXRoLlBJKjIsdHJ1ZSk7XG5cdFx0Y3R4LmxpbmVXaWR0aCA9IDFcblx0XHRjdHguZmlsbFN0eWxlID0gXCJyZWRcIlxuXHRcdGN0eC5maWxsKClcblx0XHRjdHguc3Ryb2tlKCk7XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpZWNlcyB7XG5cdGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcblx0XHRcblx0fVxufVxuIl19
