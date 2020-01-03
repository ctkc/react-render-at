import React from 'react'
import PropTypes from 'prop-types'
import Desktop from './Desktop'
import Laptop from './Laptop'
import Tablet from './Tablet'
import Mobile from './Mobile'

const RenderAtHOC = Component => {
  class WrappedComponent extends React.Component {
    /**
     * @constructor
     * @param props
     */
    constructor (props) {
      super(props)

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

    /**
     * Subscribe to resize event in every device.
     */
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
    }

    /**
     * Unsubscribe from every device.
     */
    componentWillUnmount () {
      this.desktop.unsubscribe()
      this.laptop.unsubscribe()
      this.tablet.unsubscribe()
      this.mobile.unsubscribe()
    }

    render () {
      const { isDesktop, isLaptop, isTablet, isMobile } = this.state

      return <Component
        ref={this.props.forwardedRef}
        isDesktop={isDesktop}
        isLaptop={isLaptop}
        isTablet={isTablet}
        isMobile={isMobile}
        {...this.props}
      />
    }
  }

  WrappedComponent.propTypes = {
    forwardedRef: PropTypes.any
  }

  function forwardRef (props, ref) {
    return <WrappedComponent {...props} forwardedRef={ref} />
  }

  // Better name for DevTools.
  const name = Component.displayName || Component.name
  forwardRef.displayName = `WrappedComponent(${name})`

  return React.forwardRef(forwardRef)
}

export default RenderAtHOC
