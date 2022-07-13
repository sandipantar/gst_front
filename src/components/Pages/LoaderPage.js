import React from 'react';
import { Spinner } from 'react-bootstrap-v5';

const LoaderPage = () => {
    return (
        <div style={{marginTop:'200px'}}>
            <div md={4} className="d-flex justify-content-center align-items-center">
            <span>
                <Spinner className="shadow" animation="border" variant="primary" />
                {/* <Spinner animation="grow" variant="primary" /> */}
            </span>
            </div>
        </div> 
    )
}
export default LoaderPage;