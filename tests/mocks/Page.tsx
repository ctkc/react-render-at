import React, { Component } from 'react';
import withRenderAt, { InjectedRenderAtProps } from '../../src/RenderAtHOC';

class Page extends Component<InjectedRenderAtProps> {
  dummyMethod(): boolean {
    return true;
  }

  render(): JSX.Element {
    return (
      <div className="app">
        <p>
          {this.props.isDesktop && 'Is Desktop'}
          {this.props.isLaptop && 'Is Laptop'}
          {this.props.isTablet && 'Is Tablet'}
          {this.props.isMobile && 'Is Mobile'}
        </p>
      </div>
    );
  }
}

export default withRenderAt(Page);
