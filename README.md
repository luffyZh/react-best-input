# react-best-input
A simple and best input component for react.

### Example
```
git clone https://github.com/luffyZh/react-best-input.git
cd demo
yarn install
yarn start
```
### How To Use
```
yarn add react-best-input || npm install react-best-input --save
// in the components
import BestInput from 'react-best-input'
...
<BestInput />
```
### Props
  - value: [string], The BestInput value.
  - placeholder: [string].
  - label: [string]. Automatically add prefixes label.
  - timer: [number]. Add the debounce function for BestInput.
  - error: [boolean]. Automatically add error status.
  - errMsg: [string]. Automatically add errMsg under the input.
  - addons: [string]. Automatically add hint info under the input.
  - charBase: [object]. You can custom the char base length, default `{ 'zh-cn': 1, 'eng': 1 }`
  - onChange(e, value): [Function]. BestInput onChange function.
  - getLength(length): [Function]. Get the BestInput's custom value length.
  - ...Others. Follow-up development. 
