import React, { Component } from 'react';
import Page from './Page';

class App extends Component {
  public pageRef;

  constructor(props: Record<string, unknown>) {
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
