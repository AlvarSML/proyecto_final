import React, { Component } from 'react';
import Index from './components/index';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
  }
}

export default App;
