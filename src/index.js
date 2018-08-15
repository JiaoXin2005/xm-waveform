import { style, hex2rgb } from './utils'

import DefaultVar from './constants.js'


/** @type {HTMLCanvasElement}  */
let canvas = document.querySelector('#canvas')
let canvasCtx = canvas.getContext('2d')



let CANVAS_TOP_HEIGHT = 30
let PROGRESS_SPACE = 2
let CANVAS_BOTTOM_HEIGHT = 8

let BAR_WIDTH = 2
let BAR_GAP = 1

let WIDTH = 440
let HEIGHT = CANVAS_TOP_HEIGHT + PROGRESS_SPACE + CANVAS_BOTTOM_HEIGHT

let dpr = window.devicePixelRatio || 1;

canvas.width = WIDTH  * dpr
canvas.height = HEIGHT * dpr
canvasCtx.scale(dpr, dpr);
canvas.style.width = WIDTH + 'px'
canvas.style.height = HEIGHT + 'px'


let wavaDataArr = [40, 33, 40, 40, 3, 27, 26, 26, 40, 32, 21, 36, 10, 10, 12, 39, 17, 25, 10, 33, 28, 39, 22, 20, 25, 36, 20, 26, 2, 14, 39, 40, 26, 39, 0, 39, 40, 38, 25, 21, 11, 40, 33, 16, 15, 40, 38, 2, 16, 40, 37, 29, 10, 30, 38, 24, 22, 23, 40, 35, 1, 0, 40, 38, 0, 0, 37, 31, 9, 6, 19, 0, 39, 31, 27, 4, 37, 36, 34, 35, 24, 16, 28, 27, 15, 10, 40, 31, 2, 16, 34, 3, 37, 36, 22, 40, 18, 1, 20, 25, 26, 30, 40, 30, 20, 39, 30, 39, 6, 40, 32, 23, 39, 9, 40, 29, 36, 20, 34, 0, 39, 21, 35, 40, 38, 21, 40, 2, 23, 37, 13, 38, 23, 39, 40, 0, 25, 16, 13, 16, 40, 29, 22, 40, 15, 2, 32, 35, 40, 40, 40, 13, 37, 40, 36, 22, 36, 0, 0, 6, 40, 32, 32, 39, 40, 34, 24, 40, 28, 40, 40, 13, 11, 7, 0, 40, 40, 30, 4, 17, 34, 40, 22, 36, 39, 26, 40, 40, 34, 27, 40, 27, 31, 35, 36, 27, 0, 27, 20, 38, 35, 29, 36, 39, 24, 0, 37, 24, 30, 39, 22, 17, 4, 40, 40, 37, 40, 39, 30, 40, 20, 40, 39, 38, 23, 18, 25, 16, 40, 35, 0, 30, 37, 39, 36, 39, 26, 29, 31, 19, 26, 33, 39, 34, 0, 40, 39, 40, 40, 40, 31, 39, 34, 35, 40, 40, 27, 23, 40, 39, 34, 40, 40, 32, 40, 40, 38, 38, 26, 34, 35, 30, 32, 40, 24, 40, 40, 31, 23, 40, 14, 38, 40, 40, 23, 30, 29, 40, 40, 40, 3, 36, 28, 34, 24, 21, 40, 38, 2, 40, 40, 16, 39, 14, 28, 23, 28, 40, 33, 37, 40, 26, 32, 29, 27, 38, 32, 22, 24, 0, 31, 40, 1, 23, 32, 27, 18, 37, 34, 25, 24, 12, 24, 0, 36, 40, 39, 29, 17, 0, 40, 22, 34, 40, 40, 31, 17, 16, 37, 40, 18, 26, 39, 25, 39, 27, 20, 25, 30, 40, 23, 36, 24, 31, 40, 26, 12, 32, 2, 4, 39, 40, 15, 23, 24, 25, 40, 24, 40, 39, 36, 30, 40, 40, 24, 19, 40, 35, 25, 26, 40, 30, 40, 40, 34, 28, 35, 27, 40, 39, 26, 32, 26, 18, 40, 40, 40, 31, 36, 25, 27, 22, 2, 20, 30, 38, 35, 33, 32, 32, 34, 4, 0, 40, 40, 27, 18, 2, 39, 39, 40, 17, 32, 40, 36, 24, 35, 23, 40, 21, 19, 16, 0, 12, 12, 17, 40, 28, 40, 38, 40, 21, 30, 36, 39, 40, 28, 29, 28, 38, 8, 18, 25, 12, 18, 24, 31, 13, 40, 28, 40, 40, 36, 15, 12, 33, 2, 40, 40, 39, 40, 40, 40, 18, 13, 40, 40, 40, 35, 40, 28, 23, 13, 1, 40, 35, 27, 14, 34, 0, 26, 12, 31, 24, 26, 26, 29, 28, 5, 23, 27, 22, 39, 27, 37, 32, 32, 24, 27, 28, 30, 34, 24, 40, 39, 8, 40, 27, 40, 27, 40, 30, 0, 28, 40, 24, 40, 32, 20, 16, 23, 40, 6, 40, 23, 29, 32, 40, 30, 26, 39, 37, 33, 40, 38, 33, 38, 40, 31, 38, 39, 40, 23, 39, 40, 26, 14, 8, 27, 26, 0, 40, 40, 18, 17, 18, 14, 40, 26, 40, 31, 12, 0, 0, 0, 39, 32, 40, 40, 23, 38, 40, 12, 19, 17, 29, 35, 20, 40, 8, 29, 30, 38, 17, 40, 6, 27, 24, 26, 32, 10, 35, 40, 33, 25, 39, 21, 39, 25, 36, 40, 32, 22, 23, 16, 38, 25, 39, 1, 0]

let drump =  ~~( wavaDataArr.length / WIDTH )
let x = 0
function draw() {
  for (let i = 0; i < wavaDataArr.length; i ++) {
    canvasCtx.save()
    let curBar = wavaDataArr[i]
    
    canvasCtx.fillStyle = '#F86442'
    canvasCtx.fillRect(x, CANVAS_TOP_HEIGHT - curBar * (3 / 4), BAR_WIDTH, curBar * (3 / 4))

    canvasCtx.fillStyle = 'red'
    canvasCtx.fillRect(x, CANVAS_TOP_HEIGHT + PROGRESS_SPACE, BAR_WIDTH, curBar * ( 1/ 5 ))

    x += BAR_WIDTH + 1
    canvasCtx.restore()
  }
}

draw()


/* --------------- */
class XmWaveform {
  
  _defaultOptions = {
    container: null,
    topHeight: 30,
    progressSpace: 2,
    bottomHeight: 8,
    width: 440,
    height: 40,
    barWidth: 2,
    barGap: 1,
    pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI || 1,
    waveColor: '#E8E8E8',
    progressColor: '#F86442',
    opacity: 0.7
  }

  waveCanvas = null

  constructor(options) {
    this._options = {...this._defaultOptions, ...options}
    this._defineHeight()
    this.container = 'string' === typeof this._options.container
      ? document.querySelector(this._options.container)
      : this._options.container

    // this._createWaveCanvas()

    this._init()
    
  }

  _defineHeight() {
    Object.defineProperty(this._options, 'height', { get: function () {
      return (+this.topHeight) + (+this.progressSpace) + (+this.bottomHeight)
    } })
  }

  _init() {
    style(this.container, {
      'position': 'relative',
      'display': 'inline-block'
    })

    this._createWaveCanvas()

    this._createProgressWrapper()
    this._createProgressCanvas()
  }

  _createWaveCanvas() {
    this.waveCanvas = document.createElement('canvas')
    this.waveCanvasCtx = this.waveCanvas.getContext('2d')

    let width = this._options.width
    let height = this._options.height

    this.container.appendChild(
      this._setHDCanvas(this.waveCanvas, {width, height })
    )
  }

  _setHDCanvas = (canvasElm, {width, height}) => {
    let ctx = canvasElm.getContext('2d')
    let dpr = this._options.pixelRatio
    canvasElm.width = width * dpr
    canvasElm.height = height *  dpr
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

  _drawBars = () => {
    let x = 0
    const CANVAS_TOP_HEIGHT = this._options.topHeight
    const PROGRESS_SPACE = this._options.progressSpace
    const CANVAS_BOTTOM_HEIGHT = this._options.bottomHeight
    const BAR_WIDTH = this._options.barWidth
    const BAR_GAP = this._options.barGap

    const WIDTH = this._options.width
    const HEIGHT = this._options.height

    const topHeightRatio = CANVAS_TOP_HEIGHT / HEIGHT
    const bottomHeightRatio = CANVAS_BOTTOM_HEIGHT / HEIGHT

    let drump = ~~(wavaDataArr.length / WIDTH)
    
    for (let i = 0; i < wavaDataArr.length; i++) {
      let canvasCtx = this.waveCanvasCtx

      canvasCtx.save()

      let curBar = wavaDataArr[i]

      canvasCtx.fillStyle = this._getFillRectColor(this._options.waveColor)
      canvasCtx.fillRect(x, CANVAS_TOP_HEIGHT - curBar * topHeightRatio, BAR_WIDTH, curBar * topHeightRatio)

      canvasCtx.fillStyle = this._getFillRectColor(this._options.waveColor, true)
      canvasCtx.fillRect(x, CANVAS_TOP_HEIGHT + PROGRESS_SPACE, BAR_WIDTH, curBar * bottomHeightRatio)

      x += BAR_WIDTH + BAR_GAP
      
      canvasCtx.restore()
    }
  }

  /*
   * PROGRESS 
   */
  _createProgressWrapper() {
    this.progressWrapper = document.createElement('div')
    this.container.appendChild(
      style(this.progressWrapper, {
        position: 'absolute',
        zIndex: 2,
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden',
        width: '0',
        display: 'none',
        pointerEvents: 'none'
      })
    )
  }

  _createProgressCanvas() {
    this.progressCanvas = document.createElement('canvas')
    this.progressCanvasCtx = this.progressCanvas.getContext('2d')

    let width = this._options.width
    let height = this._options.height

    this.progressWrapper.appendChild(
      this._setHDCanvas(this.progressCanvas, { width, height })
    )
  }

  /*********************
   * Public functions. *
   *********************/

}


let xmWaveform = new XmWaveform({
  container: '#waveform',
})

xmWaveform._drawBars()
