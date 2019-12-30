import Device from './Device'
import { query } from './utils/helpers'

class Mobile extends Device {
  /**
   * Check if the current screen width match with the specified breakpoints
   * and call the listener.
   */
  update () {
    this.listener(
      window.matchMedia(query('mobile')).matches
    )
  }
}

export default Mobile
