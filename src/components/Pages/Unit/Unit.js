import React, { useState, useEffect } from 'react';
// import LoaderPage from '../LoaderPage';
import { fetchAllUnits, createUnit, updateUnit, deleteUnit } from "../../../crud/unit.crud";
import { Form,Modal, Button } from 'react-bootstrap-v5';
import DataTable from 'react-data-table-component-with-filter';
import "../../Assets/search.css";

const Unit =(props) => {
    const [ units, setUnits ] = useState([]);
    const [ isDataLoaded, setIsDataLoaded ] = useState(true);
    const [ unitName, setUnitName ]= useState('');
    const [ unitDesc, setUnitDesc ]= useState('');
    const [ editIDunit, setEditIDunit ]= useState(0);
    // const [ filterText, setFilterText ]= useState('');
    useEffect(() => {
        fetchAllUnits().then(res => {
            setUnits(res.data);
            setIsDataLoaded(true);
        })
    }, []);

    // const [ filteredItem, setFilteredItem ]= useState(units);

    const columns = [
        {
            name: 'Units',
            selector: row => row.unit_name,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>
                    <i className='fa fa-edit mr-2 text-info'
                        onClick={() => editClicked(row.unit_name,row.unit_description,row.unit_id)}
                    ></i>
                    <i className='fa fa-trash text-danger'
                        onClick={() => {if(window.confirm('Are you sure you want to delete the Unit?')){ delUnit(row.unit_id) };}}
                    ></i>
                </>
            )
        },
    ];
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    
    const handleSubmitC=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();     
        createUnit(unitName,unitDesc).then((res)=>{
            setUnitName('');
            setUnitDesc('');
            setUnits(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const delUnit = (id) => {   
        setIsDataLoaded(false);
        deleteUnit(id).then((res)=>{
            setUnits(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const editClicked = (name,desc,id) => {
        setUnitName(name);
        setUnitDesc(desc);
        setEditIDunit(id);
    }
    const cancelEdit = () => {
        setUnitName('');
        setUnitDesc('');
        setIsDataLoaded(true);
        setEditIDunit(0);
    }
    const handleSubmitE=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();  
        updateUnit(editIDunit,unitName,unitDesc).then((res)=>{
            setUnitName('');
            setUnitDesc('');
            setEditIDunit(0);
            setUnits(res.data);
            setIsDataLoaded(true);
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
        <Modal size="lg" show={props.show} onHide={props.toggleUnitModal} >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title font-medium float-start" id="largeModalLabel">Unit Entry</h5>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        {editIDunit? (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="unit-form-header">Update Form</div>
                                <Form onSubmit={handleSubmitE} className="mt-1">
                                    <Form.Group className="mb-3" controlId="formUnit">
                                        <Form.Label>Unit Name</Form.Label>
                                        <Form.Control type="text" 
                                            // autoSelect
                                            value={unitName}
                                            onChange={(e)=>{setUnitName(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Unit Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formUnitDesc">
                                        <Form.Label>Unit Description</Form.Label>
                                        <Form.Control type="text" 
                                            value={unitDesc}
                                            onChange={(e)=>{setUnitDesc(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Unit Description" />  
                                    </Form.Group>
                                    <div className="text-right">
                                        <Button type="button" className="btn btn-danger btn-sm px-3 font-mid-sm mr-2" onClick={() => cancelEdit()}>Cancel</Button>
                                        <Button type="submit" id="submit" className="btn btn-info btn-sm px-3 font-mid-sm">Update</Button>
                                    </div>
                                </Form>
                            </div>
                        ) : (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="unit-form-header">Entry Form</div>
                                <Form onSubmit={handleSubmitC} className="mt-1">
                                    <Form.Group className="mb-3" controlId="formUnit">
                                        <Form.Label>Unit Name</Form.Label>
                                        <Form.Control type="text" 
                                            // autoSelect
                                            value={unitName}
                                            onChange={(e)=>{setUnitName(e.target.value)}} 
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Unit Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formUnitDesc">
                                        <Form.Label>Unit Description</Form.Label>
                                        <Form.Control type="text" 
                                            value={unitDesc}
                                            onChange={(e)=>{setUnitDesc(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Unit Description" />  
                                    </Form.Group>
                                    <div className="text-right">
                                        <Button type="submit" id="submit" className="btn btn-primary btn-sm px-3 font-mid-sm">Save</Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        <div className="cus-field-set mt-3 p-0">
                            <div className="cus-legend font-medium">Unit Data</div>
                            <div className="my-3">
                                <DataTable
                                    columns={columns}
                                    data={units}
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
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>  
    )
}

export default Unit;