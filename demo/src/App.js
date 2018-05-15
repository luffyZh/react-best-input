import React, { Component } from 'react';
import BestInput from './components/best-input';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      debounceInputValue: '',
      inputLengthValue: 'fdsf',
      inputValueLength: 0,
      debounceInputValueLength: 0
    };
  }

  inputValueChange = (e, value) => {
    console.log(value);
    this.setState({ inputValue: value });
  }

  debounceInputValueChange = (e, value) => {
    console.log(value);
    this.setState({ debounceInputValue: value });
  }

  getInputLength = (length) => {
    console.log(length);
    this.setState({ inputValueLength: length });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Best-Input</h1>
        </header>
        <div style={{ margin: '20px' }}>
          <BestInput
            value={this.state.inputValue}
            style={{ width: '40%' }}
            onChange={this.inputValueChange}
          />
          <br/>
          <div>inputValue:{this.state.inputValue}</div>
        </div>
        <div style={{ margin: '20px' }}>
          <BestInput
            value={this.state.debounceInputValue}
            style={{ width: '40%' }}
            timer={800}
            onChange={this.debounceInputValueChange}
          />
          <br/>
          <div>debounceInputValue:{this.state.debounceInputValue}</div>
        </div>
        <div style={{ margin: '20px' }}>
          <BestInput
            value={this.state.inputLengthValue}
            style={{ width: '40%' }}
            timer={800}
            getLength={this.getInputLength}
          />
          <br/>
          <div>inputValueLength:{this.state.inputValueLength}</div>
        </div>
      </div>
    );
  }
}

export default App;
