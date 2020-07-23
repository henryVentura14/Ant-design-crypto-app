import React, { useEffect, useState } from 'react';
import Error from './Error';
import useCoin from '../hooks/useCoin';
import useCryptoCoin from '../hooks/useCryptoCoin';
import axios from 'axios';


import { Button, Form } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 12,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 12,
    },
};

const FormComponent = ({ saveCoin, saveCryptoCoin }) => {

    // state del listado de criptomonedas
    const [listcrypto, saveCryptos] = useState([]);
    const [error, saverError] = useState(false);

    const COINS = [
        { code: 'ARS', name: 'Argentine Peso' },
        { code: 'COB', name: 'Colombian Peso' },
        { code: 'CLP', name: 'Chilean Peso' },
        { code: 'EUR', name: 'Euro' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'QAR', name: 'Qatari Rial' },        
        { code: 'PEN', name: 'Peruvian (Nuevo) Sol' },
        { code: 'GBP', name: 'Pound sterling' },
        { code: 'CNY', name: 'Renminbi (Yuan) China' },
        { code: 'USD', name: 'United States dollar' },
        { code: 'VEF', name: 'Venezuelan Bolívar' }
    ];

    // Utilizar useMoneda
    const [coins, SelectCoins] = useCoin('Select your coin', '', COINS);

    // utilizar useCriptomoneda
    const [crytoCoin, SelectCryptos] = useCryptoCoin('Select your coin', '', listcrypto);

    // Ejecutar llamado a la API
    useEffect(() => {
        const fetchAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD';
            const result = await axios.get(url);
            saveCryptos(result.data.Data);
        };
        fetchAPI();
    }, []);


    // cuando el usuario hace submit
    const onFinish = values => {
        console.log('Success:', values);
        // validar si ambos campos estan llenos
        if (coins === '' || crytoCoin === '') {
            saverError(true);
            return;
        }

        // pasar los datos al componente principal
        saverError(false);
        saveCoin(coins);
        saveCryptoCoin(crytoCoin);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {error ? <Error message="All fields are required" /> : null}

            <Form.Item {...tailLayout}>
                <SelectCoins />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <SelectCryptos />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                >
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
};

export default FormComponent;