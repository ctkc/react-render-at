import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RenderAt from '../../src/RenderAtHOC'

class Page extends Component {
  render () {
    return (
      <div className='app'>
        <p>
          {
            this.props.isDesktop
              ? 'Is Desktop'
              : null
          }
          {
            this.props.isLaptop
              ? 'Is Laptop'
              : null
          }
          {
            this.props.isTablet
              ? 'Is Tablet'
              : null
          }
          {
            this.props.isMobile
              ? 'Is Mobile'
              : null
          }
        </p>
      </div>
    )
  }
}

Page.propTypes = {
  isDesktop: PropTypes.bool,
  isLaptop: PropTypes.bool,
  isTablet: PropTypes.bool,
  isMobile: PropTypes.bool
}

export default RenderAt(Page)
