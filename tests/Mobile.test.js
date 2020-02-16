import Mobile from '../src/Mobile'

let isMatching
let mobile

beforeAll(() => {
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

afterAll(() => {
  isMatching = null
  mobile.unsubscribe()
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
