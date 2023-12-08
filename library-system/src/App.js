import React, { Component } from 'react';
import './App.css';
import Books from './Books';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="startInfo">
              <h1> Library </h1>
          </div>
        <Books />
      </div>
    );
  }
}

export default App;
