import React from 'react';
import { mount } from 'enzyme';

import { desktop, laptop } from './devices';
import Index from './components/hooks';
import App from './components/hoc/App';

describe('RenderAtContext isDesktop prop test', () => {
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

    const app = mount(<Index />);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = desktop.x;
    window.dispatchEvent(new Event('resize'));

    expect(app.text()).toBe('Is Desktop');
  });
});

describe('RenderAtContext isLaptop prop test', () => {
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

describe('RenderAtContext isTablet prop test', () => {
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

describe('RenderAtContext isMobile prop test', () => {
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
