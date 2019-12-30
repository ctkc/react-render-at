import Tablet from '../src/Tablet'

let isMatching
let tablet

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === 'screen and (min-width: 768px) and (max-width: 1023px)' && window.innerWidth >= 768 && window.innerWidth <= 1023,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  tablet = new Tablet().onChange(value => { isMatching = value })
})

afterEach(() => {
  isMatching = null
})

describe('When onChange method is called', () => {
  it('it should return true only in tablet devices', () => {
    window.innerWidth = 768
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(true)
  })

  it('it should return false in any other device', () => {
    window.innerWidth = 1024
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)

    window.innerWidth = 767
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)
  })
})

describe('When remove method is called', () => {
  it('is should remove ResizeListener instance and unbind resize event', () => {
    const removeSpy = jest.spyOn(Tablet.prototype, 'unsubscribe')

    tablet.unsubscribe()

    expect(removeSpy).toBeCalledTimes(1)
    expect(tablet.resizeListener).toBe(null)
  })
})
