import React, { useEffect, useState } from 'react';
import {stockUpdate,getProductById} from '../../Services/ProductService';
import {useParams, useNavigate} from "react-router-dom";

const EditStock = () => {    
    const param = useParams();
    const [flag,setFlag]=useState(0);
    const [quantity,setQuantity]=useState(0)
    let navigate = useNavigate();
        const [product,setProduct]=useState({
            productId:"",
            productName: "",
            sku:"",
            purchasePrice: 0.0,
            salesPrice:0.0,
            reorderLevel:0.0,
            stock:0.0,
            vendorId:"",
   });          
    useEffect(() => {
        getProductById(param.pid).then( response => {
            setProduct(response.data);
        })
        setFlag(parseInt(param.flag))
      }, [param]);
 
       const returnBack=()=>{
        navigate('/ProductRepo');
    }
    const updateProd=()=>{
      stockUpdate(product,quantity,flag).then((res)=>{
        alert("Stock Updated")
        navigate('/ProductRepo');
      })
    }

   return (
    <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "450px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            padding: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontWeight: 500,
            }}
          >
          {flag===1 ? <>Product Purchase</> :<>Product Issue</>}
          </h3>

          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>Product ID:</label>
              <span>{product.productId}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>Product Name:</label>
              <span>{product.productName}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>SKU:</label>
              <span>{product.sku}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>Purchase Price:</label>
              <span>{product.purchasePrice}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>Sales Price:</label>
              <span>{product.salesPrice}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
            <label>Reorder Level:</label>
              <span>{product.reorderLevel}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>Stock:</label>
              <span>{product.stock}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
              <label>Vendor ID:</label>
              <span>{product.vendorId}</span>
            </div>
          </div>
          <div className = "form-group">
              <label><b>Enter Stock Quantity:</b></label>
              <input type="text"   name="stock" className="form-control" autoFocus
                  value={quantity} onChange={(event) => setQuantity(event.target.value)}/>
          </div>
          <div style={{ display: "flex",marginTop:"20px"}} >
          <button
            onClick={updateProd}
            className="btn btn-success d-block mx-auto"
          >
          Save
          </button>
          <button
            onClick={returnBack}
            className="btn btn-danger d-block mx-auto"
          >
          Cancel
          </button>
          </div>
        </div>
      </div>
        );
 }
export default EditStock