import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { addProduct,productIdGenerate } from "../../Services/ProductService";
import { showAllSKUs } from "../../Services/SKUService";
import { getUsersByRole } from "../../Services/LoginService";

const ProductAddition=()=>{

    const [product,setProduct] = useState({
                productId:"",
                productName:"",
                sku:"",
                purchasePrice:0.0,
                salesPrice:0.0,
                reorderLevel:0.0,
                stock:0.0,
                vendorId:"",
                status:true,
            });
        const [skuList,setSkuList]=useState([]);
        const [vendorList,setVendorList]=useState([]);

        useEffect(()=>{

            showAllSKUs().then((res)=>{
            setSkuList(res.data);
            })

            productIdGenerate().then((res)=>{
            setProduct(values=> ({...values,productId:res.data}))
            })

            getUsersByRole("Vendor").then((res)=>{
                setVendorList(res.data);
            })
        },[])
        

        let navigate = useNavigate();
        const [errors, setErrors] = useState({});
    
        const  onChangeHandler = (event) =>{
            event.persist();
            const name = event.target.name;
                const value = event.target.value;
            setProduct(values =>({...values, [name]: value }));
        };
    
        const saveProduct = (event) => {
              event.preventDefault();
              if(parseFloat(product.stock)<=parseFloat(product.reorderLevel))
                product.status=false;
              addProduct(product).then((response)=>{
                   alert("Product Added");
                      
                 });
            }

        const resetForm = () => {
  
  setProduct({
    productId: "", 
    productName: "",
    sku: "",
    purchasePrice: 0.0,
    salesPrice: 0.0,
    reorderLevel: 0.0,
    stock: 0.0,
    vendorId: "",
    status: true,
  });

  
  setErrors({});

  // Optionally, fetch a new Product ID again
  productIdGenerate().then((res) => {
    setProduct((values) => ({ ...values, productId: res.data }));
  });
};

        const returnBack=()=>{
          navigate('/AdminMenu');
        }
    
        const handleValidation = (event) => {
            event.preventDefault();
            let tempErrors = {};
            let isValid = true;
       
            if (!product.productName.trim()) {
              tempErrors.productName = "Product Name is required";
              isValid = false;
            }
            if (product.purchasePrice===0) {
              tempErrors.purchasePrice = "Purchase Price  is required";
              isValid = false;}

            else if(product.purchasePrice<=0){
                tempErrors.purchasePrice="Purchase Price must be greater than zero";
                isValid=false;
            }
            if (product.reorderLevel===0) {
              tempErrors.reorderLevel = "Reorder Level is required";
              isValid = false;
            }
            else if (product.reorderLevel<=0) {
              tempErrors.reorderLevel = "Reorder Level must be greater than zero";
              isValid = false;
            }

            if (product.stock===0) {
              tempErrors.stock = "Stcok is required";
              isValid = false;
            }

            else if (product.stock<=0) {
              tempErrors.stock = "Stcok must be greater than zero";
              isValid = false;
            }
             if (!product.sku.trim()) {
              tempErrors.sku = "SKU is required";
              isValid = false;
            } if (!product.vendorId.trim()) {
              tempErrors.vendorId = "Vendor ID is required";
              isValid = false;
            }

            setErrors(tempErrors);
            if (isValid) {
              saveProduct(event);
            }
          };
    


    return (
    <div>
     <br/>
       <div className = ".container">
          <div className = "row">
              <div className = "card col-md-2 offset-md-3 offset-md-3">
                  <div className = "login-box">
                    <h2 className="text-center"><u>New Product Addition</u> </h2>
                       <br/>
                        <form  method="post">
                            <div className = "form-group">
                                 <label>Product ID: </label>
                                <input name="productId" className="form-control"
                                    value={product.productId} readOnly />
                            </div>
                            <div className = "form-group">
                                <label>Product Name:</label>
                                <input type="text"  placeholder="product name" name="productName" className="form-control"
                                    value={product.productName} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.productName && <p style={{ color: "red" }}>{errors.productName}</p>}
                            </div>
                            <div className = "form-group">
                                <label>SKU:</label>
                                <input  list="sku"  name="sku" className="form-control"
                                    value={product.sku} onChange={(event) => onChangeHandler(event)}/>
                                <datalist id="sku">
                                    {skuList.map((sku) => (
                                    <option key={sku.skuId} value={sku.skuId}>
                                        {sku.skuId}
                                    </option>
                                    ))}
                                </datalist>
                                 {errors.sku && <p style={{ color: "red" }}>{errors.sku}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Purchase Price:</label>
                                <input type="text"   name="purchasePrice" className="form-control"
                                    value={product.purchasePrice} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.purchasePrice && <p style={{ color: "red" }}>{errors.purchasePrice}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Reorder Level:</label>
                                <input type="text"   name="reorderLevel" className="form-control"
                                    value={product.reorderLevel} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.reorderLevel && <p style={{ color: "red" }}>{errors.reorderLevel}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Stock:</label>
                                <input type="text"   name="stock" className="form-control"
                                    value={product.stock} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Vendor ID:</label>
                                <input list="vendor"   name="vendorId" className="form-control"
                                    value={product.vendorId} onChange={(event) => onChangeHandler(event)}/>
                                <datalist id="vendor">
                                    {vendorList.map((vendor) => (
                                    <option key={vendor} value={vendor}>
                                        {vendor}
                                    </option>
                                    ))}
                                </datalist>
                                 {errors.vendorId && <p style={{ color: "red" }}>{errors.vendorId}</p>}
                            </div>
                             <br/>
{/* ✅ Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "25px",
          }}
        >
          <button
            onClick={handleValidation}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Submit
          </button>

          <button
            onClick={resetForm}
            type="button"
            style={{
              backgroundColor: "#ffc107",
              color: "black",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e0a800")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
          >
            Reset
          </button>

          <button
            onClick={returnBack}
            type="button"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Cancel
          </button></div>
                                </form>
                    </div>
                 </div>
            </div>
       </div>
    </div>
  )

}

export default ProductAddition