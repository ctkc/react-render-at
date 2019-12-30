import Device from './Device'
import { query } from './utils/helpers'

class Tablet extends Device {
  /**
   * Check if the current screen width match with the specified breakpoints
   * and call the listener.
   */
  update () {
    this.listener(
      window.matchMedia(query('tablet')).matches
    )
  }
}

export default Tablet
