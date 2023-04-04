import React, { useRef, useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Headers/Header';
import Topnav from '../../Headers/Topnav';
import AutoSelect from 'react-select';
import TableRows from "../test/TableRows";
import logo from '../../../img/AROMIST_LOGO.png';

import sign from '../../../img/sign.jpeg';
import DeliveryModal from './delivery-modal';
import { Card, Row, Col, Form, Button, Tabs, Tab, Table, Badge, Modal, InputGroup, FormControl } from 'react-bootstrap-v5';
import { add, getCount, fetchById, fetchByIdAndUpdate, fetchAll } from '../../../utils/firebase-crud';
import InvoiceModal from './invoice-modal';

const invoiceCollectionName = "/invoice";
const billToCollectionName = "/billTo"; 

const xparty = [
    {
        value: 'AshapuraGruhUshyog',
        label: 'Ashapura Gruh Ushyog',
        companyDetails: {
            contactNo: "+91-9772980074",
            gst: "08FRDPB4061F1Z4",
            address: "Rajasthan"
        },
        shippingAddress: [{
            value: 'add1',
            label: 'Rajasthan'
        }, {
            value: 'add2',
            label: 'Rajasthan 1'
        }]
    },
    {
        value: 'M.Kannan',
        label: 'M. Kannan',
        companyDetails: {
            contactNo: "+91 9894685818, +91 7550014224",
            gst: "N/A",
            address: "Namakkal, Tamil Nadu - 637002"
        },
        shippingAddress: [{
            value: 'Namakkal, Tamil Nadu - 637002',
            label: 'Namakkal, Tamil Nadu - 637002'
        }, {
            value: ' Tamil Nadu - 637002',
            label: ' Tamil Nadu - 637002'
        }]
    },
    {
        value: 'Shree Shyam Tea Co.',
        label: 'Shree Shyam Tea Co.',
        companyDetails: {
            contactNo: "+91 9126840029",
            gst: "19AJFPS5165G1ZU",
            address: "Mahavir Sthan Siliguri - 734001 Siliguri- 734003"
        },
        shippingAddress: [{
            value: 'Mahavir Sthan Siliguri - 734001 Siliguri- 734003',
            label: 'Mahavir Sthan Siliguri - 734001 Siliguri- 734003'
        },]
    },
    {
        value: 'Sunil Kumar Jha',
        label: 'Sunil Kumar Jha',
        companyDetails: {
            contactNo: "+91 9167319691",
            gst: "10AFHPJ5612B1ZA",
            address: "Madhubani, Bihar - 847403"
        },
        shippingAddress: [{
            value: 'Village + Post - Rataul Via- Jhanjharpur (R S) Dist - Madhubani, Bihar - 847403',
            label: 'Village + Post - Rataul Via- Jhanjharpur (R S) Dist - Madhubani, Bihar - 847403'
        }, ]
    },
    {
        value: 'R.S Traders',
        label: 'R.S Traders',
        companyDetails: {
            contactNo: "9876566210",
            gst: "19zmajjnkslk6",
            address: "Nawada"
        },
        shippingAddress: [{
            value: 'Nawada',
            label: 'Nawada 2'
        }]
    }
];
const locationData = [
    {
        value: 1,
        label: "SREEMA TEA WAREHOUSING PVT.LTD.",
        otherDetails: {
            address: "EASTERN BYPASS, THAKURNAGAR, SAHUDANGI",
            pin: "735135",
            phone: "+917699999475"
        }
    },
    {
        value: 2,
        label: "Aromist Tea Co. Godown",
        otherDetails: {
            address: "CHAMPASARI MAIN ROAD, CHAMPASARI, SILIGURI",
            pin: "734001",
            phone: "+91 6294-811689, +91 9609726944"
        }
    },
    // {
    //     value: 3,
    //     label: "New Delhi",
    //     otherDetails: {
    //         address: "ijkl",
    //         pin: "700045",
    //         phone: "9865741653"
    //     }
    // },
    // {
    //     value: 4,
    //     label: "Indore",
    //     otherDetails: {
    //         address: "mnop",
    //         pin: "700054",
    //         phone: "9865796203"
    //     }
    // },
    // {
    //     value: 5,
    //     label: "Chennai",
    //     otherDetails: {
    //         address: "qrst",
    //         pin: "700063",
    //         phone: "9866741203"
    //     }
    // }
];

const Sale = () => {


    const navigate = useNavigate();
    const params = useParams();
    const [key, setKey] = useState('sale');
    const [show, setShow] = useState(false);
    const [show4, setShow4] = useState(false);
    const [deliveryModal, handleDeliveryModal] = useState(false);
    const [checked, setChecked] = useState(false);
    const [gstChecked, setGstChecked] = useState(true);
    const [party, updateParty] = useState([]);

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
        invno: "", billto: "", shipto: "", billdate: "", challanNo: "", challanDate: "", placeOfSupply: "", transportCost: "0", despatchThrough: "", vehicleNo: "", paymentMode: "",
    });
    const [finalPreviewObj, updateFinalPreviewObj] = useState({});
    const [count, setCount] = useState(0);

    let name, value;

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const handleClose = () => setShow(false);

    const prohandleClose = () => setProShow(false);

    const fetchList = async () => {
        const listRes = await fetchAll(billToCollectionName);
        if (listRes.success) {
            const localArr = [];
            if (listRes.data && listRes.data.length) {
                listRes.data.forEach(each => {
                    localArr.push({
                        value: each.id,
                        label: each.otherDetails.name,
                        companyDetails: {
                            contactNo: each.otherDetails.phone,
                            gst: each.otherDetails.gst,
                            address: each.otherDetails.address,
                        },
                        shippingAddress: each.otherDetails.shippingAddresses
                    });
                });
            }
            updateParty([...localArr]);
        }
    };

    const getInputDisplayFullDateFormat = (date) => {
        const day = date.getDate().toString().length === 1 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth().toString().length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const year = date.getFullYear();

        return year + '-' + month + '-' + day;
    };

    const getInvoiceCount = async (type) => {
        const localCount = await getCount(invoiceCollectionName, type);
        

        setSalesdata({
            ...salesdata,
            invno: `ATC${checked ? "N" : ""}/00${localCount + 1}/2023-24`
        })
        setCount(localCount + 1);
    };

    const openDetails = async (id) => {
        const detailsRes = await fetchById(invoiceCollectionName, id);
        console.log("detailsRes ", detailsRes)
        if (detailsRes.success) {
            setSalesdata({
                ...detailsRes.data,
                challanDate: getInputDisplayFullDateFormat(new Date(detailsRes.data?.challanDate?.seconds * 1000)),
                billdate: getInputDisplayFullDateFormat(new Date(detailsRes.data?.billdate?.seconds * 1000))
            });
            party.forEach(each => {
                if (each.value === detailsRes.data.billto.value) {
                    setSelectedOption(each);
                    updateShippingAddresses(each.shippingAddress);
                }
            });
            setSelectedShippingAddress(detailsRes.data.shipto);
            setSelectedPlace(detailsRes.data.placeOfSupply);
            if (detailsRes.data.products) {
                setRowsData([...detailsRes.data.products]);
            }
        }
    };

    useEffect(() => {
        if (!params.id) {
            getInvoiceCount(checked);
        } else {
            openDetails(params.id);
        }
        
    }, [checked]);

    const addTableRows = () => {

        const rowsInput = {
            productName: '',
            hsn: '90240',
            invoiceNo: '',
            bagNo: '',
            baseQty: '',
            baseUnit: 'Kg',
            altQty: '',
            altUnit: 'Bag',
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
            } else {
                discountPercentage = rowsInput[index].discountPercentage;
            }
            discount = (Number(value) * Number(rowsInput[index].rate) * Number(discountPercentage)) / 100;
            amount = (Number(value) * Number(rowsInput[index].rate)) - discount;
        } else if (name === "rate" && rowsInput[index].baseQty) {
            if (!rowsInput[index].discountPercentage) {
                discountPercentage = 0;
            } else {
                discountPercentage = rowsInput[index].discountPercentage;
            }
            discount = (Number(value) * Number(rowsInput[index].baseQty) * Number(discountPercentage)) / 100;
            amount = (Number(value) * Number(rowsInput[index].baseQty)) - discount;
        } else if (name === "discountPercentage" && rowsInput[index].baseQty && rowsInput[index].rate) {
            discount = (Number(rowsInput[index].rate) * Number(rowsInput[index].baseQty) * Number(value)) / 100;
            amount = (Number(rowsInput[index].rate) * Number(rowsInput[index].baseQty)) - discount;
        } else {
            discount = rowsInput[index].discount ? Number(rowsInput[index].discount) : 0;
            amount = rowsInput[index].amount ? Number(rowsInput[index].amount) : 0;
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

    const seePreview = async () => {

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

        // const totalGst = totalAmount * 0.05;
        var totalGst = checked ? 0 : totalAmount * 0.05;
        console.log(totalGst);
        const roundOff = Number(((totalAmount + totalGst + Number(salesdata.transportCost)) % 1).toFixed(2));

        if (roundOff > 0.49) {
            grandTotal = Math.ceil((totalAmount + totalGst + Number(salesdata.transportCost)));
        } else {
            grandTotal = Math.floor((totalAmount + totalGst + Number(salesdata.transportCost)));

        }
        // grandTotal = (totalAmount + totalGst + Number(salesdata.transportCost)) - (roundOff > 0.49 ? 0 : roundOff.toFixed(2));
        // const current_timestamp = Timestamp.fromDate(new Date());

        const reqBody = {
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
        };
        const apiReq = {
            ...salesdata,
            billto: {
                label: selectedOption.label,
                value: selectedOption.value,
                companyDetails: selectedOption.companyDetails
            },
            shipto: selectedShippingAddress,
            placeOfSupply: selectedPlace,
            isNonGst: checked,
            isNotIgst: gstChecked,
            products: [...rowsData],
            totalAmount: totalAmount,
            totalBaseQty: totalBaseQty,
            totalAltQty: totalAltQty,
            totalGst: totalGst,
            roundOff: roundOff > 0.49 ? 0: roundOff,
            grandTotal: grandTotal,
            billdate: Timestamp.fromDate(new Date(salesdata.billdate)),
            challanDate: Timestamp.fromDate(new Date(salesdata.challanDate)),
        }
        console.log("reqBody ", apiReq);
        if (!params.id) {
            const addRes = await add(invoiceCollectionName, apiReq);
            if (addRes.success) {
                updateFinalPreviewObj(reqBody);
                handleShow4();
            }
        } else {
            const updateRes = await fetchByIdAndUpdate(invoiceCollectionName,params.id, apiReq);
            if (updateRes.success) {
                updateFinalPreviewObj(reqBody);
                handleShow4();
            }
        }
    };

    const cancel = () => {
        navigate("/sale");
    };

    useEffect(() => {
        fetchList();
    }, []);

    
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

    // const totalGst = totalAmount * 0.05;
    var totalGst = checked ? 0 : totalAmount * 0.05;
    console.log(totalGst);
    const roundOff = Number(((totalAmount + totalGst + Number(salesdata.transportCost)) % 1).toFixed(2));

    if (roundOff > 0.49) {
        grandTotal = Math.ceil((totalAmount + totalGst + Number(salesdata.transportCost)));
    } else {
        grandTotal = Math.floor((totalAmount + totalGst + Number(salesdata.transportCost)));

    }

    
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
                                        <h5 className="text-gray-800">Sell Entry Form</h5>
                                        
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
                                                disabled={params.id}
                                                onChange={(e) => setChecked(false)}
                                            />
                                            <Form.Check
                                                inline
                                                label="Non Gst"
                                                name="bill_type"
                                                type="radio"
                                                id="checked"
                                                disabled={params.id}
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
                                                disabled={params.id}
                                                onChange={(e) => { setGstChecked(true); }}
                                            />
                                            <Form.Check
                                                inline
                                                label="IGST"
                                                name="gst_type"
                                                type="radio"
                                                id="Gst"
                                                disabled={params.id}
                                                onChange={(e) => { setGstChecked(false); }}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" size="sm" onClick={cancel}>
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
                                {deliveryModal ?
                                    <DeliveryModal
                                        deliveryModal={deliveryModal}
                                        handleDeliveryModal={handleDeliveryModal}
                                        finalPreviewObj={finalPreviewObj}
                                        checked={checked}
                                    /> : null}
                                {/* print modal */}
                                {show4 ?
                                    <InvoiceModal style={{overflow:'hidden'}}
                                        show4={show4}
                                        finalPreviewObj={finalPreviewObj}
                                        handleClose4={handleClose4}
                                        gstChecked={gstChecked}
                                        checked={checked}
                                    /> : null}
                                {/* print modal */}
                                <Row>
                                    <Col md={3}>
                                        <Form.Label>Invoice No : &nbsp;</Form.Label>

                                        <label>{!params.id ? `ATC${checked ? "N" : ""}/00${count}/2023-24` : salesdata.invno}</label>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>Bill Date :</Form.Label>
                                        <Form.Control type="date" defaultValue={datee}
                                            name="billdate"
                                            value={salesdata.billdate}
                                            onChange={handleInputs}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>Challan No : </Form.Label>
                                        <Form.Control type="text" name='challanNo'
                                            value={salesdata.challanNo}
                                            onChange={handleInputs}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>DO. Date : </Form.Label>
                                        <Form.Control type="date" defaultValue={datee} name="challanDate"
                                            value={salesdata.challanDate}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Place of Supply : </Form.Label>
                                        <AutoSelect
                                            value={selectedPlace}
                                            onChange={setSelectedPlace}
                                            options={locationData}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                <Col md={3}>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Row>
                                                <Col><Form.Label>Bill To : </Form.Label></Col>
                                                <Col >
                                                    <a onClick={() => navigate("/bill-to")} style={{float:'right',cursor:'pointer'}} >
                                                        <u className='text-primary'><small className='text-primary'>Add New</small></u>                                        
                                                    </a>
                                                </Col>
                                            </Row>
                                            <AutoSelect
                                                value={selectedOption}
                                                onChange={changeSelectedOption}
                                                options={party}
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col md={2}>
                                        <Form.Label>Despatch Through : </Form.Label>
                                        <Form.Control type="text" name='despatchThrough' value={salesdata.despatchThrough}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>Vehicle No : </Form.Label>
                                        <Form.Control type="text" name='vehicleNo' value={salesdata.vehicleNo}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label>Transport Cost : </Form.Label>
                                        <Form.Control type="number" name='transportCost' value={salesdata.transportCost}
                                            onChange={handleInputs} />
                                    </Col>                                                                                                        
                                    <Col md={3}>
                                        <Form.Label>Mode / Term of Payments: (in Days) </Form.Label>
                                        <Form.Select aria-label="Default select example" name='paymentMode' value={salesdata.paymentMode} onChange={handleInputs}>
                                            <option>Select</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Bank">Bank</option>
                                            <option value="5 Days">5 Days</option>
                                            <option value="10 Days">10 Days</option>
                                            <option value="20 Days">20 Days</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group as={Row} className="mb-2" controlId="formPlaintextVnumber">
                                            <Form.Label>Shipped To : </Form.Label>
                                            <AutoSelect
                                                value={selectedShippingAddress}
                                                onChange={setSelectedShippingAddress}
                                                options={shippingAddress}
                                            />
                                        </Form.Group>
                                    </Col>  
                                    <Col md={4}>
                                        <Form.Label>Note : </Form.Label>
                                        <Form.Control type="text" name='destination' value={salesdata.destination}
                                            onChange={handleInputs} />
                                    </Col>
                                    <Col>
                                        <Row>
                                        <Col md={3}>
                                            <Row>Total Amount: </Row>
                                            <Row>Total Gst: </Row>
                                            <Row>RoundOff:</Row>
                                            <Row>Grand Total:</Row>
                                        </Col>
                                        <Col md={9}>
                                            <Row> {totalAmount}</Row>
                                            <Row> {totalGst.toFixed(2)}</Row>
                                            <Row> {roundOff}</Row>
                                            <Row> {grandTotal}</Row>
                                        </Col>
                                        </Row>
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
                                                    <th>Bag NO</th>
                                                    <th>Qty</th>
                                                    <th style={{width:'22px'}}>Unit</th>
                                                    <th>Qty</th>
                                                    <th>Unit</th>
                                                    <th>Rate</th>
                                                    <th style={{width:'59px'}}>Disc %</th>
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