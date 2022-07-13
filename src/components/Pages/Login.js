import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { Form, Card,Row,Col } from "react-bootstrap-v5";
import { fetchAllEmployees, loginEmployee } from "../../crud/employee.crud";

const Login = () => {
        
    const [ adminEmail, setAdminEmail ]= useState('');
    const [ adminPswd, setAdminPswd ]= useState('');
    const [ redirect, setRedirect ]= useState(false);
    const [ clicked, setClicked] = useState(0);
    const [ logerr, setLogerr] = useState(0);
    // const [ erMsg, setErMsg] = useState('');
    
    const handleSubmit=(e) => {
        e.preventDefault();
        setLogerr(0);
        setClicked(1);
        loginEmployee(adminEmail,adminPswd).then((res)=>{
            setRedirect(true);
            const admin = res.data;
            localStorage.setItem('admin', JSON.stringify(admin));
            localStorage.setItem('adminLoggedin', JSON.stringify(true));
        }).catch((err)=>{
            setLogerr(1);
            // setErMsg(err);
        });
    }
    if(redirect) {
        return <Navigate to="/dashboard" />;
    }
    return (           
        <Row>
            <Col md={12} className="d-flex justify-content-center align-items-center">
                <Card md={5} className="mx-auto mt-5">
                    {logerr? (
                        <Card.Header className="bg-danger text-white"><h3 className="text-center">Wrong Credentials</h3></Card.Header>
                    ):(
                        <Card.Header className="bg-dark text-white"><h3 className="text-center">{clicked ? 'Loading...' : 'Welcome Back'}</h3></Card.Header>
                    )}
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formCompanyName">
                                <Form.Label>Name</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Cash</option>
                                    <option value="2">Card</option>
                                    <option value="3">Online</option>
                                </Form.Select>
                                {/* <Form.Select 
                                    type="text" 
                                    value={adminEmail} required
                                    onChange={(e)=>{setAdminEmail(e.target.value)}}  
                                    placeholder="Enter Email" autoFocus/>   */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formModel">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={adminPswd} required
                                    onChange={(e)=>{setAdminPswd(e.target.value)}}  
                                    placeholder="Enter Password" />  
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formJsonData">
                                <button className="btn btn-info btn-sm col-12" type="submit">Login</button> 
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );

};

export default Login;
