/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    console.log('hola');
    return (
      <div>
        hola
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('react'));
export default App;
