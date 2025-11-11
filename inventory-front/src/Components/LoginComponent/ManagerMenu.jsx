import React from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";



const ManagerMenu = () => {
  return (
     <div className=".container">
          <div  align="center" >
          <h1 className = "text-center top-bar">Inventory Manager Menu</h1>
          </div>
          <Navbar expand="lg" bg="dark">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown className="hover" title="SKU" menuVariant="dark">
                <NavDropdown.Item href="SkuRepo">SKU List</NavDropdown.Item>
                <NavDropdown.Item href="/SkuAdd">SKU Addition</NavDropdown.Item>
              </NavDropdown>
             <NavDropdown className="hover" title="Product" menuVariant="dark">
                <NavDropdown.Item href="ProductRepo">Product List</NavDropdown.Item>
               <NavDropdown className="hover" title="Analysis" menuVariant="dark" drop="end">
                <NavDropdown.Item href="/analysis/all">All Product Analysis</NavDropdown.Item>
                <NavDropdown.Item href="/analysis/single">Single Product Analysis</NavDropdown.Item>
              </NavDropdown>
             </NavDropdown>
              <NavDropdown className="hover" title="Transaction" menuVariant="dark">
                <NavDropdown.Item href="/trans-repo/OUT">Out Transaction Report</NavDropdown.Item>
                <NavDropdown.Item href="/trans-repo/IN">In Transaction Report</NavDropdown.Item>
              </NavDropdown>
                <Nav.Link className="hover" href="/ShowSingleUser"><b>Show User Details</b></Nav.Link>
      <Nav.Link className="hover" href="/"><b>Logout</b></Nav.Link>
           </Nav>
         </Navbar.Collapse>
    </Navbar>
        </div>
  )
};

export default ManagerMenu;