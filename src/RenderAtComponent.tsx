import React, { Component, ReactElement } from 'react';
import ResizeListener from './ResizeListener';
import RenderAt from './RenderAt';

interface Props {
  fragment?: boolean;
  desktop?: boolean;
  laptop?: boolean;
  tablet?: boolean;
  mobile?: boolean;
}

interface State {
  isMatching: boolean;
}

class RenderAtComponent extends Component<Props, State> {
  private resizeListener: ResizeListener;
  /**
   * @constructor
   * @param props
   */
  constructor(props: Props) {
    super(props);

    this.resizeListener = new ResizeListener();

    this.state = {
      isMatching: false,
    };
  }

  /**
   * Subscribe to resize event for every device.
   */
  componentDidMount(): void {
    const { desktop, laptop, tablet, mobile } = this.props;
    let isDesktop = false;
    let isLaptop = false;
    let isTablet = false;
    let isMobile = false;

    this.resizeListener.onChange(() => {
      if (desktop) {
        isDesktop = RenderAt.isScreenMatchingWith('desktop');
      }

      if (laptop) {
        isLaptop = RenderAt.isScreenMatchingWith('laptop');
      }

      if (tablet) {
        isTablet = RenderAt.isScreenMatchingWith('tablet');
      }

      if (mobile) {
        isMobile = RenderAt.isScreenMatchingWith('mobile');
      }

      this.setState({
        isMatching: isDesktop || isLaptop || isTablet || isMobile,
      });
    });
  }

  /**
   * Unsubscribe from resize event.
   */
  componentWillUnmount(): void {
    this.resizeListener.removeEventListener();
  }

  render(): ReactElement | null {
    // Removing props.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { desktop, laptop, tablet, mobile, ...props } = this.props;

    if (!this.state.isMatching) {
      return null;
    }

    if (this.props.fragment) {
      return <>{this.props.children}</>;
    }

    return <div {...props}>{this.props.children}</div>;
  }
}

export default RenderAtComponent;
