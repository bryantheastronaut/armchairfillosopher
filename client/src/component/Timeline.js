import React, { Component } from 'react'

class Timeline extends Component {
  constructor(props) {
    super(props)
  }
  getData(e) {
    e.preventDefault()
    this.onGetTimeline();
    
  }
  render() {
    return (
      <div> TEssting thetimeline
        <h2>{ JSON.stringify(this.props.data) }</h2>
        <p></p>
      </div>
    )
  }
}

export default Timeline
