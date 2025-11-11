import React from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const VendorMenu = () => {
   return (
        <div className=".container">
         <div  align="center" >
          <h1 className = "text-center top-bar"><u><i>Inventory Vendor Menu</i></u></h1>
          </div>
          <Navbar expand="lg" bg="dark">
        <Navbar.Collapse>
          <Nav className="me-auto">
              <Nav.Link href="/ShowSingleUser"><b>Show User Details</b></Nav.Link>
             <Nav.Link  href="/"><b>Logout</b></Nav.Link>
           </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
    );
 
};

export default VendorMenu;