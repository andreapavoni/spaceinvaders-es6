export default class Starfield {
  constructor() {
    this.fps = 30
    this.canvas = document.createElement('canvas')
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.minVelocity = 15
    this.maxVelocity = 30
    this.intervalId = 0
    this.starsQuantity = 100
    this.stars = []
  }

  initialise(div) {
    let self = this

    window.addEventListener('resize', (event) => {
      self.width = window.innerWidth
      self.height = window.innerHeight
      self.canvas.width = self.width
      self.canvas.height = self.height
      self.draw()
    })

    //	Create the canvas.
    div.appendChild(this.canvas)
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  start() {
    //	Create the stars.
    for(let i=0; i < this.starsQuantity; i++) {
      this.stars[i] = new Star( this.width, this.height, this.minVelocity, this.maxVelocity )
    }

    let self = this

    //	Start the timer.
    this.intervalId = setInterval(() => {
      self.update()
      self.draw()
    }, 1000 / this.fps)
  }

  stop() { clearInterval(this.intervalId) }

  update() {
    let dt = 1 / this.fps;

    this.stars.forEach((star, idx) => {
      star.y += dt * star.velocity

      if (star.y > this.height) {
        this.stars[idx] = new Star( this.width, 0, this.minVelocity, this.maxVelocity )
      }
    })
  }

  draw() {
    //	Get the drawing context.
    let ctx = this.canvas.getContext("2d")

    //	Draw the background.
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, this.width, this.height)

    //	Draw stars.
    ctx.fillStyle = '#ffffff'

    this.stars.forEach((star) => {
      ctx.fillRect(star.x, star.y, star.size, star.size)
    })
  }
}

function Star(x, y, velocityMin, velocityMax) {
  this.x = Math.random() * x
  this.y = Math.random() * y
  this.size = Math.random() * 3 + 1
  this.velocity = (Math.random() * (velocityMax - velocityMin)) + velocityMin
}
