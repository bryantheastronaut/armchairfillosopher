import React, { Component } from 'react'
import axios from 'axios'

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      error: null,
      loading: false,
      isLoggedIn: false
    }
    this.getTimeline = this.getTimeline.bind(this);
  }
  getTimeline(timeline) {
    this.setState({ loading: true })
    axios
      .get('http://localhost:8181/timeline.json')
      .then(data => {
        console.log(data)
        this.setState({
          data: data
        })
      })
  }

  render() {
    let propsWithChildren = React.Children.map(this.props.children, child => {
      if (child.type.name === 'Timeline')
        return React.cloneElement(child, {
          data: this.state.data,
          onGetTimeline: this.getTimeline()
        })
      else return child
    })
    return (
      <div>
        <a href='http://localhost:8181/auth'>log in with twitter</a>
        { propsWithChildren }
      </div>
    )
  }
}

export default AppContainer
