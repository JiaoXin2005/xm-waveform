import { setHDCanvas, style } from './utils'

class ButtomCavas {
  
  _defaultOptions = {
    width: 36,
    height: 36
  }

  constructor(container, options) {
    this.container = container
    this._option = {...this._defaultOptions, ...options}

    this._init()
  }

  _init() {
    this._createCanvas()
    this._draw()
  }

  _createCanvas () {
    this.canvas = document.createElement('canvas')
    this.canvasCtx = this.canvas.getContext('2d')

    let width = this._option.width
    let height = this._option.height
    style(this.canvas, {
      zIndex: '2',
      position: 'absolute',
      marginLeft: '-18px',
      left: 0,
      top: '13px',
      pointerEvents: 'none'
    })
    this.container.appendChild(
      setHDCanvas(this.canvas, { width, height })
    )
  }

  _draw() {
    let ctx = this.canvasCtx
    let r = this._option.width / 2
    var gradient = ctx.createRadialGradient(r, r, r, r, r, 2)
    gradient.addColorStop(0, "rgba(252,88,50,0.0)")
    gradient.addColorStop(0.5, "rgba(252,88,50,0.5)")
    gradient.addColorStop(0.2, "rgba(252,88,50,0.1)")
    gradient.addColorStop(0.8, "rgba(252,88,50,0.8)")
    gradient.addColorStop(0.8, "rgba(252,88,50,1)")
    gradient.addColorStop(0.99, "rgba(252,88,50,1)")
    gradient.addColorStop(1, "#fff")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this._option.width, this._option.height)
    ctx.fillStyle = '#fff'
    ctx.arc(r, r, 2, 0, 2 * Math.PI)
    ctx.fill()
  }


}

export default ButtomCavas