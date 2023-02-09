import React, { useRef, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
import AutoSelect from 'react-select';
import TableRows from "../test/TableRows";
import Pdf from 'react-to-pdf';
import printable from 'react-print';
import logo from '../../../img/AROMIST_LOGO.png';
import { Card, Row, Col, Form, Button, Tabs, Tab, Table, Badge, Modal, InputGroup, FormControl } from 'react-bootstrap-v5';

const ref = React.createRef();
const party = [
    {
        value: 'ab',
        label: 'A&B Co.',
        companyDetails: {
            contactNo: "9876543210",
            gst: "19zmajjnksbdj",
            address: "address 6"
        },
        shippingAddress: [{
            value: 'add1',
            label: 'Address 1'
        }, {
            value: 'add2',
            label: 'Address 2'
        }]
    },
    {
        value: 'cd',
        label: 'C&D Co.',
        companyDetails: {
            contactNo: "9776543210",
            gst: "19zmajjnjksl",
            address: "address 7"
        },
        shippingAddress: [{
            value: 'add3',
            label: 'Address 3'
        }, {
            value: 'add4',
            label: 'Address 4'
        }]
    },
    {
        value: 'ef',
        label: 'E&F Co.',
        companyDetails: {
            contactNo: "9876566210",
            gst: "19zmajjnkslk6",
            address: "address 7"
        },
        shippingAddress: [{
            value: 'add5',
            label: 'Address 5'
        }]
    }
];
const locationData = [
    { value: 1, label: "Raipur" },
    { value: 2, label: "Kolkata" },
    { value: 3, label: "New Delhi" },
    { value: 4, label: "Indore" },
    { value: 5, label: "Chennai" }
];

const Sale = () => {
    const barcodeEntryFocusInput = useRef();
    const [key, setKey] = useState('sale');
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [show4, setShow4] = useState(false);
    const [checked, setChecked] = useState(false);
    const [gsthecked, setGstChecked] = useState(true);

    // var today = new Date(),
    // datee = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const today = new Date();
    const futureDate = today.getDate();
    today.setDate(futureDate);
    const datee = today.toLocaleDateString('en-CA');
    const [proshow, setProShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    const [shippingAddress, updateShippingAddresses] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const [rowsData, setRowsData] = useState([]);
    const [salesdata, setSalesdata] = useState({
        invno: "ATC/001/2022-2023", billto: "", shipto: "", billdate: "", challanNo: "", challanDate: "", placeOfSupply: "", destination: "", despatchThrough: "", vehicleNo: "", paymentMode: "",
    });
    const [finalPreviewObj, updateFinalPreviewObj] = useState({});

    let name, value;

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const prohandleClose = () => setProShow(false);
    const prohandleShow = () => setProShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${name}`);
    }

    const addTableRows = () => {

        const rowsInput = {
            productName: '',
            hsn: '90240',
            invoiceNo: '',
            baseQty: '',
            baseUnit: 'kg',
            altQty: '',
            altUnit: 'bag',
            rate: '',
            discountPercentage: '',
            discount: 0,
            amount: 0
        }
        setRowsData([...rowsData, rowsInput])

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        let discount = 0;
        let amount = 0;
        let discountPercentage = 0;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;

        if (name === "baseQty" && rowsInput[index].rate) {
            if (!rowsInput[index].discountPercentage) {
                discountPercentage = 0;
            }
            discount = (Number(value) * Number(rowsInput[index].rate) * Number(discountPercentage)) / 100;
            amount = (Number(value) * Number(rowsInput[index].rate)) - discount;
        } else if (name === "rate" && rowsInput[index].baseQty) {
            if (!rowsInput[index].discountPercentage) {
                discountPercentage = 0;
            }
            discount = (Number(value) * Number(rowsInput[index].baseQty) * Number(discountPercentage)) / 100;
            amount = (Number(value) * Number(rowsInput[index].baseQty)) - discount;
        } else if (name === "discountPercentage" && rowsInput[index].baseQty && rowsInput[index].rate) {
            discount = (Number(rowsInput[index].rate) * Number(rowsInput[index].baseQty) * Number(value)) / 100;
            amount = (Number(rowsInput[index].rate) * Number(rowsInput[index].baseQty)) - discount;
        }

        rowsInput[index].discount = discount.toFixed(2);
        rowsInput[index].amount = amount.toFixed(2);


        setRowsData(rowsInput);
    }

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setSalesdata({ ...salesdata, [name]: value });
    }

    const changeSelectedOption = (obj) => {
        setSelectedOption(obj);
        updateShippingAddresses(obj.shippingAddress);
        setSelectedShippingAddress(obj.shippingAddress[0])
    };

    const wordify = (num) => {
        const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const formatTenth = (digit, prev) => {
            return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
        };
        const formatOther = (digit, next, denom) => {
            return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
        };
        let res = "";
        let index = 0;
        let digit = 0;
        let next = 0;
        let words = [];
        if (num += "", isNaN(parseInt(num))) {
            res = "";
        }
        else if (parseInt(num) > 0 && num.length <= 10) {
            for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
                case 0:
                    words.push(formatOther(digit, next, ""));
                    break;
                case 1:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 2:
                    words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
                    break;
                case 3:
                    words.push(formatOther(digit, next, "Thousand"));
                    break;
                case 4:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 5:
                    words.push(formatOther(digit, next, "Lakh"));
                    break;
                case 6:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 7:
                    words.push(formatOther(digit, next, "Crore"));
                    break;
                case 8:
                    words.push(formatTenth(digit, num[index + 1]));
                    break;
                case 9:
                    words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
            };
            res = words.reverse().join("")
        } else res = "";
        return res
    };

    const seePreview = () => {

        let totalAmount = 0;
        let totalBaseQty = 0;
        let totalAltQty = 0;
        let grandTotal = 0;

        if (rowsData.length) {
            rowsData.forEach(each => {
                if (each.amount) {
                    totalAmount += Number(each.amount);
                }
                if (each.baseQty) {
                    totalBaseQty += Number(each.baseQty);
                }
                if (each.altQty) {
                    totalAltQty += Number(each.altQty);
                }
            });
        }

        const totalGst = totalAmount * 0.05;
        const roundOff = Number(((totalAmount + totalGst + Number(salesdata.transportCost)) % 1).toFixed(2));

        if (roundOff > 0.49) {
            grandTotal = Math.ceil((totalAmount + totalGst + Number(salesdata.transportCost)));
        } else {
            grandTotal = Math.floor((totalAmount + totalGst + Number(salesdata.transportCost)));

        }
        // grandTotal = (totalAmount + totalGst + Number(salesdata.transportCost)) - (roundOff > 0.49 ? 0 : roundOff.toFixed(2));

        console.log("sales ", totalAmount)
        updateFinalPreviewObj({
            ...salesdata,
            products: [...rowsData],
            billto: selectedOption,
            shipto: selectedShippingAddress,
            placeOfSupply: selectedPlace,
            totalAmount: totalAmount.toFixed(2),
            totalBaseQty: totalBaseQty.toFixed(2),
            totalAltQty: totalAltQty.toFixed(2),
            totalGst: totalGst,
            roundOff: roundOff > 0.49 ? "0.00" : roundOff.toFixed(2),
            grandTotal: grandTotal.toFixed(2)
        });
        handleShow4();
    };
    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4, 2]
    };
    return (
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
                                        <div className="text-center">
                                            <Form.Check
                                                inline
                                                label="CGST + SGST"
                                                name="gst_type"
                                                type="radio"
                                                defaultChecked={true}
                                                id="checked"
                                                onChange={(e) => { setGstChecked(true); }}
                                            />
                                            <Form.Check
                                                inline
                                                label="IGST"
                                                name="gst_type"
                                                type="radio"
                                                id="Gst"
                                                onChange={(e) => { setGstChecked(false); }}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" size="sm">
                                            <i className="fa fa-times"></i> Cancel (F2)
                                        </Button>
                                    </Col>
                                    <Col>

                                        <Button variant="success" size="sm" onClick={seePreview}>
                                            {/* handleShow */}
                                            <i className="fa fa-check"></i> Save (F10)
                                        </Button>

                                    </Col>
                                </Row>
                                {/* events modal */}
                                <Modal show={show4 && Object.keys(finalPreviewObj).length} onHide={handleClose4} fullscreen={fullscreen} aria-labelledby="example-modal-sizes-title-sm">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Quotation / Bill / Tax Invoice || Invoice No : ATC{checked ? "N" : ""}/001/2022-2023</Modal.Title>
                                        <Pdf targetRef={ref} filename="testgst.pdf" scale={0.5}>
                                            {({ toPdf }) =>
                                                <Button variant="success" onClick={toPdf}>Save PDF</Button>
                                            }
                                        </Pdf>
                                    </Modal.Header>
                                    <Modal.Body>

                                        {/* <button onClick={() => window.print()}>PRINT</button> */}
                                        <div ref={ref}>
                                            <Row className='d-flex justify-content-center'>
                                                <Col md={3}>
                                                    <img className='m-auto' src={logo} alt="logo" width="150px" />
                                                </Col>
                                                <Col md={7} className='text-center text-dark'>
                                                    <h3><b>Aromist Tea Co.</b></h3>
                                                    <p>
                                                        GSTIN / UIN : 19ATHPP2711R1Z2<br />
                                                        Netaji Subhash Road, Subhash Pally
                                                        Siliguri - 734001
                                                        Dist : Darjeeling
                                                        State: West Bengal, Code: 19<br />
                                                        Ph: +91 6294811689 || E-Mail: aromisttea@gmail.com
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <Row className='border border-bottom-0'>
                                                        <Col>
                                                            <p className='m-0'><small>Bill To:</small></p>
                                                            <p>
                                                                {finalPreviewObj?.billto?.label}<br />
                                                                {finalPreviewObj?.billto?.companyDetails.address} <br />
                                                                {finalPreviewObj?.billto?.companyDetails.gst}
                                                                <span className='float-right'>+91 {finalPreviewObj?.billto?.companyDetails.contactNo}</span>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row className='border'>
                                                        <Col>
                                                            <p className='m-0'><small>Shipped To:</small></p>
                                                            <p>
                                                                {finalPreviewObj?.shipto?.label}
                                                            </p>
                                                            <p className='float-left'>TMCO No : 8268682492</p>
                                                            <p className='float-right'>FSSAI LIC No : 8268682492</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={6}>

                                                    <Row className='border border-bottom-0'>
                                                        <Col className='border-right'>Invoice No.:<br />ATC{checked ? "N" : ""}/001/2022-2023</Col>
                                                        <Col>Reference Date: <br /> {finalPreviewObj.billdate}</Col>
                                                    </Row>
                                                    <Row className='border border-bottom-0'>
                                                        <Col className='border-right'>Challan No: {finalPreviewObj.challanNo}</Col>
                                                        <Col>Date : {finalPreviewObj.challanDate}</Col>
                                                    </Row>
                                                    <Row className='border border-bottom-0'>
                                                        <Col className='border-right'>Place Of Supply : <br />{finalPreviewObj?.placeOfSupply?.label}</Col>
                                                        <Col>Destination:<br /> {finalPreviewObj.destination}</Col>
                                                    </Row>
                                                    <Row className='border border-bottom-0'>
                                                        <Col className='border-right'>Despatch Through :<br /> {finalPreviewObj.despatchThrough}</Col>
                                                        <Col>Vehicle No :<br /> {finalPreviewObj.vehicleNo}</Col>
                                                    </Row>
                                                    <Row className='border'>
                                                        <Col className='border-right'>Mode / Terms of Payment :</Col>
                                                        <Col>{finalPreviewObj.paymentMode}</Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <div className='d-flex justify-content-center'>
                                                <h6><b className='mx-auto text-dark'><u>Tax Invoice</u></b></h6>
                                            </div>
                                            {finalPreviewObj?.products?.length ?
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
                                                        {finalPreviewObj?.products.map((product, ind) => {
                                                            return <tr key={ind}>
                                                                <td>{ind + 1}</td>
                                                                <td>{product.productName}</td>
                                                                <td>{product.hsn}</td>
                                                                <td>{product.invoiceNo}</td>
                                                                <td>{product.baseQty}</td>
                                                                <td>{product.baseUnit}</td>
                                                                <td>{product.altQty}</td>
                                                                <td>{product.altUnit}</td>
                                                                <td>{product.rate}</td>
                                                                <td>{product.discountPercentage}</td>
                                                                <td>{product.discount}</td>
                                                                <td>{product.amount}</td>
                                                            </tr>
                                                        })}

                                                    </tbody>
                                                </table> : null}
                                            <Row style={{ padding: '0 12px 0 12px' }} className='text-dark'>
                                                <Col md={8} className='border border-2 border-dark'>
                                                    <p className='text-dark'>Total Base Quantity : count bqty {finalPreviewObj.totalBaseQty} unit<br />
                                                        Total Alt. Quantity : count aqty {finalPreviewObj.totalAltQty} unit</p><br />
                                                    <h5><b>Rupees {wordify(Number(finalPreviewObj.grandTotal))} Only</b></h5>
                                                </Col>
                                                <Col md={2} className='border border-dark border-2'>
                                                    <table>
                                                        <tr><td>Taxable Amount</td></tr>
                                                        {gsthecked ?
                                                            <>
                                                                <tr><td>CGST 2.50</td></tr>
                                                                <tr><td>SGST 2.50</td></tr>
                                                            </> :
                                                            <tr><td>IGST 5.00</td></tr>}
                                                        <tr><td>Transport</td></tr>
                                                        <tr><td>Round Off</td></tr>
                                                        <tr><td>Grand Total</td></tr>
                                                    </table>
                                                </Col>
                                                <Col md={2} className='border border-2 border-dark text-right' style={{ paddingLeft: '70px' }}>
                                                    <table>
                                                        <tr><td>{finalPreviewObj.totalAmount}</td></tr>
                                                        {gsthecked ?
                                                            <>
                                                                <tr><td>{(finalPreviewObj.totalGst / 2).toFixed(2)}</td></tr>
                                                                <tr><td>{(finalPreviewObj.totalGst / 2).toFixed(2)}</td></tr>
                                                            </> :
                                                            <tr><td>{finalPreviewObj.totalGst.toFixed(2)}</td></tr>}
                                                        <tr><td>{Number(finalPreviewObj.transportCost).toFixed(2)}</td></tr>
                                                        <tr><td>{finalPreviewObj.roundOff}</td></tr>
                                                        <tr><td>{finalPreviewObj.grandTotal}</td></tr>
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
                                        <Form.Label>Invoice No : </Form.Label><br />

                                        <label>ATC{checked ? "N" : ""}/001/2022-23</label>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Bill To : </Form.Label>
                                            <AutoSelect
                                                defaultValue={selectedOption}
                                                onChange={changeSelectedOption}
                                                options={party}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Shipped To : </Form.Label>
                                            <AutoSelect
                                                defaultValue={selectedShippingAddress}
                                                onChange={setSelectedShippingAddress}
                                                options={shippingAddress}
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
                                        <Form.Control type="date" defaultValue={datee} name="challanDate"
                                            value={salesdata.challanDate}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Place of Supply : </Form.Label>
                                        <AutoSelect
                                            defaultValue={selectedPlace}
                                            onChange={setSelectedPlace}
                                            options={locationData}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Destination : </Form.Label>
                                        <Form.Control type="text" name='destination' value={salesdata.destination}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Despatch Through : </Form.Label>
                                        <Form.Control type="text" name='despatchThrough' value={salesdata.despatchThrough}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Vehicle No : </Form.Label>
                                        <Form.Control type="text" name='vehicleNo' value={salesdata.vehicleNo}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Transport Cost : </Form.Label>
                                        <Form.Control type="number" name='transportCost' value={salesdata.transportCost}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Label>Mode / Term of Payments: (in Days) </Form.Label>
                                        <Form.Select aria-label="Default select example" name='paymentMode' value={salesdata.paymentMode} onChange={handleInputs}>
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
                                            <Row style={{ color: '#000 !important' }}>
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
                                                    <Card.Header style={{ textAlign: 'center', color: '#000' }}>Product Master Data</Card.Header>
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
                                                    <Card.Header style={{ textAlign: 'center', color: '#000' }}>Product Balance Data</Card.Header>
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
                                                            <Card.Header style={{ textAlign: 'center', color: '#000' }}>Sale Rate Master</Card.Header>
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
                                                            <Card.Header style={{ textAlign: 'center', color: '#000' }}>Purchase Rate Master</Card.Header>
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
                                                            <Card.Header style={{ textAlign: 'center', color: '#000' }}>Sale Discount Master</Card.Header>
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
                                                            <Card.Header style={{ textAlign: 'center', color: '#000' }}>Purchase Discount Master</Card.Header>
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
                                                            <Card.Header style={{ textAlign: 'center', color: '#000' }}>Sale Tax Master</Card.Header>
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
                                                            <Card.Header style={{ textAlign: 'center', color: '#000' }}>Purchase Tax Master</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Sale Transactions</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Sale Return Transactions</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Purchase Transactions</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Purchase Return Transactions</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Production Transaction</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Consumption Transaction</Card.Header>
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
                                                        <Card.Header style={{ textAlign: 'center', color: '#000' }}>Last 50 Stock Transfer Transaction</Card.Header>
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