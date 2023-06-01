import React, { useState } from 'react';
import logo from '../../../img/AROMIST_LOGO.png';
import sign from '../../../img/sign.jpeg';
import payQr from '../../../img/payment.png';
import { Row, Col, Modal , Dropdown, Button, ButtonGroup} from 'react-bootstrap-v5';
import DeliveryModal from './delivery-modal';

const InvoiceModal = (props) => {
    let v=props.finalPreviewObj?.products.length;
    let l=22-v;
    var arr = Array.apply(null, Array(l)).map(function (y, i) { return i });
   
    const printt=(e)=>{
        window.print();
    }

    const [deliveryModal, handleDeliveryModal] = useState(false);
    // const today = new Date();
    // const year = today.getFullYear();

    const wordify = (num) => {
        const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const formatTenth = (digit, prev) => {
            return 0 === digit ? "" : " " + (1 === digit ? double[prev] : tens[digit])
        };
        const formatOther = (digit, next, denom) => {
            return (0 !== digit && 1 !== next ? " " + single[digit] : "") + (0 !== next || digit > 0 ? " " + denom : "")
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
                    words.push(0 !== digit ? " " + single[digit] + " Hundred" + (0 !== num[index + 1] && 0 !== num[index + 2] ? " and" : "") : "");
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
                    words.push(0 !== digit ? " " + single[digit] + " Hundred" + (0 !== num[index + 1] || 0 !== num[index + 2] ? " and" : " Crore") : "")
            };
            res = words.reverse().join("")
        } else res = "";
        return res
    };

    const [value,setValue]=useState('Original Copy');
    const handleSelect=(e)=>{
    setValue(e)
    }
    const [proforma,setProforma]=useState('');
    const handleSelectP=(e)=>{
    setProforma(e)
    }
    const clearCopynProformaValue=(e)=>{
        setProforma('');
        setValue('Original Copy');
    }


    // const number = props?.finalPreviewObj?.grandTotal;
    // let finalPrice = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(props?.finalPreviewObj?.grandTotal);

    let ino = props.finalPreviewObj.invno;
    let substring = "N"
    let nongst = ino.includes(substring);

    return (
        <div id="wrapper">
            {deliveryModal ?
                <DeliveryModal
                    deliveryModal={deliveryModal}
                    handleDeliveryModal={handleDeliveryModal}
                    finalPreviewObj={props.finalPreviewObj}
                    checked={props.checked}
                /> : null}
            <Modal show={props.show4 && Object.keys(props.finalPreviewObj).length} onHide={props.handleClose4} fullscreen={true} aria-labelledby="example-modal-sizes-title-sm">
                {/* <Modal.Header closeButton>
                                        <Modal.Title>Quotation / Bill / Tax Invoice || Invoice No : ATC{checked ? "N" : ""}/001/2022-2023</Modal.Title>
                                        <Pdf targetRef={ref} filename="testgst.pdf" scale={0.5}>
                                            {({ toPdf }) =>
                                                <Button variant="success" onClick={toPdf}>Save PDF</Button>
                                            }
                                        </Pdf>
                                    </Modal.Header> */}
                <Modal.Body>
                    <div className='non-printable'>                                         
                        <Dropdown as={ButtonGroup} onSelect={handleSelect}>
                            <Button variant="success" onClick={printt}>PRINT</Button>

                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Duplicate Copy">Duplicate Copy</Dropdown.Item>
                                <Dropdown.Item eventKey="Triplicate Copy">Triplicate Copy</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>                                          
                        <Button className='btn-default ml-3' onClick={() => handleDeliveryModal(true)}>Generate DO</Button>
                        <Button className='btn-info ml-3' onClick={handleSelectP}>Proforma invoice</Button>
                        <Button className='btn-warning ml-3' onClick={clearCopynProformaValue}>Set Default</Button>
                    </div>
                     <div className='printable'>
                        <div className='original'>
                        <Row className='d-flex justify-content-center'>
                            <Col md={3}>
                                <img className='m-auto' src={logo} alt="logo" width="150px" />
                            </Col>
                            <Col md={7} className=' text-dark text-center'>
                                <h3><b>Aromist Tea Co.</b></h3>
                                <p>
                                    GSTIN / UIN : 19ATHPP2711R1Z2<br />
                                    FSSAI LIC No : 8268682492<br />
                                    Netaji Subhash Road, Subhash Pally
                                    Siliguri - 734001
                                    Dist : Darjeeling
                                    State: West Bengal, Code: 19<br />
                                    Ph: +91 6294811689 || E-Mail: aromisttea@gmail.com
                                </p>
                            </Col>
                            <Col md={2}>
                                {value}
                            </Col>
                        </Row>           
                             
                        <div className='d-flex justify-content-center'>
                            <h6><b className='mx-auto text-dark'><u><big>
                            {proforma ? 'Proforma Invoice':
                                (nongst===true)? 'Bill':'Tax Invoice'
                            }
                                </big></u></b></h6>
                        </div>
                        <div>
                        <Row style={{fontSize:'14px', padding:'0 12px'}}>
                            <Col md={6}>
                                <Row className='border border-bottom-0 border-dark'>
                                    <Col>
                                        {/* <p className='m-0'></p> */}
                                        <Row>
                                        <Col md={8} lg={8} xl={8} style={{height:'63px'}}>
                                            <b>BILL TO: 
                                            &nbsp;&nbsp;<span style={{fontSize:'15px'}}>{props.finalPreviewObj?.billto?.label}</span></b><br />
                                            {props.finalPreviewObj?.billto?.companyDetails.address} <br />
                                        </Col>
                                        <Col className='p-0'>
                                            <div>
                                                GSTIN: {props.finalPreviewObj?.billto?.companyDetails.gst}<br />
                                                Phone: +91 {props.finalPreviewObj?.billto?.companyDetails.contactNo}
                                                </div>
                                        </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='border border-bottom-0 border-dark'>
                                    <Col md={8} lg={8} xl={8} style={{height:'64px'}}>
                                        {/* <p className='m-0'><b>SHIPPED TO:</b></p> */}
                                        <b>SHIPPED TO: 
                                            &nbsp;&nbsp;<span style={{fontSize:'15px'}}>{props.finalPreviewObj?.billto?.label}</span></b><br />
                                        <p style={{marginBottom:'1px'}}>
                                            {props.finalPreviewObj?.shipto?.label}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="border-top border-right border-left-0 border-bottom-0 border-dark">

                                <Row className='border border-bottom-0 '>
                                    <Col className='border-right border-dark' md={4} lg={4} xl={4}><b>INVOICE NO.:</b><br />{props.finalPreviewObj.invno}</Col>
                                    <Col><b>DATE:</b> <br /> {props.finalPreviewObj.billdate}</Col>
                                    <Col className='border-left border-dark'>CHALLAN NO: {props.finalPreviewObj.challanNo}</Col>
                                </Row>
                                <Row className='border border-bottom-0 border-left-0 border-right-0 border-dark'>
                                    <Col className='border-right' md={4} lg={4} xl={4} style={{height:'62px'}}>PLACE OF SUPPLY :<br />{props.finalPreviewObj?.placeOfSupply?.label}</Col>
                                    {/* <Col>Destination:<br /> {props.finalPreviewObj.destination}</Col> */}
                                {/* </Row>
                                <Row className='border border-bottom-0'> */}
                                    <Col className='border-left border-dark'>DESPATCH THROUGH :<br /> {props.finalPreviewObj.despatchThrough}</Col>
                                    <Col className='border-left border-dark'>VEHICLE NO:<br /> {props.finalPreviewObj.vehicleNo}</Col>
                                </Row>
                                <Row className='border border-left-0 border-bottom-0 border-right-0 border-dark'>
                                    <Col >MODE / TERMS OF PAYMENT :</Col>
                                    <Col>{props.finalPreviewObj.paymentMode}</Col>
                                </Row>
                            </Col>
                        </Row>
                        
                        {props.finalPreviewObj?.products?.length ?
                            <table className="table-border table-sm billView" width="100%">
                                
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th className='text-left' style={{width:'302.478px'}}>Particulars</th>
                                        <th>HSN / SAC</th>
                                        <th>Invoice NO</th>
                                        {/* <th>Bag No</th> */}
                                        <th>B-Qty</th>
                                        <th>B-Unit</th>
                                        <th>A-Qty</th>
                                        <th>A-Unit</th>
                                        <th>Rate</th>
                                        <th style={{width:'52.6px'}}>Disc %</th>
                                        <th>Discount</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                {/* <span style={{height: '663.469px', width:'150%'}}> */}
                                <tbody>
                                    {props.finalPreviewObj?.products.map((product, ind) => {
                                        return <tr key={ind}>
                                            <td>{ind + 1}</td>
                                            <td className='text-left'>{product.productName}</td>
                                            <td>{product.hsn}</td>
                                            <td>{product.invoiceNo}</td>
                                            {/* <td>{product.bagNo}</td> */}
                                            <td>{product.baseQty}</td>
                                            <td>{product.baseUnit}</td>
                                            <td>{product.altQty}</td>
                                            <td>{product.altUnit}</td>
                                            <td>{product.rate}</td>
                                            <td>{product.discountPercentage}</td>
                                            <td>{new Intl.NumberFormat('en-IN').format(Number(product.discount))}</td>
                                            <td>{new Intl.NumberFormat('en-IN').format(Number(product.amount))}</td>
                                        </tr>
                                        
                                    })}
                                    
                                    {l <= 0 ? (console.log(v)
                                            ):(
                                                
                                                // console.log(arr)
                                                     
                                                arr.map((i) =>{
                                                return <tr>
                                                    <td style={{color:'#fff'}}>{i}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    </tr>;
                                                })  
                                            )
                                    }
                                </tbody>
                                {/* </span> */}
                            </table> : null}
                        <Row className='billSummary'>
                            <Col md={8} className='border border-dark'>
                                <p>Total Base Quantity : {props?.finalPreviewObj?.totalBaseQty} KGS / BDL / PAC<br />
                                    Total Alt. Quantity : {props?.finalPreviewObj?.totalAltQty} BAGS / PAC / PCS / DZ</p><br />
                                <h5><b>Rupees {wordify(Number(props?.finalPreviewObj?.grandTotal))} Only</b></h5>
                            </Col>
                            <Col md={2} className='border border-dark border-left-0 border-right-0' style={{fontSize:'14px'}}>
                                <table>
                                    <tr><td>Taxable Amount</td></tr>
                                    {props.gstChecked ?
                                        <>
                                            <tr><td>CGST 2.50%</td></tr>
                                            <tr><td>SGST 2.50%</td></tr>
                                        </> :
                                        <tr><td>IGST 5.00%</td></tr>}
                                    <tr><td>Transport</td></tr>
                                    <tr className='border-bottom border-dark'><td>Round Off</td></tr>
                                    <tr><td><b>Grand Total</b></td></tr>
                                </table>
                            </Col>
                            <Col md={2} className='border border-dark text-right' style={{ paddingLeft: '70px', fontSize:'14px'}}>
                                <table>
                                    <tr><td>{new Intl.NumberFormat('en-IN').format(Number(props?.finalPreviewObj?.totalAmount))}</td></tr>
                                    {props.gstChecked ?
                                        <>
                                            <tr><td>{new Intl.NumberFormat('en-IN').format(Number((props?.finalPreviewObj?.totalGst / 2).toFixed(2)))}</td></tr>
                                            <tr><td>{new Intl.NumberFormat('en-IN').format(Number((props?.finalPreviewObj?.totalGst / 2).toFixed(2)))}</td></tr>
                                        </> :
                                        <tr><td>{new Intl.NumberFormat('en-IN').format(Number(props?.finalPreviewObj?.totalGst))}</td></tr>}
                                    <tr><td>{new Intl.NumberFormat('en-IN').format(Number(props?.finalPreviewObj?.transportCost))}.00</td></tr>
                                    <tr className='border-bottom border-dark'><td>{props?.finalPreviewObj?.roundOff}</td></tr>
                                    <tr><td><b>{new Intl.NumberFormat('en-IN').format(Number(props?.finalPreviewObj?.grandTotal))}.00
                                    
                                    </b></td></tr>
                                </table>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <small>
                                    <p>Terms & Condition</p>
                                    <ol>
                                        <li>Payment condition shall be 100% in advance</li>
                                        <li>Minimum purchase quantity should be 50kg</li>
                                        <li>The validity of this quotation is for 10 days</li>
                                        <li>Transportation depends on state wise</li>
                                        <li>Office is closed on Sunday and National Holidays</li>
                                        <li>All condition reserved within Siliguri Jurisdiction only</li>
                                        <li>Goods Once sold cant be return</li>
                                    </ol>
                                </small>
                            </Col>
                            <Col className='float-right'>
                                <small className='float-right'>
                                    <p>Bank Details</p>
                                    <ul>
                                        <li>Aromist Tea Co.</li>
                                        <li>Bank Name: ICICI Bank</li>
                                        <li>Account No: 387005500180</li>
                                        <li>IFSC Code: ICIC0003870</li>
                                    </ul>
                                </small>
                            </Col>
                            <Col>
                                <img src={payQr} width="180px" alt="paymentQr" />
                            </Col>
                            <Col className='text-right'>
                                <p>For Aromist Tea Co.</p><br/>
                                <span><img src={sign} width="150px" alt="sign" /></span>
                                <br/><br/>
                                <p>Authorised Signature</p>
                            </Col>
                        </Row>
                        <p className='d-flex justify-content-center' style={{fontSize:'13px'}}>This is computer generated invoice</p>
                        </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default InvoiceModal;