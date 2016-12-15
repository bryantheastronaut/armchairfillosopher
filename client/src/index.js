import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { AppContainer } from './container/AppContainer';
import { Timeline } from './component/Timeline'

render((
  <Router history={browserHistory}>
    <Route path='/' component={AppContainer}>
      <Route path='/timeline' component={Timeline} />
    </Route>
  </Router>
), document.getElementById('root'));
