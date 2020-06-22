import React from 'react';
import { mount } from 'enzyme';

import App from './mocks/App';
import Page from './mocks/Page';
import ResizeListener from '../src/ResizeListener';
import { desktop, laptop } from './devices';

describe('RenderAtHOC isDesktop prop test', () => {
  it('it should render the content in desktop resolutions', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === 'screen and (min-width: 1200px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const app = mount(<App />);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = desktop.x;
    window.dispatchEvent(new Event('resize'));

    expect(app.text()).toBe('Is Desktop');
  });
});

describe('RenderAtHOC isLaptop prop test', () => {
  it('it should render the content in laptop resolutions', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches:
          query === 'screen and (min-width: 1024px) and (max-width: 1199px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const app = mount(<App />);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = laptop.x;
    window.dispatchEvent(new Event('resize'));

    expect(app.text()).toBe('Is Laptop');
  });
});

describe('RenderAtHOC isTablet prop test', () => {
  it('it should render the content in tablet resolutions', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches:
          query === 'screen and (min-width: 768px) and (max-width: 1023px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const app = mount(<App />);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = laptop.x;
    window.dispatchEvent(new Event('resize'));

    expect(app.text()).toBe('Is Tablet');
  });
});

describe('RenderAtHOC isMobile prop test', () => {
  it('it should render the content in moible resolutions', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === 'screen and (min-width: 0px) and (max-width: 767px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const app = mount(<App />);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = laptop.x;
    window.dispatchEvent(new Event('resize'));

    expect(app.text()).toBe('Is Mobile');
  });
});

describe('When component will unmount', () => {
  it('it should call remove event listener', () => {
    const deviceRemoveSpy = jest.spyOn(
      ResizeListener.prototype,
      'removeEventListener'
    );

    const component = mount(<App />);

    component.unmount();

    expect(deviceRemoveSpy).toBeCalledTimes(1);
  });
});

describe('When ref is passed', () => {
  it('it should return the child component ref', () => {
    const component = mount(<App />);

    expect(component.find(Page)).toHaveLength(1);
    expect(component.instance().pageRef.dummyMethod()).toBe(true);
  });
});
