import React, { useState, useEffect } from 'react';
import LoaderPage from '../LoaderPage';
import { fetchAllCategories, createCategory, updateCategory, deleteCategory } from "../../../crud/category.crud";
import { Form,Modal,Table,Button } from 'react-bootstrap-v5';
import DataTable from 'react-data-table-component-with-filter';
import "../../Assets/search.css";

const Category = (props) => {
    const [ categories, setCategories ] = useState([]);
    const [ isDataLoaded, setIsDataLoaded ] = useState(true);
    const [ catName, setCatName ]= useState('');
    const [ catAli, setCatAli ]= useState('');
    const [ catDesc, setCatDesc ]= useState('');
    const [ editIDcategory, setEditIDcategory ]= useState(0);
    
    useEffect(() => {
        fetchAllCategories().then(res => {
            setCategories(res.data);
            setIsDataLoaded(true);
        })
    }, []);

    const columns = [
        {
            name: 'Category',
            selector: row => row.category_name,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <>
                    <i className='fa fa-edit mr-2 text-info'
                        onClick={() => editClicked(row.category_name,row.category_alias,row.category_description,row.category_id)}
                    ></i>
                    <i className='fa fa-trash text-danger'
                        onClick={() => {if(window.confirm('Are you sure you want to delete the Category?')){ delCat(row.category_id) };}}
                    ></i>
                </>
            )
        },
    ];

    const handleSubmitC=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();     
        createCategory(catName,catAli,catDesc).then((res)=>{
            setCatName('');
            setCatAli('');
            setCatDesc('');
            setCategories(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const delCat = (id) => {   
        setIsDataLoaded(false);
        deleteCategory(id).then((res)=>{
            setCategories(res.data);
            setIsDataLoaded(true);
            // window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const editClicked = (name,ali,desc,id) => {
        setCatName(name);
        setCatAli(ali);
        setCatDesc(desc);
        setEditIDcategory(id);
    }
    const cancelEdit = () => {
        setCatName('');
        setCatAli('');
        setCatDesc('');
        setIsDataLoaded(true);
        setEditIDcategory(0);
    }
    const handleSubmitE=(e) => {
        setIsDataLoaded(false);
        e.preventDefault();  
        updateCategory(editIDcategory,catName,catAli,catDesc).then((res)=>{
            setCatName('');
            setCatAli('');
            setCatDesc('');
            setEditIDcategory(0);
            setCategories(res.data);
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
        <Modal size="lg" show={props.show} onHide={props.toggleCategoryModal} >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="d-flex justify-content-between">
                        <h5 className="modal-title font-medium float-start" id="largeModalLabel">Category Entry</h5>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        {editIDcategory? (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="cat-form-header">Update Form</div>
                                <Form onSubmit={handleSubmitE} className="mt-1">
                                    <Form.Group className="mb-3" controlId="formCategory">
                                        <Form.Label>Category Name</Form.Label>
                                        <Form.Control type="text" 
                                            value={catName}
                                            onChange={(e)=>{setCatName(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Category Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCatali">
                                        <Form.Label>Category Alias</Form.Label>
                                        <Form.Control type="text" 
                                            value={catAli}
                                            onChange={(e)=>{setCatAli(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Category Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCatdesc">
                                        <Form.Label>Category Description</Form.Label>
                                        <Form.Control type="text" 
                                            value={catDesc}
                                            onChange={(e)=>{setCatDesc(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Category Name" />  
                                    </Form.Group>
                                    <div className="text-right">
                                        <Button type="button" className="btn btn-danger btn-sm px-3 font-mid-sm mr-2" onClick={() => cancelEdit()}>Cancel</Button>
                                        <Button type="submit" id="submit" className="btn btn-info btn-sm px-3 font-mid-sm">Update</Button>
                                    </div>
                                </Form>
                            </div>
                        ) : (
                            <div className="cus-field-set mt-3">
                                <div className="cus-legend font-medium" id="cat-form-header">Entry Form</div>
                                <Form onSubmit={handleSubmitC} className="mt-1">
                                    <Form.Group className="mb-3" controlId="formCategory">
                                        <Form.Label>Category Name</Form.Label>
                                        <Form.Control type="text" 
                                            value={catName}
                                            onChange={(e)=>{setCatName(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Category Name" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCatali">
                                        <Form.Label>Category Alias</Form.Label>
                                        <Form.Control type="text" 
                                            value={catAli}
                                            onChange={(e)=>{setCatAli(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Category Alias" />  
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCatdesc">
                                        <Form.Label>Category Description</Form.Label>
                                        <Form.Control type="text" 
                                            value={catDesc}
                                            onChange={(e)=>{setCatDesc(e.target.value)}}  
                                            onKeyDown={handleKeyboardBTN}
                                            placeholder="Enter Category Description" />  
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
                            <div className="cus-legend font-medium">Category Data</div>
                            <div className="my-3">
                                <DataTable
                                    columns={columns}
                                    data={categories}
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight="400px"
                                    // subHeader
                                    // subHeaderComponent={getSubHeaderComponent()}
                                    persistTableHead
                                    // progressPending={isDataLoaded}
                                    // selectableRows
                                    // expandableRows
                                    // expandableRowsComponent={ExpandedComponent}
                                />

                                {/* {!isDataLoaded? (
                                    <LoaderPage />
                                ) : (
                                    <></>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>  
    )
}

export default Category;