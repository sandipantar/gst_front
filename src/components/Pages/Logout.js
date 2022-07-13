import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Headers/Header';
import { logoutAdmin } from "../../crud/common.crud";
// import logggout from '../images/logging-out.gif';
import { Spinner } from 'react-bootstrap-v5';

const Logout = () => {
    const [ redirect, setRedirect ]= useState(false);
    let adminDetails = JSON.parse(localStorage.getItem('admin'));
    logoutAdmin(adminDetails.adminEmail).then((res)=>{
        setRedirect(true);
        localStorage.clear();
    }).catch((err)=>{
        console.log(err);
    });

    if(redirect) {
        return <Navigate to="/" />;
    }
    return(
        <>
        <Header pageName="Logout" />
        <div style={{marginTop:'200px'}}>
            <div md={4} className="d-flex justify-content-center align-items-center">
            <span className="p-2 shadow ">
                <Spinner className="shadow" animation="border" variant="primary" />
                {/* <Spinner animation="grow" variant="primary" /> */}
            </span>
            </div>
        </div>
        </>
    )
}
export default Logout;