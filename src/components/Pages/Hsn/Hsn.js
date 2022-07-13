import React, { useState, useEffect } from 'react';
import LoaderPage from '../LoaderPage';
import { fetchAllHSN, createHSN, updateHSN, deleteHSN } from "../../../crud/hsn.crud";
import { Form,Modal,Table,Button,Col,Row } from 'react-bootstrap-v5';
import DataTable from 'react-data-table-component-with-filter';
import "../../Assets/search.css";

const Hsn = (props) => {
    const [ hsns, setHsns ] = useState([]);
    const [ isDataLoaded, setIsDataLoaded ] = useState(true);
    const [ hsnUser, setHsnUser ]= useState('');
    const [ hsnCompliance, setHsnCompliance ]= useState('');
    const [ productDesc, setProductDesc ]= useState('');
    const [ ruleStDate, setRuleStDate ]= useState('');
    const [ ruleEndDate, setRuleEndDate ]= useState('');
    const [ taxPercent, setTaxPercent ]= useState('');
    const [ taxAlt1, setTaxAlt1 ]= useState('');
    const [ taxAlt2, setTaxAlt2 ]= useState('');
    const [ taxBase, setTaxBase ]= useState('');
    const [ rateCondition, setRateCondition ]= useState(0);
    const [ editIDhsn, setEditIDhsn ]= useState(0);
    
    useEffect(() => {
        fetchAllHSN().then(res => {
            setHsns(res.data);
            setIsDataLoaded(true);
        })
    }, []);
    const columns = [
        {
            name: 'HSN',
            selector: row => row.hsn_user,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>
                    <i className='fa fa-edit mr-2 text-info'
                        onClick={() => editClicked(row.hsn_user,row.hsn_compliance,row.product_desc,row.rule_stDate,row.rule_endDate,row.tax_percent,row.tax_alt1,row.tax_alt2,row.tax_base,row.rate_condition,row.hsn_id)}
                    ></i>
                    <i className='fa fa-trash text-danger'
                        onClick={() => {if(window.confirm('Are you sure you want to delete the Unit?')){ delHSN(row.hsn_id) };}}
                    ></i>
                </>
            )
        },
    ];
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const handleSubmitC=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();     
        createHSN(hsnUser,hsnCompliance,productDesc,ruleStDate,ruleEndDate,taxPercent,taxAlt1,taxAlt2,taxBase,rateCondition).then((res)=>{
            setHsnUser('');
            setHsnCompliance('');
            setProductDesc('');
            setRuleStDate('');
            setRuleEndDate('');
            setTaxPercent('');
            setTaxAlt1('');
            setTaxAlt2('');
            setTaxBase('');
            setRateCondition('');
            setHsns(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const delHSN = (id) => {   
        setIsDataLoaded(false);
        deleteHSN(id).then((res)=>{
            setHsns(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const editClicked = (husr,hcmplnc,prodesc,rlSdate,rlEdate,txPrsnt,txA1,txA2,txBs,rtCndtn,id) => {
        setHsnUser(husr);
        setHsnCompliance(hcmplnc);
        setProductDesc(prodesc);
        setRuleStDate(rlSdate);
        setRuleEndDate(rlEdate);
        setTaxPercent(txPrsnt);
        setTaxAlt1(txA1);
        setTaxAlt2(txA2);
        setTaxBase(txBs);
        setRateCondition('');
        setEditIDhsn(id);
    }
    const cancelEdit = () => {
        setHsnUser('');
        setHsnCompliance('');
        setProductDesc('');
        setRuleStDate('');
        setRuleEndDate('');
        setTaxPercent('');
        setTaxAlt1('');
        setTaxAlt2('');
        setTaxBase('');
        setRateCondition('');
        setEditIDhsn(0);
        setIsDataLoaded(true);
    }
    const handleSubmitE=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();  
        updateHSN(editIDhsn,hsnUser,hsnCompliance,productDesc,ruleStDate,ruleEndDate,taxPercent,taxAlt1,taxAlt2,taxBase,rateCondition).then((res)=>{
            setHsnUser('');
            setHsnCompliance('');
            setProductDesc('');
            setRuleStDate('');
            setRuleEndDate('');
            setTaxPercent('');
            setTaxAlt1('');
            setTaxAlt2('');
            setTaxBase('');
            setRateCondition('');
            setEditIDhsn(0);
            setIsDataLoaded(true);
            setHsns(res.data);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };

    const handleKeyboardBTN = (event) => {
        console.log(event.target);
        let keyVal = event.keyCode || event.which;
        if( (keyVal === 13) || keyVal === 39 ) {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].select();
            // if((keyVal === 13) && (event.target.id="formUnitDesc")) {
            // }
            event.preventDefault();
        } else if( keyVal === 37) {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index - 1].select();
            event.preventDefault();
        }
    };
    if(!props.show) {
        return null;
    }
    return(       
        <Modal size="lg" show={props.show} onHide={props.toggleHSNModal} >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title font-medium float-start" id="largeModalLabel">HSN Entry</h5>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        {editIDhsn? (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="hsn-form-header">Update Form</div>
                                <Form onSubmit={handleSubmitE} className="mt-1">
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formHsn">
                                                <Form.Label>HSN User</Form.Label>
                                                <Form.Control type="text" 
                                                    value={hsnUser}
                                                    onChange={(e)=>{setHsnUser(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter HSN User" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatali">
                                                <Form.Label>HSN Compliance</Form.Label>
                                                <Form.Control type="text" 
                                                    value={hsnCompliance}
                                                    onChange={(e)=>{setHsnCompliance(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter HSN Compliance" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>Product Description</Form.Label>
                                                <Form.Control type="text" 
                                                    value={productDesc}
                                                    onChange={(e)=>{setProductDesc(e.target.value)}} 
                                                    onKeyDown={handleKeyboardBTN} 
                                                    placeholder="Enter Product Description" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>Rule Start Date</Form.Label>
                                                <Form.Control type="date" 
                                                    value={ruleStDate}
                                                    onChange={(e)=>{setRuleStDate(e.target.value)}}
                                                    onKeyDown={handleKeyboardBTN}/>  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>Rule End Date</Form.Label>
                                                <Form.Control type="date" 
                                                    value={ruleEndDate}
                                                    onChange={(e)=>{setRuleEndDate(e.target.value)}}
                                                    onKeyDown={handleKeyboardBTN}/>  
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>Tax Percent</Form.Label>
                                                <Form.Control type="text" 
                                                    value={taxPercent}
                                                    onChange={(e)=>{setTaxPercent(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter Tax Percent" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>tax Alt 1</Form.Label>
                                                <Form.Control type="text" 
                                                    value={taxAlt1}
                                                    onChange={(e)=>{setTaxAlt1(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter taxAlt1" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>tax Alt 2</Form.Label>
                                                <Form.Control type="text" 
                                                    value={taxAlt2}
                                                    onChange={(e)=>{setTaxAlt2(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter taxAlt1" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>Tax Base</Form.Label>
                                                <Form.Control type="text" 
                                                    value={taxBase}
                                                    onChange={(e)=>{setTaxBase(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter Tax Base" />  
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formCatdesc">
                                                <Form.Label>Rate Condition</Form.Label>
                                                <Form.Control type="text" 
                                                    value={rateCondition}
                                                    onChange={(e)=>{setRateCondition(e.target.value)}}  
                                                    onKeyDown={handleKeyboardBTN}
                                                    placeholder="Enter Rate Condition" />  
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div className="text-right">
                                        <Button type="button" className="btn btn-danger btn-sm px-3 font-mid-sm mr-2" onClick={() => cancelEdit()}>Cancel</Button>
                                        <Button type="submit" id="submit" className="btn btn-info btn-sm px-3 font-mid-sm">Update</Button>
                                    </div>
                                </Form>
                            </div>
                        ) : (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="hsn-form-header">Entry Form</div>
                                <Form onSubmit={handleSubmitC} className="mt-1">
                                    <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formHsn">
                                            <Form.Label>HSN User</Form.Label>
                                            <Form.Control type="text" 
                                                value={hsnUser}
                                                onChange={(e)=>{setHsnUser(e.target.value)}}  
                                                onKeyDown={handleKeyboardBTN}
                                                placeholder="Enter HSN User" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatali">
                                            <Form.Label>HSN Compliance</Form.Label>
                                            <Form.Control type="text" 
                                                value={hsnCompliance}
                                                onChange={(e)=>{setHsnCompliance(e.target.value)}} 
                                                onKeyDown={handleKeyboardBTN} 
                                                placeholder="Enter HSN Compliance" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>Product Description</Form.Label>
                                            <Form.Control type="text" 
                                                value={productDesc}
                                                onChange={(e)=>{setProductDesc(e.target.value)}} 
                                                onKeyDown={handleKeyboardBTN} 
                                                placeholder="Enter Product Description" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>Rule Start Date</Form.Label>
                                            <Form.Control type="date" 
                                                value={ruleStDate}
                                                onChange={(e)=>{setRuleStDate(e.target.value)}}
                                                onKeyDown={handleKeyboardBTN}/>  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>Rule End Date</Form.Label>
                                            <Form.Control type="date" 
                                                value={ruleEndDate}
                                                onChange={(e)=>{setRuleEndDate(e.target.value)}}
                                                onKeyDown={handleKeyboardBTN}/>  
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>Tax Percent</Form.Label>
                                            <Form.Control type="text" 
                                                value={taxPercent}
                                                onChange={(e)=>{setTaxPercent(e.target.value)}}  
                                                onKeyDown={handleKeyboardBTN}
                                                placeholder="Enter Tax Percent" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>tax Alt 1</Form.Label>
                                            <Form.Control type="text" 
                                                value={taxAlt1}
                                                onChange={(e)=>{setTaxAlt1(e.target.value)}}  
                                                onKeyDown={handleKeyboardBTN}
                                                placeholder="Enter taxAlt1" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>tax Alt 2</Form.Label>
                                            <Form.Control type="text" 
                                                value={taxAlt2}
                                                onChange={(e)=>{setTaxAlt2(e.target.value)}}  
                                                onKeyDown={handleKeyboardBTN}
                                                placeholder="Enter taxAlt1" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>Tax Base</Form.Label>
                                            <Form.Control type="text" 
                                                value={taxBase}
                                                onChange={(e)=>{setTaxBase(e.target.value)}}  
                                                onKeyDown={handleKeyboardBTN}
                                                placeholder="Enter Tax Base" />  
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formCatdesc">
                                            <Form.Label>Rate Condition</Form.Label>
                                            <Form.Control type="text" 
                                                value={rateCondition}
                                                onChange={(e)=>{setRateCondition(e.target.value)}}  
                                                onKeyDown={handleKeyboardBTN}
                                                placeholder="Enter Rate Condition" />  
                                        </Form.Group>
                                    </Col>
                                    </Row>
                                    <div className="text-right">
                                        <Button type="submit" id="submit" className="btn btn-primary btn-sm px-3 font-mid-sm">Save</Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <div className="cus-field-set mt-3 p-0">
                            <div className="cus-legend font-medium">HSN Data</div>
                            <div className="my-3">
                                <DataTable
                                    columns={columns}
                                    data={hsns}
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight="300px"
                                    // subHeader
                                    // subHeaderComponent={getSubHeaderComponent()}
                                    persistTableHead
                                    // progressPending={isDataLoaded}
                                    // selectableRows
                                    expandableRows
                                    expandableRowsComponent={ExpandedComponent}
                                />

                                {/* {!isDataLoaded? (
                                    <LoaderPage />
                                ) : (
                                    
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>  
    )
}

export default Hsn;