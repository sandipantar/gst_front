import React,{ useRef, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
import { Card,Row,Col,Form,Button,Tabs,Tab,Table,Badge,Modal } from 'react-bootstrap-v5';

const Sale = () => {
    const barcodeEntryFocusInput = useRef();
    const [key, setKey] = useState('sale');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const today = new Date();
    const futureDate = today.getDate();
    today.setDate(futureDate);
    const datee = today.toLocaleDateString('en-CA');
    useEffect(() => {
        if(barcodeEntryFocusInput.current) barcodeEntryFocusInput.current.select(); 
    }, [barcodeEntryFocusInput]);

    return (
        <>
            <div id="wrapper">
                <Header />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* <Topnav /> */}
                        <div className="container-fluid">                  
                            <Form>
                                <div className="d-sm-flex align-items-center justify-content-between mb-2 mt-1">
                                    <h2 className="h3 mb-0 text-gray-800">Sale Entry Form</h2>
                                    <Button variant="danger" size="sm">
                                        <i className="fa fa-times"></i> Cancel (F2)
                                    </Button>
                                    <Button variant="success" size="sm" onClick={handleShow}>
                                    <i className="fa fa-check"></i> Save (F10)
                                    </Button>
                                </div>  
                                <Row>
                                    <Col md={3}>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Doc.No.</Form.Label>
                                            <Form.Control 
                                                disabled
                                                readOnly
                                                type="text" 
                                            />
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Select Party</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="px-4">
                                        <Row className="d-flex justify-content-between">
                                            <Col md={5}>
                                            <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control type="date" defaultValue={datee}/>
                                            </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                            <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                                <Form.Label>Ref. No.</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Remark</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group as={Row}  style={{paddingTop:'28px'}} controlId="formPlaintextVnumber">
                                            <Form.Label>Barcode Entry</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>                                
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    transition={false}
                                    className="mb-3"
                                    >
                                    <Tab eventKey="sale" title="Product Detail">
                                        <Table size="sm" className="tableclass">
                                            <thead>
                                                <tr className="bg-success">
                                                    <th>SL</th>
                                                    <th >Barcode</th>
                                                    <th>Product</th>
                                                    <th>HSN / SAC</th>
                                                    <th>MRP</th>
                                                    <th>Quantity</th>
                                                    <th>Prd. Val.</th>
                                                    <th>CDisc %</th>
                                                    <th>CD-Amount</th>
                                                    <th>Tax</th>
                                                    <th>Net</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>123456789074396</td>
                                                    <td>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                    </td>
                                                    <td>102322</td>
                                                    <td>10765</td>
                                                    <td style={{width:'8%'}}>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="number" />
                                                        </Form.Group>
                                                    </td>
                                                    <td>687658</td>
                                                    <td style={{width:'8%'}}>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="number" />
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{width:'8%'}}>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="number" />
                                                        </Form.Group>
                                                    </td>
                                                    <td>77687</td>
                                                    <td>8756587</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="exchange" title="Exchange">
                                        <Table size="sm" className="tableclass">
                                            <thead>
                                                <tr className="bg-info">
                                                    <th>SL</th>
                                                    <th >Barcode</th>
                                                    <th>Product</th>
                                                    <th>HSN / SAC</th>
                                                    <th>MRP</th>
                                                    <th>Quantity</th>
                                                    <th>Prd. Val.</th>
                                                    <th>CDisc %</th>
                                                    <th>CD-Amount</th>
                                                    <th>Tax</th>
                                                    <th>Net</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>123456789074396</td>
                                                    <td>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="text" />
                                                        </Form.Group>
                                                    </td>
                                                    <td>102322</td>
                                                    <td>10765</td>
                                                    <td style={{width:'8%'}}>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="number" />
                                                        </Form.Group>
                                                    </td>
                                                    <td>687658</td>
                                                    <td style={{width:'8%'}}>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="number" />
                                                        </Form.Group>
                                                    </td>
                                                    <td style={{width:'8%'}}>
                                                        <Form.Group controlId="formPlaintextVnumber">
                                                            <Form.Control type="number" />
                                                        </Form.Group>
                                                    </td>
                                                    <td>77687</td>
                                                    <td>8756587</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="term_detail" title="Term Detail">
                                        <Table size="sm" className="tableclass">
                                            <thead>
                                                <tr className="bg-warning">
                                                    <th>SL</th>
                                                    <th >Sign</th>
                                                    <th>Percent %</th>
                                                    <th>amount</th>
                                                    <th>Ledger</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>DR</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <h6>Auto Round Off</h6>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formPlaintextVnumber">
                                                    <Form.Label>amount</Form.Label>
                                                    <Form.Control type="text" value="0.45" disabled />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formPlaintextVnumber">
                                                    <Form.Label>Ledger</Form.Label>
                                                    <Form.Control type="text" disabled value="Round Off" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="disc_tax" title="Disc & Tax">
                                        <Table size="sm" className="tableclass">
                                            <thead>
                                                <tr className="bg-danger">
                                                    <th>SL</th>
                                                    <th >Percent %</th>
                                                    <th>+/-</th>
                                                    <th>amount</th>
                                                    <th>Ledger</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>100</td>
                                                    <td>
                                                    <Badge bg="success">
                                                        (+)
                                                    </Badge>
                                                    <Badge bg="danger">
                                                        (-)
                                                    </Badge>
                                                    </td>
                                                    <td>767</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="journal_view" title="Journal View">
                                        <Table size="sm" className="tableclass">
                                            <thead>
                                                <tr className="bg-primary">
                                                    <th>SL</th>
                                                    <th >Ledger</th>
                                                    <th>DR / CR</th>
                                                    <th>Debit</th>
                                                    <th>Credit</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>sdfefef wf</td>
                                                    <td>
                                                    <Badge bg="success">
                                                        DR
                                                    </Badge>
                                                    <Badge bg="danger">
                                                        CR
                                                    </Badge>
                                                    </td>
                                                    <td>767</td>
                                                    <td>342</td>
                                                    <td>dfbfb bb df kdfbfb</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Tab>
                                </Tabs>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header className="bg-primary text-white" closeButton>
                                    <Modal.Title>Sale Bill</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <Form>
                                        <Row>
                                            <Col>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                            </Col>
                                            <Col>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Whatsapp</Form.Label>
                                                <Form.Control type="number" />
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>GST Input</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                        <Row>
                                            <Col>Bill Amount
                                                <h4>
                                                    <Badge bg="success">Rs. 1024.00</Badge>
                                                </h4>
                                            </Col>
                                            <Col>Mode Of Payment
                                            <Form.Select aria-label="Default select example">
                                                <option value="1">Cash</option>
                                                <option value="2">Card</option>
                                                <option value="3">Online</option>
                                            </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Amount Taken</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                            </Col>
                                            <Col>Return Amount
                                                <h4>
                                                    <Badge bg="danger">Rs. 124.00</Badge>
                                                </h4>
                                            </Col>
                                        </Row>
                                        <div className="text-center">
                                            <p>Bill Receipt</p>
                                            <Form.Check
                                                inline
                                                label="Print"
                                                name="bill_receipt"
                                                type="radio"
                                                id="print_bill"
                                            />
                                            <Form.Check
                                                inline
                                                label="Send Bill"
                                                name="bill_receipt"
                                                type="radio"
                                                id="send_bill"
                                            />
                                            <Form.Check
                                                inline
                                                label="Both"
                                                name="bill_receipt"
                                                type="radio"
                                                id="print_send"
                                            />
                                        </div>
                                    </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Sale;