import React from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";



const VendorMenu = () => {
   return (
        <div className=".container">
        <br/>
          <div  align="center" style={{backgroundColor:'yellow'}}>
          <h1 className = "text-center" style={{color:'blue'}}><u><i>Inventory Vendor Menu</i></u></h1>
          </div>
          <Navbar expand="lg" bg="warning">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             
              <Nav.Link href="/ShowSingleUser"><b>Show User Details</b></Nav.Link>
             <Nav.Link href="/"><b>Logout</b></Nav.Link>
           </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
    );
 
};

export default VendorMenu;