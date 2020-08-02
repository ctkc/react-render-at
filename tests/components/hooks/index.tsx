import React, { FC, ReactElement } from 'react';
import { RenderAtProvider, useRenderAt } from '../../../src';

const Page: FC = () => {
  const { isDesktop, isLaptop, isTablet, isMobile } = useRenderAt();

  if (isDesktop) {
    return <p>Is Desktop</p>;
  }

  if (isLaptop) {
    return <p>Is Laptop</p>;
  }

  if (isTablet) {
    return <p>Is Tablet</p>;
  }

  if (isMobile) {
    return <p>Is Mobile</p>;
  }

  return <p>Not Matching</p>;
};

const App = () => {
  return <Page />;
};

export default function Index(): ReactElement {
  return (
    <RenderAtProvider>
      <App />
    </RenderAtProvider>
  );
}
