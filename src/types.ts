type Breakpoint = {
  minWidth: number;
  maxWidth: number;
};

export type Breakpoints = {
  desktop: Breakpoint;
  laptop: Breakpoint;
  tablet: Breakpoint;
  mobile: Breakpoint;
};

export type Listener = () => void;

export interface RenderAtProps {
  isDesktop: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
