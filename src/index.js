import { style, hex2rgb } from './utils'
import DrawCanvas from './DrawCanvas'
import ButtomCanvas from './ButtomCanvas'

import DefaultVar from './constants.js'
import Observer from './utils/Observer';

let wavaDataArr = [40, 33, 40, 40, 3, 27, 26, 26, 40, 32, 21, 36, 10, 10, 12, 39, 17, 25, 10, 33, 28, 39, 22, 20, 25, 36, 20, 26, 2, 14, 39, 40, 26, 39, 0, 39, 40, 38, 25, 21, 11, 40, 33, 16, 15, 40, 38, 2, 16, 40, 37, 29, 10, 30, 38, 24, 22, 23, 40, 35, 1, 0, 40, 38, 0, 0, 37, 31, 9, 6, 19, 0, 39, 31, 27, 4, 37, 36, 34, 35, 24, 16, 28, 27, 15, 10, 40, 31, 2, 16, 34, 3, 37, 36, 22, 40, 18, 1, 20, 25, 26, 30, 40, 30, 20, 39, 30, 39, 6, 40, 32, 23, 39, 9, 40, 29, 36, 20, 34, 0, 39, 21, 35, 40, 38, 21, 40, 2, 23, 37, 13, 38, 23, 39, 40, 0, 25, 16, 13, 16, 40, 29, 22, 40, 15, 2, 32, 35, 40, 40, 40, 13, 37, 40, 36, 22, 36, 0, 0, 6, 40, 32, 32, 39, 40, 34, 24, 40, 28, 40, 40, 13, 11, 7, 0, 40, 40, 30, 4, 17, 34, 40, 22, 36, 39, 26, 40, 40, 34, 27, 40, 27, 31, 35, 36, 27, 0, 27, 20, 38, 35, 29, 36, 39, 24, 0, 37, 24, 30, 39, 22, 17, 4, 40, 40, 37, 40, 39, 30, 40, 20, 40, 39, 38, 23, 18, 25, 16, 40, 35, 0, 30, 37, 39, 36, 39, 26, 29, 31, 19, 26, 33, 39, 34, 0, 40, 39, 40, 40, 40, 31, 39, 34, 35, 40, 40, 27, 23, 40, 39, 34, 40, 40, 32, 40, 40, 38, 38, 26, 34, 35, 30, 32, 40, 24, 40, 40, 31, 23, 40, 14, 38, 40, 40, 23, 30, 29, 40, 40, 40, 3, 36, 28, 34, 24, 21, 40, 38, 2, 40, 40, 16, 39, 14, 28, 23, 28, 40, 33, 37, 40, 26, 32, 29, 27, 38, 32, 22, 24, 0, 31, 40, 1, 23, 32, 27, 18, 37, 34, 25, 24, 12, 24, 0, 36, 40, 39, 29, 17, 0, 40, 22, 34, 40, 40, 31, 17, 16, 37, 40, 18, 26, 39, 25, 39, 27, 20, 25, 30, 40, 23, 36, 24, 31, 40, 26, 12, 32, 2, 4, 39, 40, 15, 23, 24, 25, 40, 24, 40, 39, 36, 30, 40, 40, 24, 19, 40, 35, 25, 26, 40, 30, 40, 40, 34, 28, 35, 27, 40, 39, 26, 32, 26, 18, 40, 40, 40, 31, 36, 25, 27, 22, 2, 20, 30, 38, 35, 33, 32, 32, 34, 4, 0, 40, 40, 27, 18, 2, 39, 39, 40, 17, 32, 40, 36, 24, 35, 23, 40, 21, 19, 16, 0, 12, 12, 17, 40, 28, 40, 38, 40, 21, 30, 36, 39, 40, 28, 29, 28, 38, 8, 18, 25, 12, 18, 24, 31, 13, 40, 28, 40, 40, 36, 15, 12, 33, 2, 40, 40, 39, 40, 40, 40, 18, 13, 40, 40, 40, 35, 40, 28, 23, 13, 1, 40, 35, 27, 14, 34, 0, 26, 12, 31, 24, 26, 26, 29, 28, 5, 23, 27, 22, 39, 27, 37, 32, 32, 24, 27, 28, 30, 34, 24, 40, 39, 8, 40, 27, 40, 27, 40, 30, 0, 28, 40, 24, 40, 32, 20, 16, 23, 40, 6, 40, 23, 29, 32, 40, 30, 26, 39, 37, 33, 40, 38, 33, 38, 40, 31, 38, 39, 40, 23, 39, 40, 26, 14, 8, 27, 26, 0, 40, 40, 18, 17, 18, 14, 40, 26, 40, 31, 12, 0, 0, 0, 39, 32, 40, 40, 23, 38, 40, 12, 19, 17, 29, 35, 20, 40, 8, 29, 30, 38, 17, 40, 6, 27, 24, 26, 32, 10, 35, 40, 33, 25, 39, 21, 39, 25, 36, 40, 32, 22, 23, 16, 38, 25, 39, 1, 0]

class XmWaveform extends Observer{

  
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
    opacity: 0.7,
    wavaDataArr: wavaDataArr
  }

  waveCanvas = null

  constructor(options) {
    super(options)
    this._options = {...this._defaultOptions, ...options}
    this._defineHeight()
    this.container = 'string' === typeof this._options.container
      ? document.querySelector(this._options.container)
      : this._options.container

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
    this._createProgressWrapper()
    this.waveDrawer = new DrawCanvas(this.container, this._filterColor('waveColor'))
    this.progressDrawer = new DrawCanvas(this.progressWrapper, this._filterColor('progressColor'))

    this.buttomDrawer = new ButtomCanvas(this.container)

    this._bindEvents()
  }

  _bindEvents() {
    this.container.addEventListener('mouseup', (e) => {
      e.stopPropagation()
      let clientX = e.clientX
      let rect = this.container.getBoundingClientRect()
      let pointX = clientX - rect.x
      pointX <= 0 && (pointX = 0)
      let ratio = pointX / this._options.width

      this.emit('mouseup', ratio)
      this.updateProgress(ratio)
    }, true)
  }

  _filterColor = (color) => {
    let _options = JSON.parse(JSON.stringify(this._options))
    let { waveColor, progressColor, ...rest } = _options
    let r = {
      color : _options[color]
    }
    return { ...rest, ...r }
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
        height: this._options.height + 'px',
        overflow: 'hidden',
        width: '0',
        display: 'none',
        pointerEvents: 'none'
      })
    )
  }

  _updateProgress(ratio) {
    let width = ~~(ratio * this._options.width)
    width >= this._options.width && (width = this._options.width)
    width <= 0 && (width = 0)
    style(this.progressWrapper, {
      display: 'block',
      width: width + 'px'
    })
  }

  _updateButtom(ratio) {
    let left = ~~(ratio * this._options.width)
    left >= this._options.width && (left = this._options.width)
    left <= 0 && (left = 0)
    style(this.buttomDrawer.canvas, {
      display: 'block',
      left: left + 'px'
    })
  }

  /*********************
   * Public functions. *
   *********************/
  updateProgress(ratio) {
    this._updateProgress(ratio)
    this._updateButtom(ratio)
  }

}

export default XmWaveform

// let xmWaveform = new XmWaveform({
//   container: '#waveform',
// })

// let x = 0
// function update(){
//   x+=0.001
//   xmWaveform.updateProgress(x)
//   window.requestAnimationFrame(update)
// }

// xmWaveform.on('mouseup', (aa) => {

// })

// requestAnimationFrame(update)

// xmWaveform._drawBars()
