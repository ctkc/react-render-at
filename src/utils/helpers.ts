import { Listener } from '../types';

export const debounce = (callback: Listener, wait: number): (() => void) => {
  let timeout: number;
  return function () {
    clearTimeout(timeout);

    timeout = window.setTimeout(callback, wait);
  };
};
