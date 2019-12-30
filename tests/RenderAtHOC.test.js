import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './mocks/App'
import Desktop from '../src/Desktop'
import Laptop from '../src/Laptop'
import Tablet from '../src/Tablet'
import Mobile from '../src/Mobile'
import RenderAt from '../src/RenderAtComponent'
configure({ adapter: new Adapter() })

describe('RenderAtHOC isDesktop prop test', () => {
  it('it should render its children components only in desktop', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 1200px)' && window.innerWidth >= 1200,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const app = mount(<App/>)

    window.innerWidth = 1200

    window.dispatchEvent(new Event('resize'))

    expect(app.text()).toBe('Is Desktop')

    window.innerWidth = 768

    window.dispatchEvent(new Event('resize'))

    expect(app.text()).toBe('')
  })
})

describe('RenderAtHOC isLaptop prop test', () => {
  it('it should render its children components only in laptop', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === 'screen and (min-width: 1024px) and (max-width: 1199px)' && window.innerWidth >= 1024 && window.innerWidth <= 1199,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })

    const app = mount(<App/>)

    window.innerWidth = 1024

    window.dispatchEvent(new Event('resize'))

    expect(app.text()).toBe('Is Laptop')

    window.innerWidth = 1200

    window.dispatchEvent(new Event('resize'))

    expect(app.text()).toBe('')
  })
})

describe('When component will unmount', () => {
  it('it should call remove method of every device', () => {
    const desktopRemoveSpy = jest.spyOn(Desktop.prototype, 'remove')
    const laptopRemoveSpy = jest.spyOn(Laptop.prototype, 'remove')
    const tabletRemoveSpy = jest.spyOn(Tablet.prototype, 'remove')
    const mobileRemoveSpy = jest.spyOn(Mobile.prototype, 'remove')

    const component = mount(<App/>)

    component.unmount()

    expect(desktopRemoveSpy).toBeCalledTimes(1)
    expect(laptopRemoveSpy).toBeCalledTimes(1)
    expect(tabletRemoveSpy).toBeCalledTimes(1)
    expect(mobileRemoveSpy).toBeCalledTimes(1)
  })
})
