import React, { useState } from 'react'
import { Select } from 'antd'

const { Option } = Select

const useCryptoCoin = (label, initialState, options) => {
  const [state, updateState] = useState(initialState)

  const onChange = value => {
    updateState(value)
  }
  const SelectCrypto = () => (
    <Select
      label={label}
      value={state}
      placeholder='Select'
      onChange={onChange}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
      <Option value=''>Select Crypto</Option>
      {options.map(option => (
        <Option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
          {option.CoinInfo.FullName}
        </Option>
      ))}
    </Select>
  )

  // Retornar state, interfaz y fn que modifica el state
  return [state, SelectCrypto, updateState]
}

export default useCryptoCoin
