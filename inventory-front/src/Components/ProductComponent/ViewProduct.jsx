import React, { useEffect, useState } from 'react';
import {getProductById} from '../../Services/ProductService';
import {useParams, useNavigate} from "react-router-dom";

const ViewProduct = () => {    
    const param = useParams();
    
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
            status:true,
   });
   
    
    useEffect(() => {
        getProductById(param.pid).then( response => {
            setProduct(response.data);
        })      
      }, [param.pid]);
 
       const returnBack=()=>{
        navigate('/ProductRepo');
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
     View Product Details
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 500 }}>
        <label>Stock Status:</label>
        <span>{product.status ?<p style={{color:'green'}}>Permitted to Isuue</p> : <p style={{color:'red'}}>Reached Reorder Level</p>}</span>
      </div>
    </div>

    <button
      onClick={returnBack}
      className="btn btn-warning d-block mx-auto"
    >
    Return
    </button>
  </div>
</div>


        );
 
 }
 
export default ViewProduct