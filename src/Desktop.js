import Device from './Device'
import { query } from './utils/helpers'

class Desktop extends Device {
  /**
   * Check if the current screen width match with the specified breakpoints
   * and call the listener.
   *
   * @override
   */
  update () {
    this.listener(
      window.matchMedia(query('desktop')).matches
    )
  }
}

export default Desktop
