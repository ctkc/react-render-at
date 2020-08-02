import React, { Component, PropsWithChildren } from 'react';
import Page from './Page';

class App extends Component {
  public pageRef: unknown;

  constructor(props: PropsWithChildren<any>) {
    super(props);
    this.pageRef = null;
  }

  render(): JSX.Element {
    return (
      <Page
        ref={(ref) => {
          this.pageRef = ref;
        }}
      />
    );
  }
}

export default App;
