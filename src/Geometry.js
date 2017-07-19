export class Rectangle {
  constructor(x, y, w, h) {
    this._x = x
    this._y = y
    this._width = w
    this._height = h
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
    const rbounds = rect.bounds
    if(this._width < rect.width && this._height < rect.height) {
      if(left < rbounds.left) {
        console.log('left < rbounds.left', left, rbounds.left)
        this._x = rbounds.left + this._width * 0.5
      } else if(right > rbounds.right) {
        console.log('right > rbounds.right', right, rbounds.right)
        this._x = rbounds.right - this._width * 0.5
      }
      if(top < rbounds.top) {
        console.log('top < rbounds.top', top, rbounds.top)
        this._y = rbounds.top + this._height * 0.5
      } else if(bottom > rbounds.bottom) {
        console.log('bottom > rbounds.bottom', bottom, rbounds.bottom)
        this._y = rbounds.bottom - this._height * 0.5
      }
      this.updateBounds()
    }

  }
}
