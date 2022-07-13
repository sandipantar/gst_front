import React,{ useRef, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
import { Card,Row,Col,Form,Button,Tabs,Tab,Table,Badge,Modal } from 'react-bootstrap-v5';

const Report = () => {
    // let value ="Sale";
    // const purchase = () => {
    //     let value="Sale";
    //     console.log(purchase);
    //   }
    const [value, setValue] = useState("Purchase");
    console.log(value);
    const today = new Date();
    const futureDate = today.getDate();
    today.setDate(futureDate);
    const datee = today.toLocaleDateString('en-CA');
    return(
        <>
        <div id="wrapper">
            <Header pageName="Report" />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topnav pageName="Report Page" />
                    <div className="container-fluid"> 
                        <Row className="d-flex justify-content-between">
                                <Col md={6}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                        <Form.Label>Search</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={3} className="px-4">
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Sort By</Form.Label>

                                            <Form.Control type="date" defaultValue={datee}/>
                                        </Form.Group>
                                </Col>
                                <Col md={3} className="px-4">
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>To</Form.Label>

                                            <Form.Control type="date" defaultValue={datee}/>
                                        </Form.Group>
                                </Col>
                        </Row>
                        <Row className="d-flex justify-content-between">
                                <Col md={8}>
                                <Form.Check
                                    inline
                                    label="Barcode"
                                    name="group1"
                                    type="radio"
                                    id="barcode"
                                />
                                <Form.Check
                                    inline
                                    label="Product"
                                    name="group1"
                                    type="radio"
                                    id="product"
                                />
                                <Form.Check
                                    inline
                                    label="Group"
                                    name="group1"
                                    type="radio"
                                    id="group"
                                />
                                <Form.Check
                                    inline
                                    label="Catagory"
                                    name="group1"
                                    type="radio"
                                    id="catagory"
                                />
                                <Form.Check
                                    inline
                                    label="Party"
                                    name="group1"
                                    type="radio"
                                    id="party"
                                />
                                <Form.Check
                                    inline
                                    label="Bill-No"
                                    name="group1"
                                    type="radio"
                                    id="bilno"
                                />
                                <span className="float-end text-success fs-4">
                                <Form.Check 
                                    inline
                                    name="toggle"
                                    type="switch"
                                    id="custom-switch"
                                    label={value}
                                    // onClick={purchase}
                                />
                                </span>
                                </Col>
                                <Col md={4}>
                                     <Button className="w-100" variant="primary">Search</Button>
                                </Col>
                        </Row>
                        <Row className="my-2">
                            <Col className="d-flex justify-content-end">
                            <Button className="" variant="warning">Save as PDF</Button>
                            <Button className="ml-2" variant="success">Save as Excel</Button>
                            <Button className="ml-2" variant="info">Print</Button>
                            </Col>
                        </Row>
                        <Table size="sm" className="text-white my-2">
                                    <thead>
                                    <tr className="bg-secondary">
                                        <th>SL</th>
                                        <th>Product</th>
                                        <th>Group</th>
                                        <th>Catagory</th>
                                        <th>Party</th>
                                        <th>Bill No.</th>
                                        <th>Handle</th>
                                        <th>First</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-dark">
                                    <tr>
                                        <td>1</td>
                                        <td>product</td>
                                        <td>uuj</td>
                                        <td>102322</td>
                                        <td>10765</td>
                                        <td>scsc</td>
                                        <td>687658</td>
                                        <td>scs</td>
                                    </tr>
                                    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>        
        </>
    )
}
export default Report;