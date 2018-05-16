# react-best-input
简易的、方便的、功能较为齐全的react input组件.

### Demo示例
```
git clone https://github.com/luffyZh/react-best-input.git
cd demo
yarn install
yarn start
```
### 如何使用
```
yarn add react-best-input || npm install react-best-input --save

// 在组件内部通过import引用。
import BestInput from 'react-best-input'
...
<BestInput />
```
### 可用属性
  - 继承普通input的常用属性value、placeholder等，陆续会不断增加。
  - label: [string]. 自动为input前面增加label标签，按需使用.
  - timer: [number]. Debounce input的输入，按需使用.
  - error: [boolean]. 自动增加错误以及错误信息，布尔类型，按需使用.
  - errMsg: [string]. 与error属性配套，显示错误信息，按需使用.
  - addons: [string]. 自动在input框下方增加hint提示，按需使用.
  - charBase: [object]. 可以自定义字符长度,与getLength属性配合使用, 默认 { 'zh-cn': 1, 'eng': 1 }
  - onChange(e, value): [Function]. input值变化时回调函数.
  - getLength(length): [Function]. 获取自定义的输入长度,原本的长度可以通过onChange的value.length获取.
  - ...Others. 后续开发中. 

