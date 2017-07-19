export class Rectangle {
  constructor(x, y, width, height) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this.bounds = {}
    this.updateBounds()
  }
  get x() {
    return this._x
  }
  set x(value) {
    this._x = value
    this.updateBounds()
  }

  get y() {
    return this._y
  }
  set y(value) {
    this._y = value
    this.updateBounds()
  }
  get width() {
    return this._width
  }
  set width(value) {
    this._width = value
    this.updateBounds()
  }
  get height() {
    return this._height
  }
  set height(value) {
    this._height = value
    this.updateBounds()
  }
  updateBounds() {
    this.bounds.left = this._x - this._width * 0.5
    this.bounds.right = this._x + this._width * 0.5
    this.bounds.top = this._y - this._height * 0.5
    this.bounds.bottom = this._y + this._height * 0.5
  }

  contains(point) {
    const {top, bottom, left, right} = this.bounds
    const tests = [
      top <= point.y,
      bottom >= point.y,
      left <= point.x,
      right >= point.x
    ].every(t => t === true)
    return tests
  }

  intersects(rect) {
    const {top, bottom, left, right} = this.bounds
    const t = top <= rect.top
    const b = bottom >= rect.bottom
    const l = left <= rect.left
    const r = right >= rect.right
    return [
      t && l,
      t && r,
      b && l,
      b && r
    ].some(t => t === true)
  }

  constrainTo(rect) {
    const {left, right, top, bottom} = this.bounds
    const {left : rl, right : rr, top: rt, bottom: rb} = rect.bounds
    if(this._width < rect.width && this._height < rect.height) {
      if(left < rl) {
        this._x = rl + this._width * 0.5
      } else if(right > rr) {
        this._x = rr - this._width * 0.5
      }
      if(top < rt) {
        this._y = rt + this._height * 0.5
      } else if(bottom > rb) {
        this._y = rb - this._height * 0.5
      }
      this.updateBounds()
    }

  }
}
