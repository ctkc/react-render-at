import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import ResizeListener from './ResizeListener';
import RenderAt from './RenderAt';

type Props = {
  fragment?: boolean;
  desktop?: boolean;
  laptop?: boolean;
  tablet?: boolean;
  mobile?: boolean;
};

const RenderAtComponent = ({
  desktop,
  laptop,
  tablet,
  mobile,
  fragment,
  children,
  ...props
}: PropsWithChildren<Props>): ReactElement | null => {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    let isDesktop = false,
      isLaptop = false,
      isMobile = false,
      isTablet = false;

    const resizeListener = new ResizeListener();

    resizeListener.onChange(() => {
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

      setIsMatching(isDesktop || isLaptop || isTablet || isMobile);
    });

    return () => {
      resizeListener.removeEventListener();
    };
  }, [desktop, laptop, mobile, tablet]);

  if (!isMatching) {
    return null;
  }

  if (fragment) {
    return <>{children}</>;
  }

  return <div {...props}>{children}</div>;
};

RenderAtComponent.propTypes = {
  fragment: PropTypes.bool,
  desktop: PropTypes.bool,
  laptop: PropTypes.bool,
  tablet: PropTypes.bool,
  mobile: PropTypes.bool,
  children: PropTypes.any,
};

export default RenderAtComponent;
