import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import AppContainer from './container/AppContainer'


render(
  <Router history={ hashHistory }>
    <Route path='/' component={ AppContainer } />
    <AppContainer />
  </Router>,
  document.getElementById('root')
)
