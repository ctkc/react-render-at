import React from 'react'
import Desktop from './Desktop'
import Laptop from './Laptop'
import Tablet from './Tablet'
import Mobile from './Mobile'

const RenderAtHOC = Component => {
  return class WrapperComponent extends React.Component {
    constructor () {
      super()

      this.desktop = null
      this.laptop = null
      this.tablet = null
      this.mobile = null

      this.state = {
        isDesktop: false,
        isLaptop: false,
        isTablet: false,
        isMobile: false
      }
    }

    componentDidMount () {
      this.desktop = new Desktop().onChange(isMatching => {
        this.setState({ isDesktop: isMatching })
      })

      this.laptop = new Laptop().onChange(isMatching => {
        this.setState({ isLaptop: isMatching })
      })

      this.tablet = new Tablet().onChange(isMatching => {
        this.setState({ isTablet: isMatching })
      })

      this.mobile = new Mobile().onChange(isMatching => {
        this.setState({ isMobile: isMatching })
      })

      window.dispatchEvent(new Event('resize'))
    }

    componentWillUnmount () {
      this.desktop.remove()
      this.laptop.remove()
      this.tablet.remove()
      this.mobile.remove()
    }

    render () {
      const { isDesktop, isLaptop, isTablet, isMobile } = this.state

      return <Component
        isDesktop={isDesktop}
        isLaptop={isLaptop}
        isTablet={isTablet}
        isMobile={isMobile}
        {...this.props}
      />
    }
  }
}

export default RenderAtHOC
