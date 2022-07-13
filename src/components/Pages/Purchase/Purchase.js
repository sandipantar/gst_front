import React from 'react';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
// import { Card, Badge,ButtonGroup,Button } from 'react-bootstrap-v5';

const Purchase = () => {
    return(
        <>
        <div id="wrapper">
            <Header pageName="Purchase" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topnav pageName="Purchase Page Entry" />
                    <div className="container-fluid">
                        <h1 className="h3 mb-4 text-gray-800">Purchase</h1>
                    </div>
                </div>
            </div>
        </div>        
        </>
    )
}
export default Purchase;