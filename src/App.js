import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormComponent from './components/FormComponent'
import Quotation from './components/Quotation'
import Spinner from './components/Spinner'
import './styles/App.less'
import { Layout, Space, Divider, Typography, Form } from 'antd'
const { Content } = Layout
const { Title } = Typography

const App = () => {
  const [coin, saveCoin] = useState('')
  const [cryptocoin, saveCryptoCoin] = useState('')
  const [result, saveResult] = useState({})
  const [loading, saveLoading] = useState(false)

  useEffect(() => {
    const quoteCoin = async () => {
      // evitamos la ejecución la primera vez
      if (coin === '' || cryptocoin === '') return

      // consultar la api para obtener la contizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocoin}&tsyms=${coin}`

      const result = await axios.get(url)

      // mostrar el spinner
      saveLoading(true)

      // ocultar el spinner y mostrar el result
      setTimeout(() => {
        // cambiar el estado de loading
        saveLoading(false)
        saveResult(result.data.DISPLAY[cryptocoin][coin])
      }, 3000)
    }

    quoteCoin()
  }, [coin, cryptocoin])

  // Mostrar spinner o result
  const component = loading ? <Spinner /> : <Quotation result={result} />

  return (
    <Content
      className='site-layout-background'
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <section style={{ textAlign: 'center', marginTop: 48, marginBottom: 40 }}>
        <Space align='start'>
          <Title level={2} style={{ marginBottom: 0 }}>
            Quote Cryptocurrencies Instantly
          </Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 60 }}>Search and select</Divider>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <FormComponent saveCoin={saveCoin} saveCryptoCoin={saveCryptoCoin} />
      </Form>
      {component}
    </Content>
  )
}

export default App
