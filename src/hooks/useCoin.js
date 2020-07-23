import React, { useState } from 'react'
import { Select } from 'antd'

const { Option } = Select

const useCoin = (label, initialState, options) => {
  const [state, updateState] = useState(initialState)

  const onChange = value => {
    updateState(value)
  }

  const SelectCoin = () => (
    <Select
      label={label}
      value={state}
      placeholder='Select'
      onChange={onChange}
      showSearch
      optionFilterProp='children'
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value=''>Select Coin</Option>

      {options.map(option => (
        <Option key={option.code} value={option.code}>
          {option.name}
        </Option>
      ))}
    </Select>
  )

  // Retornar state, interfaz y fn que modifica el state
  return [state, SelectCoin, updateState]
}

export default useCoin
