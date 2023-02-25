import React, {useState} from 'react';
import { Nav, Dropdown } from "react-bootstrap-v5";
import Unit from '../Pages/Unit/Unit';
import Category from '../Pages/Category/Category';
import Group from '../Pages/Group/Group';
import Hsn from '../Pages/Hsn/Hsn';
import ProductDetail from '../Pages/ProductDetail/ProductDetail';

const Header = (props) => {

    const [isActive, setActive] = useState(true);    
    const [isOpenUnit, setIsOpenUnit] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenGroup, setIsOpenGroup] = useState(false);
    const [isOpenHSN, setIsOpenHSN] = useState(false);
    const [isOpenProductDetail, setIsOpenProductDetail] = useState(false);


    const sidebartoggle = (e) => { 
        document.body.classList.toggle('sidebar-toggled');
        const elem = document.getElementsByClassName("sidebar");
        setActive(!isActive);
    }
    
    const toggleUnitModal = () => {
        setIsOpenUnit(!isOpenUnit);
    };
    const toggleCategoryModal = () => {
        setIsOpenCategory(!isOpenCategory);
    };
    const toggleGroupModal = () => {
        setIsOpenGroup(!isOpenGroup);
    };
    const toggleHSNModal = () => {
        setIsOpenHSN(!isOpenHSN);
    };
    const toggleProductDetailModal = () => {
        setIsOpenProductDetail(!isOpenProductDetail);
    };
    return(        
        <Nav className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isActive ? "toggled" : ""}`} id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fa fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3"><sup>Gan</sup>Book</div>
            </a>
            
            <hr className="sidebar-divider my-0"/>
            
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fa fa-fw fa-tachometer"></i>
                    <span>Dashboard</span></a>
            </li>
            
            <hr className="sidebar-divider"/>
            <Dropdown className="mb-3 mx-auto">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <i className="fa fa-user" aria-hidden="true"> Master</i>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="light">
                    <Dropdown.Item href="#"onClick={toggleUnitModal}>
                        <i className="fa fa-fw fa-balance-scale"> Unit</i>
                    </Dropdown.Item>
                    <Dropdown.Item href="#"onClick={toggleCategoryModal}>
                        <i className="fa fa-fw fa-list-alt"> Category</i>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={toggleGroupModal}>
                        <i className="fa fa-fw fa-cogs"> Group</i>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={toggleHSNModal}>
                        <i className="fa fa-fw fa-tag"> HSN</i>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={toggleProductDetailModal}>
                        <i className="fa fa-fw fa-tag"> Product Detail</i>
                    </Dropdown.Item>
                    <Dropdown.Item href="/product">
                        <i className="fa fa-fw fa-dropbox"> Product</i>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>    
            <Unit show={isOpenUnit} toggleUnitModal={toggleUnitModal}/>
            <Category show={isOpenCategory} toggleCategoryModal={toggleCategoryModal}/>
            <Group show={isOpenGroup} toggleGroupModal={toggleGroupModal}/>
            <Hsn show={isOpenHSN} toggleHSNModal={toggleHSNModal}/>
            <ProductDetail show={isOpenProductDetail} toggleProductDetailModal={toggleProductDetailModal}/>

            <hr className="sidebar-divider"/>

            <li className="nav-item">
                <a className="nav-link" href="/purchase">
                    <i className="fa fa-area-chart"></i>
                    <span>Purchase</span></a>    
            </li>
            
            <li className="nav-item">
                <a className="nav-link" href="/sale">
                    <i className="fa fa-area-chart"></i>
                    <span>Sale</span></a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/DeliveryOrder">
                    <i className="fa fa-area-chart"></i>
                    <span>Delivery Order</span></a>    
            </li>
            
            <li className="nav-item">
                <a className="nav-link" href="/report">
                    <i className="fa fa-fw fa-table"></i>
                    <span>Report</span></a>
            </li>
            
            <hr className="sidebar-divider d-none d-md-block"/>
            
            <div className="text-center d-none d-md-inline">
                {isActive? (
                    <button className="rounded-circle border-0" onClick={(e) => sidebartoggle(e)}><i className='fa fa-arrow-right'></i></button>
                ) : (
                    <button className="rounded-circle border-0" onClick={(e) => sidebartoggle(e)}><i className='fa fa-arrow-left'></i></button>
                )
                }
            </div>

        </Nav>
    )
}
export default Header;