import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { deleteProduct, getAllProducts } from "../../Services/ProductService";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import {getUserRole} from '../../Services/LoginService';

const ProductReport = () => {
    const [role,setRole] =useState("");
    const [productList,setProductList] = useState([]);
    let navigate = useNavigate();

    const displayAllproducts=()=>{
        getAllProducts().then((response)=>{
            setProductList(response.data);
        })
    }
    const setUserRole=()=>{
            getUserRole().then( response => {
                setRole(response.data);
           })
        }
    useEffect(()=>{
        displayAllproducts();
        setUserRole();
    },[]);

    const returnBack=()=>{
        if(role==="Admin")
            navigate('/AdminMenu');
        else if(role==="Manager")
            navigate('/ManagerMenu');
    }

    const removeProduct=(id)=>{
        deleteProduct(id).then(res=>{
            let remainProducts=productList.filter((product)=>(product.productId!==id));
            setProductList(remainProducts);
        })
        navigate('/ProductRepo');
    }

  return (
     <div className="text-center">
        <div>
            <hr style={{height: "3px", borderWidth:0, color:"yellow" }}/>
            <h2 className="text-center">Product List</h2>
              <div className = "row">
              <table className = "table table-striped table-bordered">
               <thead>
               <tr>
                 <th>Product ID</th>
                 <th>Product Name</th>
                 <th>SKU</th>
                 <th>Purchase Price</th>
                 <th>Sales Price</th>
                 <th>Reorder Level</th>
                 <th>Stock</th>
                 <th>Vendor ID</th>
                 <th> Stock Status </th>
                 <th>Actions</th>
              </tr>
              </thead>
              <tbody>
                 {
                    productList.map((product, index) => (
                      <tr key = {product.productId}>
                      <td>{product.productId}</td>
                      <td>{product.productName}</td>
                      <td>{product.sku}</td>
                      <td>{product.purchasePrice}</td>
                      <td>{product.salesPrice}</td>
                      <td>{product.reorderLevel}</td>
                      <td>{product.stock}</td>
                      <td>{product.vendorId}</td>
                       <td>{product.status===true ? <span  style={{textAlign: "center",color:"green"}}>Permited to Issue</span>: <span style={{textAlign: "center",color:"red"}}>Reorder Level Reached</span> }</td>
                      <td style={{ whiteSpace: "nowrap" }}> <Link to={`/view-product/${product.productId}`}><button style={{marginLeft: "5px",marginBottom:"5px"}}  className="btn btn-primary">View</button></Link>
                       <Link to={`/edit-stock/${product.productId}/2`}><button style={{marginLeft: "5px",marginBottom:"5px"}}  className="btn btn-secondary">Issue</button></Link>
                      <Link to={`/edit-stock/${product.productId}/1`}><button style={{marginLeft: "5px",marginBottom:"5px"}}  className="btn btn-success">Purchase</button></Link>
                       {role==="Admin" && <Link to={`/update-prodPrice/${product.productId}`}><button style={{marginLeft: "5px",marginBottom:"5px"}}  className="btn btn-info">PriceUpdate</button></Link>}
                     {role==="Admin" && <button style={{marginLeft: "5px",marginBottom:"5px"}} onClick={()=>removeProduct(product.productId)} className="btn btn-danger">Delete</button>}</td>
                      </tr>
                  ) )
               }                        
         </tbody>
        </table>
         <br/>
         <button style={{width:"fit-content"}} onClick={()=>returnBack()} className="btn btn-success d-block mx-auto">Return</button>    
       </div>
     </div>
    </div>
  )
}

export default ProductReport