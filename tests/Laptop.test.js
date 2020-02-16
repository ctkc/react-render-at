import Laptop from '../src/Laptop'

let isMatching
let laptop

beforeAll(() => {
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

  laptop = new Laptop().onChange(value => { isMatching = value })
})

afterAll(() => {
  isMatching = null
  laptop.unsubscribe()
})

describe('When onChange method is called', () => {
  it('it should return true only in laptop devices', () => {
    window.innerWidth = 1024
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(true)
  })

  it('it should return false in any other device', () => {
    window.innerWidth = 1023
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)

    window.innerWidth = 1200
    window.dispatchEvent(new Event('resize'))

    expect(isMatching).toBe(false)
  })
})
