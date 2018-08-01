import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor (props) {
  	super(props);
  	this.state = {
  		message: ""
  	}
  }

  componentDidMount() {
  	return fetch('api/hello')
  	  .then((response) => response.json())
  	  .then((responseJson) => {
  	  	this.setState({
  	  		message: responseJson.message
  	  	});
  	  })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          Message from our API: <b>{ this.state.message }</b>
        </p>
      </div>
    );
  }
}

export default App;