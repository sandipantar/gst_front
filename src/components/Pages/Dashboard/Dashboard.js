import React from 'react';
// import { Navigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
// import { Card } from 'react-bootstrap-v5';

const Dashboard = () => {
    return(
        <>
        <div id="wrapper">
            <Header pageName="Dashboard" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topnav pageName="Dashboard" />
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>        
        </>
    )
}
export default Dashboard;