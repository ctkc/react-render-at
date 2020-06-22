import React, {
  Context,
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import ResizeListener from './ResizeListener';
import { RenderAtProps } from './types';
import RenderAt from './RenderAt';

const Context = createContext<RenderAtProps>({
  isDesktop: false,
  isLaptop: false,
  isTablet: false,
  isMobile: false,
});

export function RenderAtProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [status, setStatus] = useState<RenderAtProps>({
    isDesktop: false,
    isLaptop: false,
    isTablet: false,
    isMobile: false,
  });

  useEffect(() => {
    new ResizeListener().onChange(() => {
      setStatus({
        isDesktop: RenderAt.isScreenMatchingWith('desktop'),
        isLaptop: RenderAt.isScreenMatchingWith('laptop'),
        isTablet: RenderAt.isScreenMatchingWith('tablet'),
        isMobile: RenderAt.isScreenMatchingWith('mobile'),
      });
    });
  }, []);

  return <Context.Provider value={{ ...status }}>{children}</Context.Provider>;
}

/**
 * Returns an object with every device and its status.
 */
export function useRenderAt(): RenderAtProps {
  return useContext<RenderAtProps>(Context);
}
