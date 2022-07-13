import React, {useState} from "react";
// import { Navigate } from 'react-router-dom';
// import Header from '../../Headers/Header';
import { ButtonGroup, Button,NavDropdown } from "react-bootstrap-v5";
import profileImg from "../Assets/img/undraw_profile.svg";

const Topnav = (peops) => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [isActivet, setActivet] = useState(false);

  const sidebartoggletop = (e) => { 
    document.body.classList.toggle('sidebar-toggled');
    const elem = document.getElementsByClassName("sidebar");
    setActivet(!isActivet);
  }
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* <!-- Sidebar Toggle (Topbar) --> */}
      <button onClick={(e) => sidebartoggletop(e)}
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>
      {/* <!-- Topbar Navbar --> */}
      <div className="my-auto fs-5 fw-bold">{peops.pageName}</div>
      <ul className="navbar-nav ml-auto">
      <div className="my-auto"><b>Date: {date}</b></div>
        
        {/* <div className="horScroll">
          <ButtonGroup size="sm" className="mx-2" varient="info">
            <Button className="btn-info">
              Purchase <i className="fa fa-times"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" className="mx-2">
            <Button>
              Purchase <i className="fa fa-times"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" className="mx-2">
            <Button>
              Purchase <i className="fa fa-times"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" className="mx-2">
            <Button>
              Purchase <i className="fa fa-times"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" className="mx-2">
            <Button>
              Purchase <i className="fa fa-times"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" className="mx-2">
            <Button>
              Purchase <i className="fa fa-times"></i>
            </Button>
          </ButtonGroup>
        </div> */}

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
        
        <li className="nav-item dropdown no-arrow">
        <NavDropdown title="UserName" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#">
            <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <i className="fa fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </NavDropdown.Item>
          <NavDropdown.Item href="#">
            <i className="fa fa-list-ul fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">
            <i className="fa fa-sign-out fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </NavDropdown.Item>        </NavDropdown>
        </li>
      </ul>
    </nav>
  );
};
export default Topnav;
