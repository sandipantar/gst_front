import React,{ useRef, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
import AutoSelect from 'react-select';
import TableRows from "../test/TableRows";
import Pdf from 'react-to-pdf';
import printable from 'react-print';
import logo from '../../../img/AROMIST_LOGO.png';
import { Card,Row,Col,Form,Button,Tabs,Tab,Table,Badge,Modal,InputGroup,FormControl } from 'react-bootstrap-v5';

const ref = React.createRef();
const party = [
    { value: 'ab', label: 'A&B Co.' },
    { value: 'cd', label: 'C&D Co.' },
    { value: 'ef', label: 'E&F Co.' },
    { value: 'hi', label: 'H&I Co.' },
    { value: 'jk', label: 'J&K Co.' },
    { value: 'lm', label: 'L&M Co.' }
  ];
  const locationData = [
    { id: 1, name: "Raipur", image: "imh" },
    { id: 2, name: "Kolkata", image: "imh" },
    { id: 3, name: "New Delhi", image: "imh" },
    { id: 4, name: "Indore", image: "imh" },
    { id: 5, name: "Chennai", image: "imh" },
  ];

const Sale = () => {
    const barcodeEntryFocusInput = useRef();
    const [key, setKey] = useState('sale');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fullscreen, setFullscreen] = useState(true);
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    
    const [checked, setChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${name}`);
    }

    // var today = new Date(),
    // datee = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const today = new Date();
    const futureDate = today.getDate();
    today.setDate(futureDate);
    const datee = today.toLocaleDateString('en-CA');
    const [proshow, setProShow] = useState(false);

    const prohandleClose = () => setProShow(false);
    const prohandleShow = () => setProShow(true);

    const [selectedOption, setSelectedOption] = useState(null);

    const [rowsData, setRowsData] = useState([]);
 
    const addTableRows = ()=>{
  
        const rowsInput={
            fullName:'',
            emailAddress:'',
            salary:''  
        } 
        setRowsData([...rowsData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }
 
   const handleChange = (index, evnt)=>{
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
    }
    const [salesdata,setSalesdata] = useState({
        invno:"",billto:"",shipto:"",billdate:"",challanNo:"",challanDate:"",placeOfSupply:"",destination:"",despatchThrough:"",vehicleNo:"",paymentMode:"",
    });
     
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setSalesdata({...salesdata, [name]:value});
    }

    return(
        <>
        <div id="wrapper">
            <Header />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* <Topnav /> */}
                    <div className="container-fluid">                  
                        <Form>
                            <Row>
                                <Col>
                                    <h6 className="h3 mb-0 text-gray-800">Sale Entry Form</h6>
                                </Col>
                                <Col>
                                <div className="text-center">
                                        <Form.Check
                                            inline
                                            label="Gst"
                                            name="bill_type"
                                            type="radio"
                                            defaultChecked={true}
                                            id="Gst"
                                            onChange={(e) => setChecked(false)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Non Gst"
                                            name="bill_type"
                                            type="radio"
                                            id="checked"
                                            onChange={(e) => setChecked(e.target.id)}
                                        />
                                        {/* <button type="reset">Reset form</button> */}
                                    </div>
                                </Col>
                                <Col>

                                </Col>
                                <Col>
                                    <Button variant="danger" size="sm">
                                        <i className="fa fa-times"></i> Cancel (F2)
                                    </Button>
                                </Col>
                                <Col>
                                
                                        <Button variant="success" size="sm" onClick={handleShow4}>
                                        {/* handleShow */}
                                        <i className="fa fa-check"></i> Save (F10)
                                        </Button>
                                    
                                </Col>
                            </Row>  
                            {/* events modal */}
                            <Modal show={show4} onHide={handleClose4} fullscreen={fullscreen} aria-labelledby="example-modal-sizes-title-sm">
                            <Modal.Header closeButton>
                                <Modal.Title>Quotation / Bill / Tax Invoice || Invoice No : ATC/001/2022-2023</Modal.Title>
                                <Pdf targetRef={ref} filename="testgst.pdf">
                                    {({ toPdf }) => 
                                    <Button variant="success" onClick={toPdf}>Save PDF</Button>
                                    }
                            </Pdf>
                            </Modal.Header>
                            <Modal.Body>
                            
                            {/* <button onClick={() => window.print()}>PRINT</button> */}
                            <div ref={ref}>
                                {/* hi its fine and workin 
                                <p>{salesdata.challanNo}</p>
                                <p>{salesdata.billdate}</p>                                 */}
                                <Row>
                                    <Col>
                                        <h4>Aromist Tea Co.</h4>
                                        <p>
                                            Netaji Subhash Road, Subhash Pally <br/>
                                            Siliguri - 734001<br/>
                                            Dist : Darjeeling<br/>
                                            GSTIN / UIN : 19ATHPP2711R1Z2<br/>
                                            State: West Bengal, Code: 19<br/>
                                            Ph: +91 6294811689<br/>
                                            E-Mail: aromisttea@gmail.com<br/>
                                            TMCO No : 8268682492<br/>
                                            FSSAI LIC No : 8268682492 
                                        </p>
                                    </Col>
                                    <Col>
                                        <img className='m-auto' src={logo} alt="logo" width="150px"/>
                                    </Col>
                                    <Col>
                                     <Row>
                                        <Col>
                                            <p>
                                                Reference Date: <br/>
                                                Reference No.:
                                                <hr/>
                                                <b>Buyer (Bill To)</b>: <br/>
                                                Buyers GSTIN:  <br/>
                                                Buyer Address: <br/><br/>
                                                Phone:
                                                <hr/>
                                                Mode / Terms of Payment:
                                            </p>
                                        </Col>
                                        <Col>
                                            <p>
                                            24-12-2022<br/>
                                            ATC/001/2022-2023
                                            <hr/>
                                            Shree Shyam ea Co. <br/>
                                            19AJKDY661171ZU <br/>
                                            mahavir stan Siliguri - 734003<br/>
                                            +91 873872837823
                                            <hr/>
                                            Cash
                                            </p>
                                        </Col>
                                     </Row>
                                    </Col>
                                </Row>
                                <div className='d-flex justify-content-center'>
                                    <h6><b className='mx-auto text-dark'><u>Tax Invoice</u></b></h6>
                                </div>
                                <table className="tableclass table-sm" width="100%">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Particulars</th>
                                        <th>HSN / SAC</th>
                                        <th>Invoice NO</th>
                                        <th>B-Qty</th>
                                        <th>B-Unit</th>
                                        <th>A-Qty</th>
                                        <th>A-Unit</th>
                                        <th>Rate</th>
                                        <th>Disc %</th>
                                        <th>Discount</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>product1</td>
                                    <td>90240</td>
                                    <td>kmlkx9i</td>
                                    <td>350</td>
                                    <td>kg</td>
                                    <td>10</td>
                                    <td>BAG</td>
                                    <td>100</td>
                                    <td>10%</td>
                                    <td>10</td>
                                    <td>90</td>
                                    </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>product2</td>
                                    <td>90240</td>
                                    <td>kmlkx9i</td>
                                    <td>350</td>
                                    <td>kg</td>
                                    <td>10</td>
                                    <td>BAG</td>
                                    <td>100</td>
                                    <td>10%</td>
                                    <td>10</td>
                                    <td>90</td>
                                    </tr>
                                    <tr>
                                    <td>3</td>
                                    <td>product3</td>
                                    <td>90240</td>
                                    <td>kmlkx9i</td>
                                    <td>350</td>
                                    <td>kg</td>
                                    <td>10</td>
                                    <td>BAG</td>
                                    <td>100</td>
                                    <td>10%</td>
                                    <td>10</td>
                                    <td>90</td>
                                    </tr>
                                </tbody>
                                </table>
                                <Row style={{padding:'0 12px 0 12px'}} className='text-dark'>
                                <Col md={8} className='border border-2 border-dark'>
                                    <p className='text-dark'>Total Base Quantity : count bqty &nbsp;&nbsp; unit<br/>
                                    Total Alt. Quantity : count aqty &nbsp;&nbsp; unit</p><br/>
                                    <h5><b>Rupees Fourteen Lakhs Sixty Two housand hre Haundred Forty Nine Only</b></h5>
                                </Col>
                                <Col md={2} className='border border-dark border-2'>
                                <table>
                                        <tr><td>Taxable Amount</td></tr>
                                        <tr><td>CGST 2.50</td></tr>
                                        <tr><td>SGST 2.50</td></tr>
                                        <tr><td>IGST 5.00</td></tr>
                                        <tr><td>Transport</td></tr>
                                        <tr><td>Round Off</td></tr>
                                        <tr><td>Grand Total</td></tr>
                                </table>
                                </Col>
                                <Col md={2} className='border border-2 border-dark text-right' style={{paddingLeft:'110px'}}>
                                    <table>
                                        <tr><td>94,40,332.20</td></tr>
                                        <tr><td>1,11,0008.31</td></tr>
                                        <tr><td>1,11,0008.31</td></tr>
                                        <tr><td>2,22,0016.31</td></tr>
                                        <tr><td>8.933</td></tr>
                                        <tr><td>0.19</td></tr>
                                        <tr><td>100,22,313.00</td></tr>
                                    </table>
                                </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <small>
                                            <p>Terms & Condition</p>
                                            <ol>
                                                <li>Payment condition shall be 100% in advance</li>
                                                <li>Minimum purchase quantity should be 50kg</li>
                                                <li>The validity of this quotation is for 10 days</li>
                                                <li>Transpotation depends on sate wise</li>
                                                <li>Office is closed on Sunday and National Holidays</li>
                                                <li>All condition reserved within Siliguri Jurisdiction only</li>
                                                <li>Goods Once sold cant be return</li>
                                            </ol>
                                        </small>
                                    </Col>
                                    <Col>
                                        <small>
                                            <p>Aromist ea Co.</p>
                                            <ul>
                                                <li>Bank Name: ICICI Bank</li>
                                                <li>Account No: 387005500180</li>
                                                <li>IFSC Code: ICIC0003870</li>
                                            </ul>
                                        </small>
                                    </Col>
                                    <Col> pay qr code</Col>
                                    <Col>
                                        <p>For Aromist Tea Co.</p>
                                        {/* <img src={} alt="sign"/> */}
                                        <p>Authorised Signature</p> 
                                    </Col>
                                </Row>
                                <p className='d-flex justify-content-center'>This is computer generated invoice</p>
                            </div>
                            </Modal.Body>
                            </Modal>
                            {/* events modal */}
                            <Row>
                                <Col md={3}>
                                    <Form.Label>Invoice No : </Form.Label><br/>
                                    
                                    {checked? (
                                        <label>ATCN/001/2022-23</label>
                                    ):(
                                        <label>ATC/001/2022-23</label>)}
                                </Col>
                                <Col md={3}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Label>Bill To : </Form.Label>
                                    <AutoSelect 
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={party}
                                    />
                                </Form.Group>
                                </Col>
                                <Col md={3}>
                                <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                    <Form.Label>Shipped To : </Form.Label>
                                    <AutoSelect 
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={party}
                                    />
                                </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Date : </Form.Label>
                                    <Form.Control type="date" defaultValue={datee}
                                        name="billdate"
                                        value={salesdata.billdate}
                                        onChange={handleInputs}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Form.Label>Challan No : </Form.Label>
                                    <Form.Control type="text" name='challanNo' 
                                        value={salesdata.challanNo}
                                        onChange={handleInputs}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Date : </Form.Label>
                                    <Form.Control type="date" defaultValue={datee}/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Place of Supply : </Form.Label>
                                    <AutoSelect 
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={party}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Destination : </Form.Label>
                                    <Form.Control type="text" name='destination'/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Despatch Through : </Form.Label>
                                    <Form.Control type="text" name='despatchThrough'/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Vehicle No : </Form.Label>
                                    <Form.Control type="text" name='vehicleNo'/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Transport Cost : </Form.Label>
                                    <Form.Control type="text" name='transportCost'/>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Mode / Term of Payments: (in Days) </Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option value="cash">Cash</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </Form.Select> 
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
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className='bg-success' colSpan={2}>Base Qty</th>
                                        
                                        <th className='bg-success' colSpan={2}>Alt.Qty</th>
                                        
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th rowSpan={2}><a className="btn btn-outline-success" onClick={addTableRows} >+</a></th>
                                    </tr>
                                    <tr className="bg-success">
                                        <th rowSpan={2}>SL</th>
                                        <th>Particulars</th>
                                        <th>HSN / SAC</th>
                                        <th>Invoice NO</th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th>Qty</th>
                                        <th>Unit</th>
                                        <th>Rate</th>
                                        <th>Disc %</th>
                                        <th>Discount</th>
                                        <th>Amount</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
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
                        </Form>
                    </div>
                </div>
            </div>
        </div>        
        </>
    )
}
export default Sale;