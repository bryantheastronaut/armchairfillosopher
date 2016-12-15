import React from 'react';
import { Header } from './Header';
import { app } from '../styles/App.style';

const App = props => {
  return (
    <div>
      <Header />
      { props.children }
    </div>
  );
};

export default App;
