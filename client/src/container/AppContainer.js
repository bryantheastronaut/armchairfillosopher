import React, { Component } from 'react'
import axios from 'axios'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      error: null,
      loading: false
    }
    this.getTimeline = this.getTimeline.bind(this)
  }
  getTimeline() {
    axios
      .get('http://localhost:8181/auth')
      .then(data => {
        console.log('fuck this shit its all borken')
      })
      .catch((err) => {
        if (err) throw err
      })
  }
  render() {
    return (
      <div>
        <a href='http://localhost:8181/auth'>log in with twitter</a>
        <button onClick={ this.getTimeline }>Click me to get shit</button>
      </div>
    )
  }
}

export default AppContainer
