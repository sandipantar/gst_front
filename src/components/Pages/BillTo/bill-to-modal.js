import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Button } from 'react-bootstrap-v5';
import { add, fetchById, fetchByIdAndUpdate } from '../../../utils/firebase-crud';

const billToCollectionName = "/billTo";

const BillToModal = (props) => {
    const [companyData, setCompanyData] = useState({
        name: "",
        address: "",
        phone: "",
        gst: "",
        shippingAddresses: []
    });
    const [shippingAddress, updateShipping] = useState("");

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setCompanyData({ ...companyData, [name]: value });
    }

    const save = async () => {
        const reqBody = { ...companyData };

        if (!Object.keys(props.billData).length) {
            const addBillRes = await add(billToCollectionName, reqBody);
            if (addBillRes.success) {
                props.handleBillToModal(false);
                props.addSuccessful();
            }
        } else {
            const addBillRes = await fetchByIdAndUpdate(billToCollectionName, props.billData.id, reqBody);
            if (addBillRes.success) {
                props.handleBillToModal(false);
                props.addSuccessful();
            }
        }

    };

    const addAddress = () => {
        if (shippingAddress.trim().length) {
            const localCompanyData = { ...companyData };
            localCompanyData.shippingAddresses.push(shippingAddress);
            setCompanyData({ ...localCompanyData });
            updateShipping("");
        }
    };

    const removeAddress = (id) => {
        const localCompanyData = { ...companyData };
        localCompanyData.shippingAddresses.splice(id, 1);
        setCompanyData({ ...localCompanyData });
    };

    useEffect(() => {
        if (props.billData && Object.keys(props.billData).length) {
            console.log("props.billData ", props.billData)
            setCompanyData({
                ...props.billData
            });
            // props.addSuccessful();
        }
    }, [props.billData]);

    return (
        <div id="wrapper">
            <Modal show={props.billToModal} onHide={() => props.handleBillToModal(false)} fullscreen={true} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Body>
                    <div className='container-fluid'>
                        <Row>
                            <Col>Add/Edit Bill</Col>
                            <Col>
                                <Button variant="danger" size="sm" onClick={() => props.handleBillToModal(false)}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col>

                                <Button variant="info" size="sm" onClick={() => save()}>
                                    Save
                                </Button>

                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Label>Company Name : </Form.Label>
                                    <Form.Control type="text" name='name'
                                        value={companyData.name}
                                        onChange={handleInputs}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Label>Phone Number : </Form.Label>
                                    <Form.Control type="text" name='phone'
                                        value={companyData.phone}
                                        onChange={handleInputs}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Label>GST: </Form.Label>
                                    <Form.Control type="text" name='gst'
                                        value={companyData.gst}
                                        onChange={handleInputs}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Label>Address : </Form.Label>
                                    <Form.Control type="text" name='address'
                                        value={companyData.address}
                                        onChange={handleInputs}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={7}>Shipping Address</Col>
                            <Col>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Control type="text" name='shippingAddress'
                                        value={shippingAddress}
                                        placeholder="Enter Shipping Address"
                                        onChange={(e) => updateShipping(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="info" size="sm" onClick={addAddress}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <table className="tableclass table-sm" width="100%">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companyData.shippingAddresses.map((product, ind) => {
                                            return <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{product}</td>
                                                <td>
                                                    <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeAddress(ind)}></i>
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default BillToModal;