class ResizeListener {
  /**
   * @constructor
   */
  constructor () {
    this.listener = () => {}

    this.addEventListener()
  }

  /**
   * Attach the resize event to window.
   */
  addEventListener () {
    window.addEventListener('resize', () => { this.debouncedNotify() })
  }

  /**
   * Remove the resize event from window.
   */
  removeEventListener () {
    window.removeEventListener('resize', () => { this.debouncedNotify() })
  }

  /**
   * Debounce wrapper.
   */
  debouncedNotify () {
    this.debounce(this.listener(), 250)
  }

  /**
   * Call a passed function after a certain amount of time.
   *
   * @param func - Function to be called.
   * @param wait - Time to wait until call the function.
   * @returns {function(...[*]=)}
   */
  debounce (func, wait) {
    let timeout
    return () => {
      clearTimeout(timeout)

      timeout = setTimeout(func, wait)
    }
  }

  /**
   * Register a callback that is going
   * to be execute on windows resize event.
   *
   * @param listener
   */
  onChange (listener) {
    this.listener = listener
  }
}

export default ResizeListener
