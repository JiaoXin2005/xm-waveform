import { style, hex2rgb } from './utils'

class DrawCanvas {
  constructor(container, _options) {
    // super(container, _options)
    this.container = container
    this._options = _options
    
    this.init()
  }

  init() {
    this._createCanvas()
    this.drawBars()
  }


  _createCanvas() {
    this.canvas = document.createElement('canvas')
    this.canvasCtx = this.canvas.getContext('2d')

    let width = this._options.width
    let height = this._options.height

    this.container.appendChild(
      this._setHDCanvas(this.canvas, { width, height })
    )
  }

  _setHDCanvas = (canvasElm, { width, height }) => {
    let ctx = this.canvasCtx
    let dpr = this._options.pixelRatio

    canvasElm.width = width * dpr
    canvasElm.height = height * dpr

    ctx.scale(dpr, dpr)
    return style(canvasElm, {
      width: width + 'px',
      height: height + 'px',
      display: 'block'
    })
  }

  _getFillRectColor(color, needOpacity = false) {
    let c = color
    if (/^#/.test(color)) {
      let rgb = hex2rgb(color)
      c = needOpacity
        ? `rgba(${rgb.r},${rgb.g},${rgb.b},${this._options.opacity})`
        : `rgba(${rgb.r},${rgb.g},${rgb.b},1)`
    }
    return c
  }

  drawBars = () => {
    let x = 0
    const CANVAS_TOP_HEIGHT = this._options.topHeight
    const PROGRESS_SPACE = this._options.progressSpace
    const CANVAS_BOTTOM_HEIGHT = this._options.bottomHeight
    const BAR_WIDTH = this._options.barWidth
    const BAR_GAP = this._options.barGap

    const WIDTH = this._options.width
    const HEIGHT = this._options.height
    
    let dataHeight = this._options.wavaData.height
    let wavaDataArr = this._options.wavaData.samples

    const topHeightRatio = CANVAS_TOP_HEIGHT / dataHeight
    const bottomHeightRatio = CANVAS_BOTTOM_HEIGHT / dataHeight

    // let drump = ~~(wavaDataArr.length / WIDTH)

    for (let i = 0; i < wavaDataArr.length; i++) {
      let canvasCtx = this.canvasCtx

      canvasCtx.save()

      let curBar = wavaDataArr[i]

      canvasCtx.fillStyle = this._getFillRectColor(this._options.color)
      canvasCtx.fillRect(x, CANVAS_TOP_HEIGHT - curBar * topHeightRatio, BAR_WIDTH, curBar * topHeightRatio)

      canvasCtx.fillStyle = this._getFillRectColor(this._options.color, true)
      canvasCtx.fillRect(x, CANVAS_TOP_HEIGHT + PROGRESS_SPACE, BAR_WIDTH, curBar * bottomHeightRatio)

      x += BAR_WIDTH + BAR_GAP

      canvasCtx.restore()
    }
  }

}

export default DrawCanvas