import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import redis from 'redis';

class App extends Component {
  constructor(props) {
    super(props);
    this.client = redis.createClient();
    this.client.on_error((e) => console.log('error connecting client', e));
    this.client.set('foo', 'bar');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>A simple redis try out</h2>
          <h3>{this.client.get('foo')}</h3>
        </div>
      </div>
    );
  }
}

export default App;
