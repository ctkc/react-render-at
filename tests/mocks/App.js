import React from 'react'
import Page from './Page'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.pageRef = null
  }

  render () {
    return <Page ref={ref => { this.pageRef = ref }}/>
  }
}

export default App
