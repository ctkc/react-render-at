import { debounce } from './utils/helpers';
import { Listener } from './types';

class ResizeListener {
  public listener?: Listener;
  private static debounceTime = 250;

  /**
   * @constructor
   */
  constructor() {
    this.addEventListener();
  }

  /**
   * Change the default debounce time of 250ms.
   *
   * @param wait
   */
  static setDebounceTime(wait: number): void {
    this.debounceTime = wait;
  }

  /**
   * Attach the resize event to window.
   */
  addEventListener(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'resize',
        debounce(
          () => this.listener && this.listener(),
          ResizeListener.debounceTime
        )
      );
    }
  }

  /**
   * Remove the resize event from window.
   */
  removeEventListener(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener(
        'resize',
        debounce(
          () => this.listener && this.listener(),
          ResizeListener.debounceTime
        )
      );
    }
  }

  /**
   * Register a callback that is going
   * to be execute on windows resize event.
   *
   * @param listener {Listener}
   */
  onChange(listener: Listener): void {
    this.listener = listener;

    listener();
  }
}

export default ResizeListener;
