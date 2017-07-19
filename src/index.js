import {Rectangle} from './Geometry'

console.log('spler')

let world,
    camera,
    player

let entity

const WIDTH = 640
const HEIGHT = 480


const screenspace = (camera, entity) => [~~(entity.x - camera.x), ~~(entity.y - camera.y)]

console.log('there')



class Camera extends Rectangle {
  constructor(vw, vh) {
    super(vw * 0.5, vh * 0.5, vw, vh)
    this.origin = {x: vw * 0.5, y: vh * 0.5}
  }
  lookAt(p) {
    this._x = p.x
    this._y = p.y
    this.updateBounds()
  }
}

console.log('here')

const sketch = p => {
  p.setup = function setup() {
    console.log('setup')
    p.createCanvas(WIDTH, HEIGHT)
    world = new Rectangle(0,0, 10000, 5000)
    camera = new Camera(WIDTH, HEIGHT)
    player = p.createVector(WIDTH * 0.5, HEIGHT * 0.5)
    entity = p.createVector(WIDTH * 0.75, HEIGHT * 0.75)
  }

  p.draw = function draw() {
    p.background('#3B4251')
    camera.lookAt(player)
    camera.constrainTo(world)
    drawGrid(camera.x % 20, camera.y % 20)
    p.push()
      p.translate(camera.origin.x, camera.origin.y)

      if(camera.contains(entity)) {
        const [x,y] = screenspace(camera, entity)
        console.log('x,y:', x, y)
        drawEntity(x,y)

      }
      const [px,py] = screenspace(camera, player)
      drawPlayer(px, py)
    p.pop()
    automatePlayer()
  }

  function drawEntity(x, y) {
    p.push()
    p.translate(x,y)
    p.fill('#8AC0CF')
    p.noStroke()
    p.ellipse(0,0,10,10)
    p.pop()
  }

  function drawGrid(xOff, yOff) {
    p.stroke('#4C5669')
    p.strokeWeight(2)
    for(var x = ~~(20 - xOff); x < WIDTH; x += 20) {
      p.line(x, 0, x, HEIGHT)
    }
    for(var y = ~~(20 - yOff); y < HEIGHT; y += 20) {
      p.line(0, y, WIDTH, y)
    }
  }

  function drawPlayer() {
    p.fill('#EACA8F')
    p.noStroke()
    p.ellipse(0,0,20,20)
  }

  function automatePlayer() {
    player.x += p.random()
    player.y += p.random()
  }
}

new p5(sketch)
