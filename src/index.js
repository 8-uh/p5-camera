import {Rectangle} from './Geometry'


let world,
    camera,
    player

let entities

const WIDTH = 640
const HEIGHT = 480
const WORLD_WIDTH = 5000
const WORLD_HEIGHT = 5000


const screenspace = (camera, entity) => [~~(entity.x - camera.x), ~~(entity.y - camera.y)]





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

const sketch = p => {
  p.setup = function setup() {
    p.createCanvas(WIDTH, HEIGHT)
    world = new Rectangle(0,0, WORLD_WIDTH, WORLD_HEIGHT)
    camera = new Camera(WIDTH, HEIGHT)
    player = p.createVector(0,0)
    entities = [...Array(1000).keys()].map(_ => p.createVector(p.random(WORLD_WIDTH), p.random(WORLD_HEIGHT))
    )
  }

  p.draw = function draw() {
    p.background('#3B4251')
    camera.lookAt(player)
    camera.constrainTo(world)
    drawGrid(camera.x % 20, camera.y % 20)
    p.push()
      p.translate(camera.origin.x, camera.origin.y)
      entities
        .filter(e => camera.contains(e))
        .forEach(e => {
          const [x,y] = screenspace(camera, e)
          drawEntity(x,y)
        })
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

  function drawPlayer(x, y) {
    p.fill('#EACA8F')
    p.noStroke()
    p.ellipse(x,y,20,20)
  }

  function automatePlayer() {
    player.x += 3
    player.y += 2
    if(player.x >= WORLD_WIDTH) {
      player.x = 0
    }
    if(player.y >= WORLD_HEIGHT) {
      player.y = 0
    }
  }
}

new p5(sketch)
