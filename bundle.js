(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = exports.Rectangle = function () {
  function Rectangle(x, y, width, height) {
    _classCallCheck(this, Rectangle);

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.bounds = {};
    this.updateBounds();
  }

  _createClass(Rectangle, [{
    key: "updateBounds",
    value: function updateBounds() {
      this.bounds.left = this._x - this._width * 0.5;
      this.bounds.right = this._x + this._width * 0.5;
      this.bounds.top = this._y - this._height * 0.5;
      this.bounds.bottom = this._y + this._height * 0.5;
    }
  }, {
    key: "contains",
    value: function contains(point) {
      var _bounds = this.bounds,
          top = _bounds.top,
          bottom = _bounds.bottom,
          left = _bounds.left,
          right = _bounds.right;

      var tests = [top <= point.y, bottom >= point.y, left <= point.x, right >= point.x].every(function (t) {
        return t === true;
      });
      return tests;
    }
  }, {
    key: "intersects",
    value: function intersects(rect) {
      var _bounds2 = this.bounds,
          top = _bounds2.top,
          bottom = _bounds2.bottom,
          left = _bounds2.left,
          right = _bounds2.right;

      var t = top <= rect.top;
      var b = bottom >= rect.bottom;
      var l = left <= rect.left;
      var r = right >= rect.right;
      return [t && l, t && r, b && l, b && r].some(function (t) {
        return t === true;
      });
    }
  }, {
    key: "constrainTo",
    value: function constrainTo(rect) {
      var _bounds3 = this.bounds,
          left = _bounds3.left,
          right = _bounds3.right,
          top = _bounds3.top,
          bottom = _bounds3.bottom;
      var _rect$bounds = rect.bounds,
          rl = _rect$bounds.left,
          rr = _rect$bounds.right,
          rt = _rect$bounds.top,
          rb = _rect$bounds.bottom;

      if (this._width < rect.width && this._height < rect.height) {
        if (left < rl) {
          this._x = rl + this._width * 0.5;
        } else if (right > rr) {
          this._x = rr - this._width * 0.5;
        }
        if (top < rt) {
          this._y = rt + this._height * 0.5;
        } else if (bottom > rb) {
          this._y = rb - this._height * 0.5;
        }
        this.updateBounds();
      }
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
      this.updateBounds();
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
      this.updateBounds();
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    },
    set: function set(value) {
      this._width = value;
      this.updateBounds();
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    },
    set: function set(value) {
      this._height = value;
      this.updateBounds();
    }
  }]);

  return Rectangle;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Geometry = require('./Geometry');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var world = void 0,
    camera = void 0,
    player = void 0;

var entities = void 0;

var WIDTH = 640;
var HEIGHT = 480;
var WORLD_WIDTH = 5000;
var WORLD_HEIGHT = 5000;

var screenspace = function screenspace(camera, entity) {
  return [~~(entity.x - camera.x), ~~(entity.y - camera.y)];
};

var Camera = function (_Rectangle) {
  _inherits(Camera, _Rectangle);

  function Camera(vw, vh) {
    _classCallCheck(this, Camera);

    var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, vw * 0.5, vh * 0.5, vw, vh));

    _this.origin = { x: vw * 0.5, y: vh * 0.5 };
    return _this;
  }

  _createClass(Camera, [{
    key: 'lookAt',
    value: function lookAt(p) {
      this._x = p.x;
      this._y = p.y;
      this.updateBounds();
    }
  }]);

  return Camera;
}(_Geometry.Rectangle);

var sketch = function sketch(p) {
  p.setup = function setup() {
    p.createCanvas(WIDTH, HEIGHT);
    world = new _Geometry.Rectangle(0, 0, 10000, 5000);
    camera = new Camera(WIDTH, HEIGHT);
    player = p.createVector(WIDTH * 0.5, HEIGHT * 0.5);
    entities = [].concat(_toConsumableArray(Array(1000).keys())).map(function (_) {
      return p.createVector(p.random(WORLD_WIDTH), p.random(WORLD_HEIGHT));
    });
  };

  p.draw = function draw() {
    p.background('#3B4251');
    camera.lookAt(player);
    camera.constrainTo(world);
    drawGrid(camera.x % 20, camera.y % 20);
    p.push();
    p.translate(camera.origin.x, camera.origin.y);
    entities.filter(function (e) {
      return camera.contains(e);
    }).forEach(function (e) {
      var _screenspace = screenspace(camera, e),
          _screenspace2 = _slicedToArray(_screenspace, 2),
          x = _screenspace2[0],
          y = _screenspace2[1];

      drawEntity(x, y);
    });

    var _screenspace3 = screenspace(camera, player),
        _screenspace4 = _slicedToArray(_screenspace3, 2),
        px = _screenspace4[0],
        py = _screenspace4[1];

    drawPlayer(px, py);
    p.pop();
    automatePlayer();
  };

  function drawEntity(x, y) {
    p.push();
    p.translate(x, y);
    p.fill('#8AC0CF');
    p.noStroke();
    p.ellipse(0, 0, 10, 10);
    p.pop();
  }

  function drawGrid(xOff, yOff) {
    p.stroke('#4C5669');
    p.strokeWeight(2);
    for (var x = ~~(20 - xOff); x < WIDTH; x += 20) {
      p.line(x, 0, x, HEIGHT);
    }
    for (var y = ~~(20 - yOff); y < HEIGHT; y += 20) {
      p.line(0, y, WIDTH, y);
    }
  }

  function drawPlayer() {
    p.fill('#EACA8F');
    p.noStroke();
    p.ellipse(0, 0, 20, 20);
  }

  function automatePlayer() {
    player.x += ~~(p.random() * 3) + 2;
    player.y += ~~(p.random() * 3) + 2;
    if (player.x >= WORLD_WIDTH) {
      player.x = 0;
    }
    if (player.y >= WORLD_HEIGHT) {
      player.y = 0;
    }
  }
};

new p5(sketch);

},{"./Geometry":1}]},{},[2]);
