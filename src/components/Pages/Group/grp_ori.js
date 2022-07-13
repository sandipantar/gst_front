import React, { useState, useEffect } from 'react';
import LoaderPage from '../LoaderPage';
import { fetchAllGroups, createGroup, updateGroup, deleteGroup } from "../../../crud/group.crud";
import { Form,Modal,Table,Button } from 'react-bootstrap-v5';
import DataTable from 'react-data-table-component-with-filter';
import "../../Assets/search.css";

const Group = (props) => {
    const [ groups, setGroups ] = useState([]);
    const [ isDataLoaded, setIsDataLoaded ] = useState(true);
    const [ groupName, setGroupName ]= useState('');
    const [ groupAli, setGroupAli ]= useState('');
    const [ groupDesc, setGroupDesc ]= useState('');
    const [ editIDgroup, setEditIDgroup ]= useState(0);
    
    useEffect(() => {
        fetchAllGroups().then(res => {
            setGroups(res.data);
            setIsDataLoaded(true);
        })
    }, []);


    const columns = [
        {
            name: 'Group',
            selector: row => row.group_name,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>
                    <i className='fa fa-edit mr-2 text-info'
                        onClick={() => editClicked(row.group_name,row.group_alias,row.group_description,row.group_id)}
                    ></i>
                    <i className='fa fa-trash text-danger'
                        onClick={() => {if(window.confirm('Are you sure you want to delete the Group?')){ delGroup(row.group_id) };}}
                    ></i>
                </>
            )
        },
    ];
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    const handleSubmitC=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();     
        createGroup(groupName,groupAli,groupDesc).then((res)=>{
            setGroupName('');
            setGroupAli('');
            setGroupDesc('');
            setGroups(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const delGroup = (id) => {   
        setIsDataLoaded(false);
        deleteGroup(id).then((res)=>{
            setGroups(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const editClicked = (name,ali,desc,id) => {
        setGroupName(name);
        setGroupAli(ali);
        setGroupDesc(desc);
        setEditIDgroup(id);
    }
    const cancelEdit = () => {
        setGroupName('');
        setGroupAli('');
        setGroupDesc('');
        setEditIDgroup(0);
        setIsDataLoaded(true);
    }
    const handleSubmitE=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();  
        updateGroup(editIDgroup,groupName,groupAli,groupDesc).then((res)=>{
            setGroupName('');
            setGroupAli('');
            setGroupDesc('');
            setEditIDgroup(0);
            setIsDataLoaded(true);
            setGroups(res.data);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    if(!props.show) {
        return null;
    }
    return(       
        <Modal size="lg" show={props.show} onHide={props.toggleHSNModal} >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title font-medium float-start" id="largeModalLabel">Group Entry</h5>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        {editIDgroup? (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="group-form-header">Update Form</div>
                                <Form onSubmit={handleSubmitE} className="mt-1">
                                    <Form.Group className="mb-3" controlId="formgroup">
                                        <Form.Label>Group Name</Form.Label>
                                        <Form.Control type="text" 
                                            value={groupName}
                                            onChange={(e)=>{setGroupName(e.target.value)}}  
                                            placeholder="Enter Group Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formgroupali">
                                        <Form.Label>Group Alias</Form.Label>
                                        <Form.Control type="text" 
                                            value={groupAli}
                                            onChange={(e)=>{setGroupAli(e.target.value)}}  
                                            placeholder="Enter Group Alias" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formgroupdesc">
                                        <Form.Label>Group Description</Form.Label>
                                        <Form.Control type="text" 
                                            value={groupDesc}
                                            onChange={(e)=>{setGroupDesc(e.target.value)}}  
                                            placeholder="Enter Group Description" />  
                                    </Form.Group>
                                    <div className="text-right">
                                        <Button type="button" className="btn btn-danger btn-sm px-3 font-mid-sm mr-2" onClick={() => cancelEdit()}>Cancel</Button>
                                        <Button type="submit" id="submit" className="btn btn-info btn-sm px-3 font-mid-sm">Update</Button>
                                    </div>
                                </Form>
                            </div>
                        ) : (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="group-form-header">Entry Form</div>
                                <Form onSubmit={handleSubmitC} className="mt-1">
                                    <Form.Group className="mb-3" controlId="formGroup">
                                        <Form.Label>Group Name</Form.Label>
                                        <Form.Control type="text" 
                                            value={groupName}
                                            onChange={(e)=>{setGroupName(e.target.value)}}  
                                            placeholder="Enter Group Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formgroupali">
                                        <Form.Label>Group Alias</Form.Label>
                                        <Form.Control type="text" 
                                            value={groupAli}
                                            onChange={(e)=>{setGroupAli(e.target.value)}}  
                                            placeholder="Enter Group Alias" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formgroupdesc">
                                        <Form.Label>Group Description</Form.Label>
                                        <Form.Control type="text" 
                                            value={groupDesc}
                                            onChange={(e)=>{setGroupDesc(e.target.value)}}  
                                            placeholder="Enter Group Description" />  
                                    </Form.Group>
                                    <div className="text-right">
                                        <Button type="submit" id="submit" className="btn btn-primary px-3 font-mid-sm">Save</Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        <div className="cus-field-set mt-3 p-0">
                            <div className="cus-legend font-medium">Group Data</div>
                            <div className="my-3">
                                <DataTable
                                    columns={columns}
                                    data={groups}
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

export default Group;