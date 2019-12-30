import Device from './Device'
import { query } from './utils/helpers'

class Laptop extends Device {
  /**
   * Check if the current screen width match with the specified breakpoints
   * and call the listener.
   */
  update () {
    this.listener(
      window.matchMedia(query('laptop')).matches
    )
  }
}

export default Laptop
