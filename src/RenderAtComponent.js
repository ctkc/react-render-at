import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Desktop from './Desktop'
import Laptop from './Laptop'
import Tablet from './Tablet'
import Mobile from './Mobile'

class RenderAtComponent extends Component {
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
      isMobile: false,
      isMatching: false
    }
  }

  /**
   *
   */
  componentDidMount () {
    if (this.props.desktop) {
      this.desktop = new Desktop().onChange(isMatching => {
        this.setState({ isDesktop: isMatching }, () => { this.setMatching() })
      })
    }

    if (this.props.laptop) {
      this.laptop = new Laptop().onChange(isMatching => {
        this.setState({ isLaptop: isMatching }, () => { this.setMatching() })
      })
    }

    if (this.props.tablet) {
      this.tablet = new Tablet().onChange(isMatching => {
        this.setState({ isTablet: isMatching }, () => { this.setMatching() })
      })
    }

    if (this.props.mobile) {
      this.mobile = new Mobile().onChange(isMatching => {
        this.setState({ isMobile: isMatching }, () => { this.setMatching() })
      })
    }

    window.dispatchEvent(new Event('resize'))

    this.setMatching()
  }

  componentWillUnmount () {
    const { desktop, laptop, tablet, mobile } = this.props

    if (desktop && this.desktop) {
      this.desktop.unsubscribe()
    }

    if (laptop && this.laptop) {
      this.laptop.unsubscribe()
    }

    if (tablet && this.tablet) {
      this.tablet.unsubscribe()
    }

    if (mobile && this.mobile) {
      this.mobile.unsubscribe()
    }
  }

  setMatching () {
    const { isDesktop, isLaptop, isTablet, isMobile } = this.state

    this.setState({ isMatching: isDesktop || isLaptop || isTablet || isMobile })
  }

  render () {
    if (!this.state.isMatching) {
      return null
    }

    if (this.props.fragment) {
      return <>{this.props.children}</>
    }

    return <div className={this.props.className} style={this.props.style}>{this.props.children}</div>
  }
}

RenderAtComponent.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  desktop: PropTypes.bool,
  fragment: PropTypes.bool,
  laptop: PropTypes.bool,
  mobile: PropTypes.bool,
  style: PropTypes.object,
  tablet: PropTypes.bool
}

export default RenderAtComponent
