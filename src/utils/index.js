export const style = (el, styles) => {
  for (const key in styles) {
    if (el.style[key] !== styles[key]) {
      el.style[key] = styles[key]
    }
  }

  return el
}

export const setHDCanvas = (canvasElm, { width, height }) => {
  let ctx = canvasElm.getContext('2d')
  let dpr = window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI || 1

  canvasElm.width = width * dpr
  canvasElm.height = height * dpr

  ctx.scale(dpr, dpr)
  return style(canvasElm, {
    width: width + 'px',
    height: height + 'px',
    display: 'block'
  })
}

export const hex2rgb = hex => {
  const bigint = parseInt(
    hex.charAt(0) === '#' ? hex.substring(1, 7) : hex, 16
  )

  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

export const isDev = () => {
  let host = window.location.host
  if (/^test\.ximalaya\.com$/.test(host)) {
    return true
  }
  if (/^\d{0,4}\.\d{0,4}\.\d{0,4}\.\d{0,4}$/.test(host)) {
    return true
  }
  if (/localhost/.test(host)) {
    return true
  }
  return false
}