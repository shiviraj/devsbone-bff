// eslint-disable-next-line max-classes-per-file
class Context {
  constructor() {
    this.context = {}
  }
  
  get(key) {
    return this.context[key]
  }
  
  set(key, value) {
    this.context[key] = value
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Context()
    }
  }
  
  // eslint-disable-next-line class-methods-use-this
  getInstance() {
    return Singleton.instance
  }
}

module.exports = new Singleton().getInstance()
