import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const propTypeObj = {
  style: 'object',
  error: 'boolean',
  errMsg: 'string',
  addons: 'string',
  charBase: 'object',
  timer: 'number',
  label: 'string',
  placeholder: 'string',
  disabled: 'boolean'
}
class BestInput extends Component {
  constructor(props) {
    super(props);
    const {
      style,
      error,
      errMsg,
      addons,
      charBase,
      timer,
      label,
      placeholder,
      disabled
    } = props;
    this.state = {
      style,
      error,
      errMsg,
      addons,
      charBase,
      timer,
      label,
      placeholder,
      disabled,
      value: props.value ? props.value : '',
      timeout: null
    };
  }
  // throw props type error
  throwPropsTypeError = (type, prop) => {
    if (prop && typeof prop !== propTypeObj[type]) {
      throw Error(`The ${type} type of BestInput props is required to be a ${propTypeObj[type]} type.`);
    }
  }
  // check the props is valid
  checkPropsValid = (props) => {
    const {
      style,
      error,
      errMsg,
      addons,
      charBase,
      timer,
      label,
      placeholder,
      disabled,
    } = props;
    const propObj = { style, errMsg, error, addons, charBase, timer, label, placeholder, disabled };
    Object.keys(propObj).forEach((key) => {
      this.throwPropsTypeError(key, propObj[key]);
    })
  }
  // count custom value length
  countCustomValueLength = (targetVal) => {
    const { charBase } = this.state;
    const zhCnArr = targetVal.match(/[\u4e00-\u9fa5]/g);
    const zhCnLen = zhCnArr ? zhCnArr.length : 0;
    const engLen = targetVal.length - zhCnLen;
    const resLen = zhCnLen * charBase['zh-cn'] + engLen * charBase['eng'];
    return resLen;
  }
  // get custom value length
  getCustomValueLength = (targetVal) => {
    const { charBase } = this.state;
    const charBaseInValid = !charBase ||
                          typeof charBase !== 'object' ||
                          !charBase['zh-cn'] ||
                          typeof charBase['zh-cn'] !== 'number' ||
                          !charBase['eng'] ||
                          typeof charBase['eng'] !== 'number';
    return charBaseInValid ? targetVal.length : this.countCustomValueLength(targetVal);
  }
  // listen input value length change
  getInputValueLengthChange = (targetVal) => {
    const { getLength, charBase } = this.props;
    if (charBase && typeof charBase !== 'object') {
      if (typeof getLength === 'function') {
        getLength && getLength(targetVal);
      }
    } else {
      if (typeof getLength === 'function') {
        getLength && getLength(this.getCustomValueLength(targetVal));
      }
    }
  }

  componentDidMount() {
    // initial check the props is valid
    this.checkPropsValid(this.props);
    // if input has a default value, get the value length
    this.getInputValueLengthChange(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    this.checkPropsValid(nextProps);
    const {
      style,
      error,
      errMsg,
      addons,
      charBase,
      timer,
      value,
      label,
      placeholder,
      disabled
    } = nextProps;
    const newState = {
      style,
      error,
      errMsg,
      addons,
      charBase,
      timer,
      value,
      label,
      placeholder,
      disabled
    }
    this.setState({ newState });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.style !== nextProps.style ||
           this.props.error !== nextProps.error ||
           this.props.errMsg !== nextProps.errMsg ||
           this.props.addons !== nextProps.addons ||
           this.props.timer !== nextProps.timer ||
           this.props.maxLength !== nextProps.maxLength ||
           this.props.charBase !== nextProps.charBase ||
           this.props.label !== nextProps.label ||
           this.props.placeholder !== nextProps.placeholder ||
           this.props.disabled !== nextProps.disabled ||
           this.state.value !== nextState.value;
  }
  // listen the change for the input
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
    const {
      error,
      label,
      placeholder,
      style,
      value,
      errMsg,
      addons,
      disabled,
      onBlur,
      onKeyDown,
      onKeyUp,
      onFocus,
    } = this.props;
    return (
      <div className='inputContainer'>
        {
          label && typeof label === 'string'
          ? <label className='labelStyle'>{label}:</label>
          : ''
        }
        <input
          className={error ? 'inputErrorStyle' : ''}
          defaultValue={value}
          style={style}
          placeholder={placeholder}
          disabled={disabled}
          onChange={this.handleChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
        />
        <div className='errMsgContainer' style={style}>
          {
            error
            ? 
              <span className='errMsgStyle'>{errMsg}</span>
            : 
              <span className='addonsStyle'>{addons}</span>
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
  charBase: PropTypes.object,
  timer: PropTypes.number,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
}
export default BestInput;