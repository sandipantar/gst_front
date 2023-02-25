import React from 'react';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
// import { Card, Badge,ButtonGroup,Button } from 'react-bootstrap-v5';

const DeliveryOrder = () => {
  return (
    <>
    <div id="wrapper">
        <Header pageName="DeliveryOrder" />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Topnav pageName="Delivery Order" />
                <div className="container-fluid">
                    <h1 className="h3 mb-4 text-gray-800">Delivery Order</h1>
                </div>
            </div>
        </div>
    </div>        
    </>
  )
}

export default DeliveryOrder