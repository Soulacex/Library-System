import React, { Component } from 'react';
import './App.css';
import Books from './Books';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="startInfo">
              <h1 className='Title'> Library </h1>
              <h3 className='Sub-Title'> Behold, the great literature of the world! </h3>
          </div>
        <Books />
      </div>
    );
  }
}

export default App;
