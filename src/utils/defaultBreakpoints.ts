import { Breakpoints } from '../types';

export default {
  desktop: { minWidth: 1200, maxWidth: Infinity },
  laptop: { minWidth: 1024, maxWidth: 1199 },
  tablet: { minWidth: 768, maxWidth: 1023 },
  mobile: { minWidth: 0, maxWidth: 767 },
} as Breakpoints;
