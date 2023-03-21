import React from 'react';
import logo from '../../../img/AROMIST_LOGO.png';
import sign from '../../../img/sign.jpeg';
import { Row, Col, Modal, Button } from 'react-bootstrap-v5';

const DeliveryModal = (props) => {

    const input = props.finalPreviewObj?.billto?.companyDetails.gst;
    const o1 = input.replace(input.slice(0, 2), '');
    const o2 = o1.replace(input.slice(12, 15), '');

    const i1 = props.finalPreviewObj.invno;
    const i2 = i1.replace(i1.slice(0, 4), '');
    return (
        <div id="wrapper">
            <Modal show={props.deliveryModal && Object.keys(props.finalPreviewObj).length} onHide={() => props.handleDeliveryModal(false)} fullscreen={true} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Body>
                    <button className='non-printable btn-primary' onClick={() => window.print()}>PRINT</button>
                    <div className='printable'>
                        <Row className='d-flex justify-content-center'>
                            
                            <Col md={3}>
                                <img className='m-auto' src={logo} alt="logo" width="150px" />
                            </Col>
                            <Col md={7} className='text-black text-center'>
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
                            <h4 className='text-center'>Delivery Order</h4>
                            </Col>
                        </Row>
                        <Row style={{fontSize:'14px', padding:'0 12px'}}>
                            <Col md={6}>
                                <b>Delivery Order No : {props.checked ? "DN" : "DG"}{i2}</b>
                            </Col>
                            <Col md={6} className="text-right mb-2">
                                <b>Date: {props.finalPreviewObj.challanDate}</b>
                            </Col>
                            <Col md={5}>
                                <Row   style={{border:'1px solid #000', borderRight:'0', borderBottom:'0'}}>
                                    <Col>
                                        <p className='m-0'><b>TO:</b></p>
                                        <Row>
                                            <Col md={8} style={{height:'63px'}}>
                                            <b>{props.finalPreviewObj?.placeOfSupply?.label}</b><br />
                                                {props.finalPreviewObj?.placeOfSupply?.otherDetails.address},  
                                                Pin: {props.finalPreviewObj?.placeOfSupply?.otherDetails.pin}
                                            </Col>
                                            <Col md={4} className='p-0'>
                                                PH:  {props.finalPreviewObj?.placeOfSupply?.otherDetails.phone}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={7}>
                                <Row style={{border:'1px solid #000', borderBottom:'0'}}>
                                    <Col>
                                        <Row>
                                            <Col md={8} lg={8} xl={8} style={{height:'84px'}}>
                                            <p className='m-0'><b>DELIVERY TO: </b></p>
                                                <b>{props.finalPreviewObj?.billto?.label}</b><br />
                                                {props.finalPreviewObj?.billto?.companyDetails.address} 
                                            </Col>
                                            <Col>
                                                <div className='float-right'>
                                                    GSTIN: {props.finalPreviewObj?.billto?.companyDetails.gst}<br/>
                                                    PAN: {o2}<br/>
                                                    PH: +91 {props.finalPreviewObj?.billto?.companyDetails.contactNo}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {props.finalPreviewObj?.products?.length ?
                            <table className="table-border table-sm" width="100%"  style={{fontSize:'14px'}}>
                                <thead>
                                    <tr>
                                        <th className='text-left'>MARK</th>
                                        <th>INV NO</th>
                                        <th>KGS/BAG</th>
                                        <th>BAGS</th>
                                        <th>TOTAL KGS</th>
                                        <th>BAG NO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.finalPreviewObj?.products.map((product, ind) => {
                                        return <tr key={ind}>
                                            <td className='text-left'>{product.productName}</td>
                                            <td>{product.invoiceNo}</td>
                                            <td>{Number(product.baseQty / product.altQty).toFixed(2)}</td>
                                            <td>{product.altQty}</td>
                                            <td>{product.baseQty}</td>
                                            <td>{product.bagNo}</td>
                                        </tr>
                                    })}

                                </tbody>
                            </table> : null}
                        <Row style={{ padding: '0 12px 0 12px' }}>
                            <Col md={12} style={{border:'1px solid #000'}}>
                                <p>Total KGS : {props.finalPreviewObj?.totalBaseQty} KGS<br />
                                    Total BAGS : {props.finalPreviewObj?.totalAltQty} BAGS</p><br />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={8}>
                                <small>
                                    <p>Please note that in case original of this letter will not produce for delivery than please <br />
                                        contact our Siliguri H.O. for the confirmation on release and please let the tea within the<br /> 5 days of Delivery Order date.
                                    </p>
                                </small>
                            </Col>
                            {/* <Col>
                                                    <img src={payQr} width="180px" alt="paymentQr" />
                                                </Col> */}
                            <Col md={4} className='text-right'>
                                <p>For Aromist Tea Co.</p><br/>
                                <img src={sign} width="150px" alt="sign" /><br/><br/>
                                <p>Authorised Signature</p>
                            </Col>
                        </Row>
                        <p className='d-flex justify-content-center'>This is computer generated receipt</p>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default DeliveryModal;