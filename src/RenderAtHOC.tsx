import React, {
  ComponentType,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useState,
} from 'react';

import ResizeListener from './ResizeListener';
import RenderAt from './RenderAt';
import { RenderAtProps } from './types';

export type InjectedRenderAtProps = Partial<RenderAtProps>;

export default function withRenderAt<P>(
  WrappedComponent: ComponentType<P>
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<unknown>> {
  const fn = forwardRef<unknown, P>((props, ref) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const resizeListener = new ResizeListener();

      resizeListener.onChange(() => {
        setIsDesktop(RenderAt.isScreenMatchingWith('desktop'));
        setIsLaptop(RenderAt.isScreenMatchingWith('laptop'));
        setIsTablet(RenderAt.isScreenMatchingWith('tablet'));
        setIsMobile(RenderAt.isScreenMatchingWith('mobile'));
      });

      return () => {
        resizeListener.removeEventListener();
      };
    }, []);

    return (
      <WrappedComponent
        ref={ref}
        isDesktop={isDesktop}
        isLaptop={isLaptop}
        isTablet={isTablet}
        isMobile={isMobile}
        {...(props as P)}
      />
    );
  });

  const name = WrappedComponent.displayName || WrappedComponent.name;
  fn.displayName = `withRenderAt(${name})`;

  return fn;
}
