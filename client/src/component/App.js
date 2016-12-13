import React from 'react';
import { Header } from './Header';
import { app } from '../styles/App.style';

const App = props => {
  return (
    <div>
      <Header />
      <div style={ app }>test</div>
    </div>
  );
};

export default App;
