import { useFakeTimers, SinonFakeTimers } from 'sinon';
import SpyInstance = jest.SpyInstance;

import ResizeListener from './../src/ResizeListener';
import { debounce } from '../src/utils/helpers';

let resizeListener: ResizeListener;
let clock: SinonFakeTimers;
let windowSpy: SpyInstance;

beforeEach(() => {
  resizeListener = new ResizeListener();
  clock = useFakeTimers();
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  clock.restore();
  windowSpy.mockRestore();
});

describe('When addEventListener method is called', () => {
  const addEventListenerSpy = jest.spyOn(
    ResizeListener.prototype,
    'addEventListener'
  );
  const resizeEventSpy = jest.spyOn(window, 'addEventListener');

  it('it should attach resize event to window', () => {
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(resizeEventSpy).toHaveBeenCalledTimes(1);
  });
});

describe('ResizeListener onChange method test', () => {
  it('it should attach a new listener', () => {
    const functionMock = jest.fn();
    resizeListener.onChange(functionMock);
    expect(resizeListener.listener).toBe(functionMock);
  });
});

describe('ResizeListener debounce method test', () => {
  it('it should call the passed function after a delay', () => {
    const mockedFunction = jest.fn();
    const debounceFn = debounce(mockedFunction, 1000);

    // Call it immediately.
    debounceFn();
    expect(mockedFunction).toHaveBeenCalledTimes(0);

    // Call it several times with 500ms between each call.
    for (let i = 0; i < 10; i++) {
      clock.tick(500);
      debounceFn();
    }
    expect(mockedFunction).toHaveBeenCalledTimes(0);

    // Wait 1000ms
    clock.tick(1000);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});

describe('When removeEventListener is called', () => {
  it('it should remove resize event listener', () => {
    const removeEventListenerSpy = jest.spyOn(
      ResizeListener.prototype,
      'removeEventListener'
    );
    const resizeEventSpy = jest.spyOn(window, 'removeEventListener');

    resizeListener.removeEventListener();

    expect(removeEventListenerSpy).toBeCalledTimes(1);
    expect(resizeEventSpy).toBeCalledTimes(1);
  });
});
