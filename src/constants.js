// const DEFAULT = {
//   CANVAS_TOP_HEIGHT: 30, // canvas 上部分height
//   PROGRESS_SPACE: 2, // canvas 间隔部分space
//   CANVAS_BOTTOM_HEIGHT: 8, //  canvas 下部分
//   BAR_WIDTH: 2, // 柱宽
//   BAR_GAP: 1, // 柱高

//   CANVAS_WIDTH: 440, // canvas默认大小

//   // CANVAS_HEIGHT: DEFAULT.CANVAS_TOP_HEIGHT + DEFAULT.PROGRESS_SPACE + DEFAULT.CANVAS_BOTTOM_HEIGHT
  
//   // let dpr = window.devicePixelRatio || 1;
// }


class DefaultVar {
  constructor() {
    this.CANVAS_TOP_HEIGHT = 30
    this.PROGRESS_SPACE = 2
    this.CANVAS_BOTTOM_HEIGHT = 8
    this.BAR_WIDTH = 2
    this.BAR_GAP = 1
    this.CANVAS_WIDTH = 440
  }

  get CANVAS_HEIGHT() {
    return this.CANVAS_TOP_HEIGHT + this.PROGRESS_SPACE + this.CANVAS_BOTTOM_HEIGHT
  }
}

export default DefaultVar