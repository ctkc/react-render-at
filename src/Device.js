import ResizeListener from './ResizeListener'

class Device {
  /**
   * @constructor
   */
  constructor () {
    this.listener = () => {}
    this.resizeListener = null

    this.init()
  }

  /**
   * Create instance and listen resize event.
   */
  init () {
    this.resizeListener = new ResizeListener()
    this.resizeListener.onChange(() => { this.update() })
  }

  /**
   * Remove instance and resize event.
   */
  remove () {
    this.resizeListener.removeEventListener()
    this.resizeListener = null
  }

  /**
   * Check if the current screen width match with the specified breakpoints
   * and call the listener.
   */
  update () {}

  /**
   * Register a listener.
   *
   * @param {callback} listener
   */
  onChange (listener) {
    this.listener = listener

    return this
  }
}

export default Device
