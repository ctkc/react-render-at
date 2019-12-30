import Mobile from '../src/Mobile'

let isMatching
let mobile

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === 'screen and (min-width: 0) and (max-width: 767px)' && window.innerWidth <= 767,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })

  mobile = new Mobile().onChange(value => { isMatching = value })
})

afterEach(() => {
  isMatching = null
})

describe('When onChange method is called', () => {
  it('it should return true only in mobile devices', () => {
    window.innerWidth = 767
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(true)
  })

  it('it should return false in any other device', () => {
    window.innerWidth = 768
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)

    window.innerWidth = 1024
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)
  })
})

describe('When remove method is called', () => {
  it('is should remove ResizeListener instance and unbind resize event', () => {
    const removeSpy = jest.spyOn(Mobile.prototype, 'unsubscribe')

    mobile.unsubscribe()

    expect(removeSpy).toBeCalledTimes(1)
    expect(mobile.resizeListener).toBe(null)
  })
})
