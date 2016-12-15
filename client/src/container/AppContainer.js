import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import App from '../component/App';
import { DATA } from '../DATA';

export class AppContainer extends Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.name === 'Timeline') {
        return React.cloneElement(child, {
            onGetTimeline: getTimeline
        })
      } else {
        return child
      }
    })
    return (
      <div>
        <App />
        { childrenWithProps }
      </div>
    );
  }
}
