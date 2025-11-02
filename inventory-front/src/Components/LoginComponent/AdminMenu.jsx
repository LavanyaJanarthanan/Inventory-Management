import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminMenu=()=>{


    return(
    <div className=".container">
        <br/>
        <div  align="center" style={{backgroundColor:'steelblue'}}>
        <h1 className = "text-center" style={{color:'white'}}><u><i>Inventory Admin Menu</i></u></h1>
        </div>
        <Navbar expand="lg" bg="warning">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="SKU" id="collasible-nav-dropdown"><b>SKU</b>
                <NavDropdown.Item href="SkuRepo">SKU List</NavDropdown.Item>
                <NavDropdown.Item href="/SkuAdd">SKU Addition</NavDropdown.Item>
             </NavDropdown>
             <NavDropdown title="Product" id="collasible-nav-dropdown"><b>Product</b>
                <NavDropdown.Item href="ProAdd">Product Addition</NavDropdown.Item>
                <NavDropdown.Item href="ProductRepo">Product List</NavDropdown.Item>
                <NavDropdown.Item href="all-products">Product Analysis</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Transaction" id="collasible-nav-dropdown"><b>Transaction</b>
                <NavDropdown.Item href="In-Transaction-Report">Transaction IN</NavDropdown.Item>
                <NavDropdown.Item href="Out-Transaction-Report">Transaction OUT</NavDropdown.Item>
                
              </NavDropdown>
             
              
                            <Nav.Link href="/ShowSingleUser"><b>Show User Details</b></Nav.Link>
              
                <Nav.Link href="/"><b>Logout</b></Nav.Link>
           </Nav>
         </Navbar.Collapse>
        </Navbar>
    </div>
 
    );
};


export default AdminMenu;
