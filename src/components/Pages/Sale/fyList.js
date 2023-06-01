import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Headers/Header';
import { Row, Col, Button } from 'react-bootstrap-v5';
import InvoiceModal from './invoice-modal';
import { deleteById, fetchAll, fetchById } from '../../../utils/firebase-crud';

const invoiceCollectionName = "/invoice";
// const invoiceCollectionName = "/invoice-FY-23-24";


const FySaleList = () => {
    const navigate = useNavigate();
    const [dataList, updateDataList] = useState([]);
    const [show4, setShow4] = useState(false);
    const [finalPreviewObj, updateFinalPreviewObj] = useState({});

    const getDisplayFullDateFormat = (date) => {
        const day = date.getDate().toString().length === 1 ? "0" + date.getDate() : date.getDate();
        const month = date.getMonth().toString().length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const year = date.getFullYear();

        return day + '-' + month + '-' + year;
    };

    const fetchList = async () => {
        const listRes = await fetchAll(invoiceCollectionName);
        if (listRes.success) {
            const localArr = [];
            if (listRes.data && listRes.data.length) {
                listRes.data.forEach(each => {
                    localArr.push({
                        id: each.id,
                        invoiceNo: each.otherDetails.invno,
                        typeOfInvoice: !each.isNonGst ? "GST" : "Non GST",
                        billTo: each.otherDetails.billto,
                        billdate: getDisplayFullDateFormat(new Date(each.otherDetails?.billdate?.seconds * 1000)),
                        // challanDate: getDisplayFullDateFormat(new Date(each.otherDetails?.challanDate?.seconds * 1000)),
                        grandTotal: each.otherDetails.grandTotal
                    });
                });
            }
            updateDataList([...localArr]);
        }
    };
    const handleClose4 = () => setShow4(false);
    const removeInvoice = async (id) => {
        const removeRes = await deleteById(invoiceCollectionName, id);
        if (removeRes.success) {
            fetchList();
        }
    };

    const openDetails = async (id) => {
        const detailsRes = await fetchById(invoiceCollectionName, id);
        console.log("detailsRes ", detailsRes)
        if (detailsRes.success) {
            updateFinalPreviewObj({
                ...detailsRes.data,
                challanDate: getDisplayFullDateFormat(new Date(detailsRes.data?.challanDate?.seconds * 1000)),
                billdate: getDisplayFullDateFormat(new Date(detailsRes.data?.billdate?.seconds * 1000))
            });
            setShow4(true);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const redirect = () => {
        navigate("/add-invoice");
    };
    const newParty = () => {
        navigate("/bill-to");
    };

    return (
        <div id="wrapper">
            <Header />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {show4 && Object.keys(finalPreviewObj).length ?
                        <InvoiceModal
                            show4={show4}
                            finalPreviewObj={finalPreviewObj}
                            handleClose4={handleClose4}
                            gstChecked={finalPreviewObj.isNotIgst}
                            checked={finalPreviewObj.isNonGst}
                        /> : null}
                    <div className="container-fluid">
                        <Row className='mt-1'>
                            <Col md={8}>
                                <h3>
                                    Invoice List of FY 2022-23
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <table id="Salebill" class="table table-bordered display" width="100%">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Bill Date</th>
                                            <th>Invoice NO</th>
                                            {/* <th>Invoice Type</th> */}
                                            <th>Bill To</th>                                        
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataList.map((product, ind) => {
                                            return <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{product.billdate}</td>
                                                <td>{product.invoiceNo}</td>
                                                {/* <td>{product.typeOfInvoice}</td> */}
                                                <td>{product.billTo.label}</td>
                                                <td>{product.grandTotal}</td>
                                                <td>   
                                                    {/* <i className="fa fa-pencil cursor-pointer mr-3" onClick={() => navigate(`/edit-invoice/${product.id}`)}></i> */}
                                                    {/* <i className="fa fa-trash cursor-pointer mr-3" onClick={() => {if(window.confirm('Are you sure to delete this bill?')){ removeInvoice(product.id)}}}></i> */}
                                                    <i className="fa fa-eye cursor-pointer" onClick={() => openDetails(product.id)}></i>
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>

        </div>
    )
};

export default FySaleList;