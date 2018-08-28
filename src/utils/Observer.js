class Observer {
  constructor() {
    this.handlers = null
  }

  on(event, func) {
    if (!this.handlers) {
      this.handlers = {}
    }
    let handlers = this.handlers[event]
    if (!handlers) {
      handlers = this.handlers[event] = []
    }
    handlers.push(func)
    return this
  }

  off(event, func) {
    if (!this.handlers) {
      return this
    }
    let handlers = this.handlers[event]
    if (handlers) {
      if (func) {
        for (let i = 0; i < handlers.length; i++) {
          if (func === handlers[i]) {
            handlers.splice(i, 1)
          }
        }
      } else {
        handlers = []
      }
    }
  }

  unAll() {
    this.handlers = null;
  }

  emit(event, ...args) {
    if (!this.handlers) {
      return this
    }
    let handlers = this.handlers[event]
    handlers &&
    handlers.forEach(fn => {
      fn(...args)
    })
  }
}

export default Observer