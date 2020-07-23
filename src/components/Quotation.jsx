import React from 'react';
import { Card } from 'antd';
import { Row, Col } from 'antd';


const Quotation = ({ result }) => {
    if (Object.keys(result).length === 0) return null;
    console.log(result)
    return (
        <React.Fragment>
            <Row
                className="site-card-border-less-wrapper">
                <Col
                    span={5} offset={6}
                >
                    <Card
                        title="Result"
                        bordered={true}
                    >
                        <p> The price is: <span> {result.PRICE} </span></p>
                        <p> Highest price of the day: <span> {result.HIGHDAY} </span></p>
                        <p> Lowest price of the day: <span> {result.LOWDAY} </span></p>
                        <p> Variation last 24 hours: <span> {result.CHANGEPCT24HOUR} </span></p>
                        <p> Last Update: <span> {result.LASTUPDATE} </span></p>
                    </Card>
                </Col>
                <Col
                    span={5}
                    offset={2}
                >
                    <Card
                        title="Logo"
                        bordered={true}
                    >   <div className="content-image">
                        <img className="image" src={"https://www.cryptocompare.com" + result.IMAGEURL} alt="Symbol" />
                        </div>
                    </Card>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default Quotation;




/**
 *
 *        <div>
            <p> The price is: <span> {result.PRICE} </span></p>
            <p> Highest price of the day: <span> {result.HIGHDAY} </span></p>
            <p> Lowest price of the day: <span> {result.LOWDAY} </span></p>
            <p> Variation last 24 hours: <span> {result.CHANGEPCT24HOUR} </span></p>
            <p> Last Update: <span> {result.LASTUPDATE} </span></p>
        </div>
 */