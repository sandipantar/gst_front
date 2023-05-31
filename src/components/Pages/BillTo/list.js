import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap-v5";
import Header from "../../Headers/Header";
import BillToModal from "./bill-to-modal";
import { fetchAll, deleteById, fetchById } from '../../../utils/firebase-crud';

const billToCollectionName = "/billTo";

const BillToList = () => {
    const [isModalOpen, toggleModal] = useState(false);
    const [dataList, updateDataList] = useState([]);
    const [billData, updateBillData] = useState({});

    const fetchList = async () => {
        const listRes = await fetchAll(billToCollectionName);
        if (listRes.success) {
            const localArr = [];
            if (listRes.data && listRes.data.length) {
                listRes.data.forEach(each => {
                    localArr.push({
                        id: each.id,
                        address: each.otherDetails.address,
                        name: each.otherDetails.name,
                        gst: each.otherDetails.gst,
                        phone: each.otherDetails.phone
                    });
                });
            }
            updateDataList([...localArr]);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const addSuccessful = () => {
        fetchList();
        updateBillData({});
    };

    const removeBill = async (id) => {
        const removeRes = await deleteById(billToCollectionName, id);
        if (removeRes.success) {
            fetchList();
        }
    };

    const fetchBill = async (id) => {
        const detailsRes = await fetchById(billToCollectionName, id);
        if (detailsRes.success) {
            updateBillData({
                id,
                ...detailsRes.data
            });
            toggleModal(true);
        }
    };

    return <div id="wrapper">
        <Header />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <div className="container-fluid">
                    <Row>
                        <Col>
                            <h6 className="h3 mb-0 text-gray-800">Bill To</h6>
                        </Col>
                        <Col>
                            <Button variant="info" size="sm" onClick={() => toggleModal(true)}>
                                Create
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                            <Col>
                                <table className="tableclass table-sm" width="100%">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataList.map((product, ind) => {
                                            return <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{product.name}</td>
                                                <td>{product.phone}</td>
                                                <td>
                                                    <i className="fa fa-pencil cursor-pointer mr-3" onClick={() => fetchBill(product.id)}></i>
                                                    <i className="fa fa-trash cursor-pointer mr-3" onClick={() => removeBill(product.id)}></i>
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    {isModalOpen ?
                        <BillToModal
                            billToModal={isModalOpen}
                            handleBillToModal={toggleModal}
                            addSuccessful={addSuccessful}
                            billData={billData}
                        /> : null}
                </div>
            </div>
        </div>
    </div>
};

export default BillToList;