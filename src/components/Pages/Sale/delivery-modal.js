import React from 'react';
import logo from '../../../img/AROMIST_LOGO.png';
import sign from '../../../img/sign.jpeg';
import { Row, Col, Modal } from 'react-bootstrap-v5';

const DeliveryModal = (props) => {
    return (
        <div id="wrapper">
            <Modal show={props.deliveryModal && Object.keys(props.finalPreviewObj).length} onHide={() => props.handleDeliveryModal(false)} fullscreen={true} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Body>

                    <button className='non-printable btn-primary' onClick={() => window.print()}>PRINT</button>
                    <div className='printable'>
                        <Row className='d-flex justify-content-center'>
                            <Col md={12}>
                                <h4 className='text-center'>Delivery Order</h4>
                            </Col>
                            <Col md={3}>
                                <img className='m-auto' src={logo} alt="logo" width="150px" />
                            </Col>
                            <Col md={9} className=' text-dark'>
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
                        </Row>
                        <Row>
                            <Col md={6}>
                                <b>Delivery Order No.: ATC{props.checked ? "N" : ""}/001/2022-2023</b>
                            </Col>
                            <Col md={6} className="text-right mb-2">
                                <b>Date: {props.finalPreviewObj.challanDate}</b>
                            </Col>
                            <Col md={6}>
                                <Row className='border border-right-0'>
                                    <Col>
                                        <p className='m-0'><small>To:</small></p>
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
                                        <p className='m-0'><small>Delivery To:</small></p>
                                        <p>
                                            {props.finalPreviewObj?.billto?.label}<br />
                                            {props.finalPreviewObj?.billto?.companyDetails.address} <br />
                                            GSTIN: {props.finalPreviewObj?.billto?.companyDetails.gst}
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
                                        <th>MARK</th>
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
                                            <td>{product.productName}</td>
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
                                    Total BAGS : {props.finalPreviewObj?.totalAltQty} BAG</p><br />
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
                            <Col md={4}>
                                <p>For Aromist Tea Co.</p>
                                <img src={sign} width="150px" alt="sign" />
                                <p>Authorised Signature</p>
                            </Col>
                        </Row>
                        <p className='d-flex justify-content-center'>This is computer generated invoice</p>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default DeliveryModal;