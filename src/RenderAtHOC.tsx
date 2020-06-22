import React, {
  Component,
  ComponentType,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  Ref,
  RefAttributes,
} from 'react';
import ResizeListener from './ResizeListener';
import RenderAt from './RenderAt';
import { RenderAtProps } from './types';

export type InjectedRenderAtProps = Partial<RenderAtProps>;

export default function withRenderAt<P>(
  WrappedComponent: ComponentType<P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<any>> {
  class WithRenderAtContainer extends Component<
    P & { forwardRef: Ref<WithRenderAtContainer> },
    RenderAtProps
  > {
    private resizeListener: ResizeListener;

    constructor(props: P & { forwardRef: Ref<WithRenderAtContainer> }) {
      super(props);

      this.resizeListener = new ResizeListener();
      this.state = {
        isDesktop: false,
        isLaptop: false,
        isTablet: false,
        isMobile: false,
      };
    }

    /**
     * Subscribe to resize event in every device.
     */
    componentDidMount() {
      this.resizeListener.onChange(() => {
        const isDesktop = RenderAt.isScreenMatchingWith('desktop');
        const isLaptop = RenderAt.isScreenMatchingWith('laptop');
        const isTablet = RenderAt.isScreenMatchingWith('tablet');
        const isMobile = RenderAt.isScreenMatchingWith('mobile');

        this.setState({
          isDesktop,
          isLaptop,
          isTablet,
          isMobile,
        });
      });
    }

    /**
     * Unsubscribe from resize event.
     */
    componentWillUnmount() {
      this.resizeListener.removeEventListener();
    }

    render() {
      const { isDesktop, isLaptop, isTablet, isMobile } = this.state;

      return (
        <WrappedComponent
          ref={this.props.forwardRef}
          isDesktop={isDesktop}
          isLaptop={isLaptop}
          isTablet={isTablet}
          isMobile={isMobile}
          {...(this.props as P)}
        />
      );
    }
  }

  const WithRef = forwardRef<WithRenderAtContainer, P>((props, ref) => (
    <WithRenderAtContainer forwardRef={ref} {...props} />
  ));

  const name = WrappedComponent.displayName || WrappedComponent.name;
  WithRef.displayName = `withRenderAt(${name})`;

  return WithRef;
}
