import Desktop from '../src/Desktop'

let isMatching
let desktop

beforeEach(() => {
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

  desktop = new Desktop().onChange(value => { isMatching = value })
})

afterEach(() => {
  isMatching = null
})

describe('When onChange method is called', () => {
  it('it should return true only in mobile devices', () => {
    window.innerWidth = 1201
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(true)
  })

  it('it should return false in any other device', () => {
    window.innerWidth = 768
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)

    window.innerWidth = 1199
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)
  })
})

describe('When remove method is called', () => {
  it('is should remove ResizeListener instance and unbind resize event', () => {
    const desktopSpy = jest.spyOn(Desktop.prototype, 'remove')

    desktop.remove()

    expect(desktopSpy).toBeCalledTimes(1)
    expect(desktop.resizeListener).toBe(null)
  })
})
