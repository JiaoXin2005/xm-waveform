const removeFun = () => {
  delete window.wave
}

const removeScript = (script) => {
  script && document.body.removeChild(script)
}

const jsonp = (url) => {

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    let wave = {
      draw: (id, data) => {
        resolve({id, data})
        removeScript(script)
        removeFun()
      }
    }
    window.wave = wave
    script.src = url
    document.body.appendChild(script)
    script.onerror = () => {
      reject(new Error(`fetch ${url} error`))
      removeScript(script)
      removeFun()
    }
  })
}

export default jsonp