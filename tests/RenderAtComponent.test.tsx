import React from 'react';
import { mount } from 'enzyme';

import RenderAt from '../src/RenderAtComponent';
import ResizeListener from '../src/ResizeListener';
import { desktop, laptop, mobile, tablet } from './devices';

describe('When RenderAt does not receive any prop or receive', () => {
  it('it should not render content', () => {
    const component = mount(<RenderAt>Content</RenderAt>);

    expect(component.text()).toBe('');
  });
});

describe('When "fragment" prop', () => {
  it('it should render the content without wrapper', () => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = mobile.x;
    window.dispatchEvent(new Event('resize'));

    const component = mount(
      <RenderAt mobile fragment>
        Content
      </RenderAt>
    );

    expect(component.html()).toBe('Content');
  });
});

describe('When RenderAt receive "mobile" prop', () => {
  it('it should render the content in mobile resolutions', () => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = mobile.x;

    const component = mount(<RenderAt mobile>Content</RenderAt>);

    expect(component.html()).toBe('<div>Content</div>');
  });
});

describe('When RenderAt receive "tablet" prop', () => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = tablet.x;

    const component = mount(<RenderAt tablet>Content</RenderAt>);

    expect(component.html()).toBe('<div>Content</div>');
  });
});

describe('When RenderAt receive "laptop" prop', () => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = laptop.x;

    const component = mount(<RenderAt laptop>Content</RenderAt>);

    expect(component.html()).toBe('<div>Content</div>');
  });
});

describe('When RenderAt receive "desktop" prop', () => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.innerWidth = desktop.x;

    const component = mount(<RenderAt desktop>Content</RenderAt>);

    expect(component.html()).toBe('<div>Content</div>');
  });
});

describe('When component will unmount', () => {
  it('it should call remove event listener', () => {
    const removeEventListenerSpy = jest.spyOn(
      ResizeListener.prototype,
      'removeEventListener'
    );

    const component = mount(<RenderAt desktop>Content</RenderAt>);

    component.unmount();

    expect(removeEventListenerSpy).toBeCalledTimes(1);
  });
});
