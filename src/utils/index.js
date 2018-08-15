export const style = (el, styles) => {
  for (const key in styles) {
    if (el.style[key] !== styles[key]) {
      el.style[key] = styles[key]
    }
  }
  
  return el
}

export const hex2rgb = hex => {
  const bigint = parseInt(
    hex.charAt(0) === '#' ? hex.substring(1, 7) : hex, 16
  )

  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}
