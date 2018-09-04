import Observer from './Observer'
window.wave = new Observer()
wave.draw = function (id, data) {
  this.emit('getData', {id, data})
}

const removeFun = () => {
  delete window.wave
}

const removeScript = (script) => {
  script && document.body.removeChild(script)
}

const jsonp = (url) => {

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    let handleFn = ({ id, data }) => {
      window.wave.off('getData', handleFn)
      removeScript(script)
      resolve({ id, data })
    }
    window.wave.on('getData', handleFn)

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