import React from 'react';
import logo from '../../../img/AROMIST_LOGO.png';
import sign from '../../../img/sign.jpeg';
import { Row, Col, Modal } from 'react-bootstrap-v5';

const DeliveryModal = (props) => {

    const input = props.finalPreviewObj?.billto?.companyDetails.gst;
    const o1 = input.replace(input.slice(0, 2), '');
    const o2 = o1.replace(input.slice(11, 14), '');
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
                            <h4 className='text-center'>Delivery Order</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <b>Delivery Order No : {props.checked ? "DN" : "DG"}/001</b>
                            </Col>
                            <Col md={6} className="text-right mb-2">
                                <b>Date: {props.finalPreviewObj.challanDate}</b>
                            </Col>
                            <Col md={6}>
                                <Row className='border border-right-0'>
                                    <Col>
                                        <p className='m-0'><small>TO:</small></p>
                                        <p>
                                            {props.finalPreviewObj?.placeOfSupply?.label}<br />
                                            {props.finalPreviewObj?.placeOfSupply?.otherDetails.address} <br />
                                            Pin: {props.finalPreviewObj?.placeOfSupply?.otherDetails.pin}
                                            <span className='float-right'>PH: +91 {props.finalPreviewObj?.placeOfSupply?.otherDetails.phone}</span>
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className='border'>
                                    <Col>
                                        <p className='m-0'><small>DELIVERY TO:</small></p>
                                        <p>
                                            {props.finalPreviewObj?.billto?.label}<br />
                                            {props.finalPreviewObj?.billto?.companyDetails.address} <br />
                                            GSTIN: {props.finalPreviewObj?.billto?.companyDetails.gst}<br/>
                                            PAN: {o2}
                                            <span className='float-right'>PH: +91 {props.finalPreviewObj?.billto?.companyDetails.contactNo}</span>
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {props.finalPreviewObj?.products?.length ?
                            <table className="tableclass table-sm" width="100%">
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
                        <Row style={{ padding: '0 12px 0 12px' }} className='text-dark'>
                            <Col md={12} className='border border-2 border-dark'>
                                <p className='text-dark'>Total KGS : {props.finalPreviewObj?.totalBaseQty} KGS<br />
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
                                <p>For Aromist Tea Co.</p>
                                <img src={sign} width="150px" alt="sign" />
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