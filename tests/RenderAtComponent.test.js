import React from 'react'
import RenderAt from '../src/RenderAtComponent'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Desktop from '../src/Desktop'
import Laptop from '../src/Laptop'
import Tablet from '../src/Tablet'
import Mobile from '../src/Mobile'

configure({ adapter: new Adapter() })

describe('When RenderAt does not receive any prop or receive "all"', () => {
  it('it should render the content in all devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 0)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt>Content</RenderAt>
    )

    expect(component.html()).toBe('<div>Content</div>')
  })
})

describe('When RenderAt receive "fragment" prop', () => {
  it('it should render just plain content', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 0)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt fragment>Content</RenderAt>
    )

    expect(component.html()).toBe('Content')
  })
})

describe('When RenderAt receive "mobile" prop', () => {
  it('it should render the content only in mobile devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 0) and (max-width: 767px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt mobile>Content</RenderAt>
    )

    expect(component.html()).toBe('<div>Content</div>')
  })
})

describe('When RenderAt receive "mobile" and "fragment" props', () => {
  it('it should render just plain content only in mobile devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 0) and (max-width: 767px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt mobile fragment>Content</RenderAt>
    )

    expect(component.html()).toBe('Content')
  })
})

describe('When RenderAt receive "tablet" prop', () => {
  it('it should render the content only in tablet devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 768px) and (max-width: 1023px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt tablet>Content</RenderAt>
    )

    expect(component.html()).toBe('<div>Content</div>')
  })
})

describe('When RenderAt receive "tablet" and "fragment" props', () => {
  it('it should render just plain content only in tablet devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 768px) and (max-width: 1023px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt tablet fragment>Content</RenderAt>
    )

    expect(component.html()).toBe('Content')
  })
})

describe('When RenderAt receive "laptop" prop', () => {
  it('it should render the content only in laptop devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 1024px) and (max-width: 1199px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt laptop>Content</RenderAt>
    )

    expect(component.html()).toBe('<div>Content</div>')
  })
})

describe('When RenderAt receive "laptop" and "fragment" props', () => {
  it('it should render just plain content only in laptop devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 1024px) and (max-width: 1199px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt laptop fragment>Content</RenderAt>
    )

    expect(component.html()).toBe('Content')
  })
})

describe('When RenderAt receive "desktop" prop', () => {
  it('it should render the content only in desktop devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 1200px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt desktop>Content</RenderAt>
    )

    expect(component.html()).toBe('<div>Content</div>')
  })
})

describe('When RenderAt receive "desktop" and "fragment" props', () => {
  it('it should render just plain content only in desktop devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 1200px)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const component = mount(
      <RenderAt desktop fragment>Content</RenderAt>
    )

    expect(component.html()).toBe('Content')
  })
})

describe('When component will unmount', () => {
  it('it should not call any remove method if any prop is passed', () => {
    const desktopRemoveSpy = jest.spyOn(Desktop.prototype, 'remove')
    const laptopRemoveSpy = jest.spyOn(Laptop.prototype, 'remove')
    const tabletRemoveSpy = jest.spyOn(Tablet.prototype, 'remove')
    const mobileRemoveSpy = jest.spyOn(Mobile.prototype, 'remove')

    const component = mount(
      <RenderAt>Content</RenderAt>
    )

    component.unmount()

    expect(desktopRemoveSpy).toBeCalledTimes(0)
    expect(laptopRemoveSpy).toBeCalledTimes(0)
    expect(tabletRemoveSpy).toBeCalledTimes(0)
    expect(mobileRemoveSpy).toBeCalledTimes(0)
  })

  it('it should call remove method of every device passed as a prop', () => {
    const desktopRemoveSpy = jest.spyOn(Desktop.prototype, 'remove')
    const laptopRemoveSpy = jest.spyOn(Laptop.prototype, 'remove')
    const tabletRemoveSpy = jest.spyOn(Tablet.prototype, 'remove')
    const mobileRemoveSpy = jest.spyOn(Mobile.prototype, 'remove')

    const component = mount(
      <RenderAt desktop laptop tablet mobile>Content</RenderAt>
    )

    component.unmount()

    expect(desktopRemoveSpy).toBeCalledTimes(1)
    expect(laptopRemoveSpy).toBeCalledTimes(1)
    expect(tabletRemoveSpy).toBeCalledTimes(1)
    expect(mobileRemoveSpy).toBeCalledTimes(1)
  })
})
