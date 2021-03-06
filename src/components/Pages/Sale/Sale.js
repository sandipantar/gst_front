import React,{ useRef, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
import { Card,Row,Col,Form,Button,Tabs,Tab,Table,Badge,Modal,InputGroup,FormControl } from 'react-bootstrap-v5';

const Sale = () => {
    const barcodeEntryFocusInput = useRef();
    const [key, setKey] = useState('sale');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // var today = new Date(),
    // datee = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const today = new Date();
    const futureDate = today.getDate();
    today.setDate(futureDate);
    const datee = today.toLocaleDateString('en-CA');
    const [proshow, setProShow] = useState(false);

    const prohandleClose = () => setProShow(false);
    const prohandleShow = () => setProShow(true);

    return(
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
                                    {/* <Col className="d-flex justify-content-between">
                                        <Button variant="danger">
                                            <i className="fa fa-times"></i> Cancel (F2)
                                        </Button>
                                        <Button variant="success" onClick={handleShow}>
                                        <i className="fa fa-check"></i> Save (F10)
                                        </Button>
                                    </Col> */}
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
                                            <Form.Group controlId="formPlaintextVnumber" onClick={prohandleShow}>
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
                                            <Form.Group controlId="formPlaintextVnumber" onClick={prohandleShow}>
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
                                    <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                        <Form.Label>Remark</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                {/* </Col> */}
                                <Col md={3}>
                                    <Col className="d-flex justify-content-between">
                                        <Button variant="danger">
                                            <i className="fa fa-times"></i> Cancel (F2)
                                        </Button>
                                        <Button variant="success" onClick={handleShow}>
                                        <i className="fa fa-check"></i> Save (F10)
                                        </Button>
                                    </Col>
                                </Col>
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
                            {/* billsave */}
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
                            {/* billsave */}
                            {/* produt Detail */}
                            <Modal show={proshow} onHide={prohandleClose} size="xl">
                                <Modal.Header closeButton>
                                    <Modal.Title>Search Your Product Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form>
                                    <Row style={{color:'#000 !important'}}>
                                    <Form.Label htmlFor="basic-url">Search</Form.Label>
                                    <Col md={4}>
                                    <InputGroup className="">
                                        <InputGroup.Text id="basic-addon3">
                                        Barcode
                                        </InputGroup.Text>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                    </InputGroup>
                                    </Col>
                                    <Col md={4}>
                                    <InputGroup className="">
                                        <InputGroup.Text id="basic-addon3">
                                        Product
                                        </InputGroup.Text>
                                        <FormControl id="basic-url" aria-describedby="basic-addon3" />
                                    </InputGroup>
                                    </Col>
                                    <Col md={4}>
                                        <Row>
                                        <Col md={4}>
                                        <Form.Label htmlFor="mrp">MRP</Form.Label>
                                        <Form.Text id="passwordHelpBlock" muted>
                                            100.87
                                        </Form.Text>
                                        </Col>
                                        <Col md={4}>
                                        <Form.Label htmlFor="disc">Disc. (%)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id="disc"
                                            aria-describedby="passwordHelpBlock"
                                        />
                                        </Col>
                                        <Col md={4}>
                                        <Form.Label htmlFor="final">Final</Form.Label>
                                        <Form.Text id="passwordHelpBlock" muted>
                                            100.87
                                        </Form.Text>
                                        </Col>
                                        </Row>
                                    </Col>
                                    </Row>
                                </Form>
                                <hr></hr>
                                <Tabs defaultActiveKey="master" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="master" title="Master">
                                    <Card>
                                        <Card.Header style={{textAlign:'center', color:'#000'}}>Product Master Data</Card.Header>
                                        <Card.Body>
                                            <Table size="sm" className="text-white">
                                                        
                                                        <tbody className="text-dark">
                                                        <tr>
                                                            <th className='bg-light text-center'>Product</th>
                                                            <td>jshdgsdc jshdg db</td>
                                                            <th className='bg-light text-center'>Note</th>
                                                            <td>6765</td>
                                                        </tr>
                                                        <tr>
                                                            <th className='bg-light text-center'>ID</th>
                                                            <td>6765</td>
                                                            <th className='bg-light text-center'>Opening Cost Rate</th>
                                                            <td>6765</td>
                                                        </tr>
                                                        <tr>
                                                            <th className='bg-light text-center'>Barcode</th>
                                                            <td>6766765</td>  
                                                            <th className='bg-light text-center'>Current Purchase Rate</th>
                                                            <td>6765</td>
                                                        </tr>                                                         
                                                        <tr>
                                                            <th className='bg-light text-center'>HSN Code</th>
                                                            <td>6765et4</td>
                                                            <th className='bg-light text-center'>Current Sale Rate</th>
                                                            <td>6765</td>
                                                        </tr>
                                                        <tr>
                                                            <th className='bg-light text-center'>Group</th>
                                                            <td>Amul</td>
                                                            <th className='bg-light text-center'>Current MRP</th>
                                                            <td>6765</td>
                                                        </tr>
                                                        <tr>
                                                            <th className='bg-light text-center'>Catagory</th>
                                                            <td>Milk</td>
                                                            <th className='bg-light text-center'>Master Opening-Balance</th>
                                                            <td>6765yttt7t7t</td>
                                                        </tr>
                                                        <tr>
                                                            <th className='bg-light text-center'>Size</th>
                                                            <td>200 GM.</td>
                                                            <th className='bg-light text-center'>Master Running Balance</th>
                                                            <td>6765</td>
                                                        </tr>
                                                        </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Tab>
                                <Tab eventKey="balance" title="Balance">
                                <Card>
                                        <Card.Header style={{textAlign:'center', color:'#000'}}>Product Balance Data</Card.Header>
                                        <Card.Body>
                                            <Table size="sm" className="text-white">
                                                        <thead>
                                                        <tr className="bg-secondary">
                                                            <th>Transaction</th>
                                                            <th>Shop</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="text-dark">
                                                        <tr>
                                                            <td>Opening Balance</td>
                                                            <td>Null</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Closing Balance as on 12/05/2022 (Now)</td>
                                                            <td>0</td>
                                                        </tr>
                                                        </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Tab>
                                <Tab eventKey="rate" title="Rate">
                                    <Row>
                                        <Col md={6}>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Sale Rate Master</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Rate-Level</th>
                                                                <th>Rate</th>
                                                                <th>Unit</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Purchase Rate Master</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Rate-Level</th>
                                                                <th>Rate</th>
                                                                <th>Unit</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="discount" title="Discount">
                                    <Row>
                                        <Col md={6}>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Sale Discount Master</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Disc-Level</th>
                                                                <th>Percent</th>
                                                                <th>Fixed</th>
                                                                <th>Ledger</th>
                                                                <th>Base</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Purchase Discount Master</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Disc-Level</th>
                                                                <th>Percent</th>
                                                                <th>Fixed</th>
                                                                <th>Ledger</th>
                                                                <th>Base</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="tax" title="Tax">
                                <Row>
                                        <Col md={6}>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Sale Tax Master</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Tax-Level</th>
                                                                <th>Percent</th>
                                                                <th>Type</th>
                                                                <th>Ledger</th>
                                                                <th>Base</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Purchase Tax Master</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Tax-Level</th>
                                                                <th>Percent</th>
                                                                <th>Type</th>
                                                                <th>Ledger</th>
                                                                <th>Base</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="sale" title="Sale">
                                    <Row>
                                            <Card>
                                                <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Sale Transactions</Card.Header>
                                                    <Card.Body>
                                                        <Table size="sm" className="text-white">
                                                                    <thead>
                                                                    <tr className="bg-secondary">
                                                                        <th>Doc. No.</th>
                                                                        <th>Date</th>
                                                                        <th>Ref. No.</th>
                                                                        <th>Party Ledger</th>
                                                                        <th>MRP</th>
                                                                        <th>Qty</th>
                                                                        <th>Unit</th>
                                                                        <th>Rate</th>
                                                                        <th>Discount</th>
                                                                        <th>Tax</th>
                                                                        <th>Net</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody className="text-dark">
                                                                    <tr>
                                                                        <td>Master Definition Rate</td>
                                                                        <td>28.00</td>
                                                                        <td>KG</td>
                                                                    </tr>
                                                                    </tbody>
                                                        </Table>
                                                    </Card.Body>
                                            </Card>
                                    </Row>
                                    <Row>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Sale Return Transactions</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Doc. No.</th>
                                                                <th>Date</th>
                                                                <th>Doc. Ref.</th>
                                                                <th>Party Ledger</th>
                                                                <th>MRP</th>
                                                                <th>Qty</th>
                                                                <th>Unit</th>
                                                                <th>Rate</th>
                                                                <th>Discount</th>
                                                                <th>Tax</th>
                                                                <th>Net</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        
                                    </Row>
                                </Tab>
                                <Tab eventKey="purchase" title="Purchase">
                                <Row>
                                            <Card>
                                                <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Purchase Transactions</Card.Header>
                                                    <Card.Body>
                                                        <Table size="sm" className="text-white">
                                                                    <thead>
                                                                    <tr className="bg-secondary">
                                                                        <th>Doc. No.</th>
                                                                        <th>Date</th>
                                                                        <th>Ref. No.</th>
                                                                        <th>Party Ledger</th>
                                                                        <th>MRP</th>
                                                                        <th>Qty</th>
                                                                        <th>Unit</th>
                                                                        <th>Rate</th>
                                                                        <th>Discount</th>
                                                                        <th>Tax</th>
                                                                        <th>Net</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody className="text-dark">
                                                                    <tr>
                                                                        <td>Master Definition Rate</td>
                                                                        <td>28.00</td>
                                                                        <td>KG</td>
                                                                    </tr>
                                                                    </tbody>
                                                        </Table>
                                                    </Card.Body>
                                            </Card>
                                    </Row>
                                    <Row>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Purchase Return Transactions</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Doc. No.</th>
                                                                <th>Date</th>
                                                                <th>Doc. Ref.</th>
                                                                <th>Party Ledger</th>
                                                                <th>MRP</th>
                                                                <th>Qty</th>
                                                                <th>Unit</th>
                                                                <th>Rate</th>
                                                                <th>Discount</th>
                                                                <th>Tax</th>
                                                                <th>Net</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        
                                    </Row>
                                </Tab>
                                <Tab eventKey="proConsump" title="ProDuct-Comsumption">
                                <Row>
                                            <Card>
                                                <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Production Transaction</Card.Header>
                                                    <Card.Body>
                                                        <Table size="sm" className="text-white">
                                                                    <thead>
                                                                    <tr className="bg-secondary">
                                                                        <th>Doc. No.</th>
                                                                        <th>Date</th>
                                                                        <th>Location</th>
                                                                        <th>Qty</th>
                                                                        <th>Unit</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody className="text-dark">
                                                                    <tr>
                                                                        <td>Master Definition Rate</td>
                                                                        <td>28.00</td>
                                                                        <td>KG</td>
                                                                    </tr>
                                                                    </tbody>
                                                        </Table>
                                                    </Card.Body>
                                            </Card>
                                    </Row>
                                    <Row>
                                            <Card>
                                            <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Consumption Transaction</Card.Header>
                                            <Card.Body>
                                                <Table size="sm" className="text-white">
                                                            <thead>
                                                            <tr className="bg-secondary">
                                                                <th>Doc. No.</th>
                                                                <th>Date</th>
                                                                <th>Location</th>
                                                                <th>Qty</th>
                                                                <th>Unit</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="text-dark">
                                                            <tr>
                                                                <td>Master Definition Rate</td>
                                                                <td>28.00</td>
                                                                <td>KG</td>
                                                            </tr>
                                                            </tbody>
                                                </Table>
                                            </Card.Body>
                                            </Card>
                                        
                                    </Row>
                                </Tab>
                                <Tab eventKey="interStockTransfer" title="Inter-Stock-Transfer">
                                <Row>
                                            <Card>
                                                <Card.Header style={{textAlign:'center', color:'#000'}}>Last 50 Stock Transfer Transaction</Card.Header>
                                                    <Card.Body>
                                                        <Table size="sm" className="text-white">
                                                                    <thead>
                                                                    <tr className="bg-secondary">
                                                                        <th>Doc. No.</th>
                                                                        <th>Date</th>
                                                                        <th>Sourch-Location</th>
                                                                        <th>Dest-Location</th>
                                                                        <th>Qty</th>
                                                                        <th>Unit</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody className="text-dark">
                                                                    <tr>
                                                                        <td>Master Definition Rate</td>
                                                                        <td>28.00</td>
                                                                        <td>KG</td>
                                                                    </tr>
                                                                    </tbody>
                                                        </Table>
                                                    </Card.Body>
                                            </Card>
                                    </Row>
                                </Tab>
                                </Tabs>
                                </Modal.Body>
                                </Modal> 
                            {/* product details */}
                        </Form>
                    </div>
                </div>
            </div>
        </div>        
        </>
    )
}
export default Sale;