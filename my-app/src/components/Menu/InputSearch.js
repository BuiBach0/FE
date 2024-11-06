
import { AudioOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import Search from 'antd/es/transfer/search'
import React from 'react'
import CreateUser from '../User/CreateUser';
const onSearch = (value, _e, info) => console.log(info?.source, value);
function InputSearch() {
    const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
  return (
    <div>
    <Search
    placeholder="input search text"
    allowClear
    onSearch={onSearch}
    style={{
      width: 200,
      margin: '20px 20px 20px 0px',
    }}
  />
    
    </div>
  )
}

export default InputSearch
