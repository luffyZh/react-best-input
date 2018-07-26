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
      debounceInputValueLength: 0,
      charLength: 0,
      errorStatus: false,
      inputMaxLength: 10,
      errMsg: '这是错误文本',
      charBase: {
        'zh-cn': 1,
        'eng': 1
      },
      emailTrue: false
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

  getMaxLengthChange = (length) => {
    length > this.state.inputMaxLength
    ? 
      this.setState({ errorStatus: true, errMsg: '长度超过限制' })
    : 
      this.setState({ errorStatus: false, errMsg: '这是错误文本' })
  }

  getCharLengthChange = (length) => {
    console.log(length);
    this.setState({ charLength: length });
  }

  zhcnChange = (e) => {
    const { charBase } = this.state;
    charBase['zh-cn'] = Number(e.target.value);
    this.setState({ charBase });
  }

  engChange = (e) => {
    const { charBase } = this.state;
    charBase['eng'] = Number(e.target.value);
    this.setState({ charBase });
  }

  handleRegExp = (e, value) => {
    console.log(value);
    const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!regEmail.test(value)) {
      this.setState({ emailTrue: true });
    } else {
      this.setState({ emailTrue: false });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React-Best-Input</h1>
        </header>
        <div style={{ margin: '20px' }}>
          <BestInput
            label='普通input'
            value={this.state.inputValue}
            style={{ width: '40%' }}
            onChange={this.inputValueChange}
          />
          <br/>
          <div style={{ margin: '4px 0'}}>inputValue:{this.state.inputValue}</div>
        </div>
        <div style={{ margin: '20px' }}>
          <BestInput
            label='debounce input'
            value={this.state.debounceInputValue}
            style={{ width: '40%' }}
            timer={800}
            onChange={this.debounceInputValueChange}
          />
          <br/>
          <div style={{ margin: '4px 0'}}>debounceInputValue:{this.state.debounceInputValue}</div>
        </div>
        <div style={{ margin: '20px' }}>
          <BestInput
            label='获取长度'
            value={this.state.inputLengthValue}
            style={{ width: '40%' }}
            timer={600}
            getLength={this.getInputLength}
          />
          <br/>
          <div style={{ margin: '4px 0'}}>inputValueLength:{this.state.inputValueLength}</div>
        </div>
        <div style={{ margin: '20px' }}>
          <BestInput
            label='附加属性'
            style={{ width: '40%' }}
            timer={600}
            error={this.state.errorStatus}
            addons='这是说明文本'
            maxLength={this.state.inputMaxLength}
            errMsg={this.state.errMsg}
            placeholder='placeholder'
            getLength={this.getMaxLengthChange}
          />
          <br/>
          <div style={{ margin: '4px 0'}}>
            <button onClick={() => this.setState({ errorStatus: !this.state.errorStatus })}>点我改变error状态</button>
          </div>
        </div>
        <div style={{ margin: '20px' }}>
          <div style={{ textAlign: 'center', margin: '4px auto' }}>
            zh-cn:<input defaultValue={this.state.charBase['zh-cn']} type='number' style={{ width: '5%' }} onChange={this.zhcnChange} />&nbsp;&nbsp;
            eng:<input defaultValue={this.state.charBase['eng']} type='number' style={{ width: '5%' }} onChange={this.engChange} />
          </div>
          <BestInput
            label='重定义字符'
            style={{ width: '40%' }}
            timer={600}
            getLength={this.getCharLengthChange}
            charBase={this.state.charBase}
          />
          <br/>
          <div style={{ margin: '4px 0'}}>charLength:{this.state.charLength}</div>
        </div>
        <div style={{ margin: '20px' }}>
          <BestInput
            label='类型校验'
            style={{ width: '40%' }}
            timer={600}
            error={this.state.emailTrue}
            errMsg='这不是一个合法的邮箱'
            onChange={this.handleRegExp}
          />
        </div><br/><br/>
        <div style={{ margin: '20px' }}>
          <BestInput
            value='我是不可用input'
            label='不可用'
            style={{ width: '40%' }}
            timer={600}
            disabled={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
