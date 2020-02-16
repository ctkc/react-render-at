import Desktop from '../src/Desktop'
import ResizeListener from '../src/ResizeListener'

let isMatching
let desktop

beforeAll(() => {
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

afterAll(() => {
  isMatching = null
  desktop.unsubscribe()
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
