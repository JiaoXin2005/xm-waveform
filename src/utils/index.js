export const style = (el, styles) => {
  for (const key in styles) {
    if (el.style[key] !== styles[key]) {
      el.style[key] = styles[key]
    }
  }
  return el
}