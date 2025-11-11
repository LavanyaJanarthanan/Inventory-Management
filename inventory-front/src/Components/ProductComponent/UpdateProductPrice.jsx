import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { priceUpdate,getProductById } from "../../Services/ProductService";
import { useParams } from "react-router-dom";

const UpdateProductPrice = () => {
    const [product,setProduct] = useState({
                    productId:"",
                    productName:"",
                    sku:"",
                    purchasePrice:0.0,
                    salesPrice:0.0,
                    reorderLevel:0.0,
                    stock:0.0,
                    vendorId:"",
                    status:true
    });
    const [price,setPrice]=useState(0.0);
    const param=useParams();
    useEffect(() => {
        getProductById(param.pid).then( response => {
            setProduct(response.data);
            setPrice(response.data.purchasePrice);
        })
    }, [param.pid]);
     
    const reset=(event)=>{
      event.preventDefault()
      setProduct(prev=>({...prev,purchasePrice:price}))
    }
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
                  priceUpdate(product).then((response)=>{
                       alert("Price Updated");
                       navigate('/ProductRepo');    
                     });
                }

     const handleValidation = (event) => {
            event.preventDefault();
            let tempErrors = {};
            let isValid = true;
             if (typeof(product.purchasePrice)==String && !product.purchasePrice.trim()) {
              tempErrors.purchasePrice = "Purchase Price is required";
              isValid = false;
            }
            if (product.purchasePrice===0.0) {
              tempErrors.purchasePrice = "Purchase Price cannot be zero";
              isValid = false;
            }
             if (product.purchasePrice<0.0) {
              tempErrors.purchasePrice = "Purchase Price cannot be negative";
              isValid = false;
            }
            if (product.purchasePrice>0.0 && product.purchasePrice<10.0) {
              tempErrors.purchasePrice = "Purchase Price not less than 10";
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
                    <h2 className="text-center"><u>Product Price Update</u> </h2>
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
                                    value={product.productName} readOnly/>
                            </div>
                            <div className = "form-group">
                                <label>Purchase Price:</label>
                                <input type="text"   name="purchasePrice" className="form-control" autoFocus
                                    value={product.purchasePrice} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.purchasePrice && <p style={{ color: "red" }}>{errors.purchasePrice}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Vendor ID:</label>
                                <input list="vendor"   name="vendorId" className="form-control"
                                    value={product.vendorId} readOnly/>
                            </div>
                             <br/>
                            <button className='btn btn-primary' onClick={handleValidation}>Submit</button>&nbsp;&nbsp;
                            &nbsp;&nbsp;<button className='btn btn-secondary' onClick={reset}>Reset</button>
                        </form>
                    </div>
                 </div>
            </div>
       </div>
    </div>
  )
}

export default UpdateProductPrice