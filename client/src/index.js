import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { AppContainer } from './container/AppContainer';

render((
  <Router history={ browserHistory }>
    <Route path='/' component={ AppContainer } />
  </Router>
), document.getElementById('root'));
