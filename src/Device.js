import ResizeListener from './ResizeListener'

class Device {
  /**
   * @constructor
   */
  constructor () {
    this.resizeListener = new ResizeListener()
    this.resizeListener.onChange(() => { this.update() })
    this.listener = null
  }

  /**
   * Remove instance and resize event.
   */
  unsubscribe () {
    this.resizeListener.removeEventListener()
    this.resizeListener = null
    this.listener = null
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

    this.update()

    return this
  }
}

export default Device
