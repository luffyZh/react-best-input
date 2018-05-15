import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class BestInput extends Component {
  constructor(props) {
    super(props);
    const {
      style,
      error,
      errMsg,
      addons,
      maxLength,
      charBase,
      timer
    } = props;
    this.state = {
      style,
      error,
      errMsg,
      addons,
      maxLength,
      charBase,
      timer,
      value: props.value ? props.value : '',
      timeout: null
    };
  }
  // check the props is valid
  checkPropsValid = (props) => {
    const {
      style,
      error,
      errMsg,
      addons,
      maxLength,
      charBase,
      timer,
      value
    } = props;
    if (style && typeof style !== 'object') {
      throw Error('The style type of BestInput props is required to be a object type.');
    }
    if (error && typeof error !== 'boolean') {
      throw Error('The error type of BestInput props is required to be a boolean type.');
    }
    if (errMsg && typeof errMsg !== 'string') {
      throw Error('The errMsg type of BestInput props is required to be a string type.');
    }
    if (addons && typeof addons !== 'string') {
      throw Error('The addons type of BestInput props is required to be a string type.');
    }
    if (errMsg && typeof errMsg !== 'string') {
      throw Error('The errMsg type of BestInput props is required to be a string type.');
    }
    if (maxLength && typeof maxLength !== 'number') {
      throw Error('The maxLength type of BestInput props is required to be a number type.');
    }
    if (timer && typeof timer !== 'number') {
      throw Error('The timer type of BestInput props is required to be a number type.');
    }
    if (charBase && typeof charBase !== 'object') {
      throw Error('The charBase type of BestInput props is required to be a object type.');
    }
    if (value && typeof value !== 'string') {
      throw Error('The value type of BestInput props is required to be a string type.');
    }
  }

  // listen input value length change
  getInputValueLengthChange = (targetVal) => {
    const { getLength, charBase } = this.props;
    if (charBase && typeof charBase !== 'object') {
      if (typeof getLength === 'function') {
        getLength && getLength(targetVal.length);
      }
    } else {
      if (typeof getLength === 'function') {
        getLength && getLength(targetVal.length);
      }
    }
  }

  componentDidMount() {
    this.checkPropsValid(this.props);
    this.getInputValueLengthChange(this.state.value);
  }
  componentWillReceiveProps(nextProps) {
    this.checkPropsValid(nextProps);
    const {
      style,
      error,
      errMsg,
      addons,
      maxLength,
      charBase,
      timer,
      value
    } = nextProps;
    const newState = {
      style,
      error,
      errMsg,
      addons,
      maxLength,
      charBase,
      timer,
      value
    }
    this.setState({ newState });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.style !== nextState.style &&
           this.state.error !== nextState.error &&
           this.state.errMsg !== nextState.errMsg &&
           this.state.addons !== nextState.addons &&
           this.state.timer !== nextState.timer &&
           this.state.maxLength !== nextState.maxLength &&
           this.state.charBase !== nextState.charBase &&
           this.state.value !== nextState.value
  }
  // 监听input的变化
  handleChange = (e) => {
    const { onChange } = this.props;
    const targetVal = e.target.value;
    const { timer, timeout } = this.state;
    if (timer && typeof timer === 'number' && timer > 0) {
      // debounce input
      clearTimeout(timeout);
      const timeoutFunc = setTimeout(() => {
        this.setState({ value: targetVal });
        onChange && onChange(e, targetVal);
        this.getInputValueLengthChange(targetVal);
      }, timer);
      this.setState({ timeout: timeoutFunc }, () => (
        timeout
      ));
    } else {
      this.setState({ value: targetVal });
      onChange && onChange(e, targetVal);
      this.getInputValueLengthChange(targetVal);
    }
  }
  render() {
    return (
      <div className='inputContainer'>
        <input
          defaultValue={this.state.value}
          style={this.state.style}
          onChange={this.handleChange}
        />
        <div className='errMsgContainer' style={this.state.style}>
          {
            this.state.error
            ? 
              <span className='errMsgStyle'>{this.state.errMsg}</span>
            : 
              <span className='addonsStyle'>{this.state.addons}</span>
          }
        </div>
      </div>
    )
  }
}
BestInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.bool,
  errMsg: PropTypes.string,
  addons: PropTypes.string,
  maxLength: PropTypes.number,
  charBase: PropTypes.number,
  timer: PropTypes.number,
  value: PropTypes.string
}
export default BestInput;