import { style, hex2rgb, isDev } from './utils'
import jsonp from './utils/jsonp'
import xmAddress from './utils/xmAddress'
import DrawCanvas from './DrawCanvas'
import ButtomCanvas from './ButtomCanvas'

// import DefaultVar from './constants.js'
import Observer from './utils/Observer';

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
    fdfsUrl: xmAddress.fdfsUrl,
    waveJsUrl: '',
    wavaData : null
  }

  wavaData = { width: null, height: null, samples: [] }

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

  async _init() {
    try {
      this._PromiseF = this._fetchData()
      await this._PromiseF()
      style(this.container, {
        'position': 'relative',
        'display': 'inline-block'
      })
      this._createProgressWrapper()
      this.waveDrawer = new DrawCanvas(this.container, this._filterColor('waveColor'))
      this.progressDrawer = new DrawCanvas(this.progressWrapper, this._filterColor('progressColor'))
  
      this.buttomDrawer = new ButtomCanvas(this.container)
  
      this._bindEvents()
      this.emit('initComplete')
    } catch (error) {
      console.log(error)
    }
  }

  _fetchData() {
    let  _reject
    const p = new Promise((resolve, reject) => {
      _reject = reject
      let url = this._options.fdfsUrl + this._options.waveJsUrl
      jsonp(url)
        .then(res => {
          this.wavaData = res.data
          resolve(res.data)
        })
        .catch(err => console.warn(err))
    })

    return (f) => {
      if (!f) {
        return p
      } else {
        _reject()
      }
    }
  }

  _bindEvents() {
    this._mouseUpHandler = (e) => {
      e.stopPropagation()
      let clientX = e.clientX
      let rect = this.container.getBoundingClientRect()
      let pointX = clientX - rect.x
      pointX <= 0 && (pointX = 0)
      let ratio = pointX / this._options.width

      this.emit('mouseup', ratio)
      this.updateProgress(ratio)
    }

    this.container.addEventListener('mouseup', this._mouseUpHandler, true)
  }

  _removeEvent() {
    this.container.removeEventListener('mouseup', this._mouseUpHandler)
  }

  _filterColor = (color) => {
    let _options = JSON.parse(JSON.stringify(this._options))
    let { waveColor, progressColor, ...rest } = _options
    let r = {
      color : _options[color]
    }
    return { ...rest, ...r, wavaData: this.wavaData}
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
    if (!this.progressWrapper) return null
    let width = ~~(ratio * this._options.width)
    width >= this._options.width && (width = this._options.width)
    width <= 0 && (width = 0)
    style(this.progressWrapper, {
      display: 'block',
      width: width + 'px'
    })
  }

  _updateButtom(ratio) {
    if (!this.buttomDrawer) return null
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

  destory() {
    this._PromiseF(true) // 阻止promise接口调用
    this._removeEvent()
    this.unAll()
    this.container.innerHTML = ''
  }

}

export default XmWaveform
