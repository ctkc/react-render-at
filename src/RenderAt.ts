import ResizeListener from './ResizeListener';
import { Breakpoints } from './types';
import defaultBreakpoints from './utils/defaultBreakpoints';

class RenderAt {
  private static breakpoints = defaultBreakpoints;

  /**
   * Change the default debounce time of 250ms.
   *
   * @param wait
   */
  static setDebounceTime(wait: number): void {
    ResizeListener.setDebounceTime(wait);
  }

  /**
   * Change default breakpoints.
   *
   * @param breakpoints
   */
  static setBreakpoints(breakpoints: Breakpoints): void {
    this.breakpoints = { ...defaultBreakpoints, ...breakpoints };
  }

  /**
   * Returns a CSS query string.
   *
   * @param device
   */
  static queryString(device: keyof Breakpoints): string {
    if (this.breakpoints[device].maxWidth === Infinity) {
      return `screen and (min-width: ${this.breakpoints[device].minWidth}px)`;
    }

    return `screen and (min-width: ${this.breakpoints[device].minWidth}px) and (max-width: ${this.breakpoints[device].maxWidth}px)`;
  }

  /**
   * Returns true if the device screen match with the device specified.
   *
   * @param device
   */
  static isScreenMatchingWith(device: keyof Breakpoints): boolean {
    return window.matchMedia(this.queryString(device)).matches;
  }
}

export default RenderAt;
