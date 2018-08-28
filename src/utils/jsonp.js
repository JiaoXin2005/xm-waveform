const removeFun = () => {
  delete window.wave
}

const removeScript = (script) => {
  script && document.body.removeChild(script)
}

const jsonp = (url) => {

  return new Promise((resolve, reject) => {
    let timeId = null
    let wave = {
      draw: (id, data) => {
        resolve({id, data})
        timeId = setTimeout(() => {
          removeScript(script)
          removeFun()
        }, 1000);
      }
    }
    window.wave = wave
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    script.onerror = () => {
      reject(new Error(`fetch ${url} error`))
      removeScript(script)
      removeFun()
      timeId && clearTimeout(timeId)
    }
  })
}

export default jsonp