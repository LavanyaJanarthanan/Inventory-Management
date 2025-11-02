import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import {save} from '../../Services/SKUService';

const SKUAddition = () => {
    const [sku,setSku] = useState({
            skuId:"",
            skuDescription:""
        });
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const  onChangeHandler = (event) =>{
        event.persist();
        const name = event.target.name;
            const value = event.target.value;
        setSku(values =>({...values, [name]: value }));
    };

    const saveSku = (event) => {
          event.preventDefault();
          save(sku).then((response)=>{
               alert("SKU Added");
                
             });
        }

        const backToRepo=()=>{
          navigate('/SkuRepo');
        }

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;
   
        if (!sku.skuId.trim()) {
          tempErrors.skuId = "SKU Id is required";
          isValid = false;
        }
        if (!sku.skuDescription.trim()) {
          tempErrors.skuDescription = "SKU Description is required";
          isValid = false;
        }
        setErrors(tempErrors);
        if (isValid) {
          saveSku(event);
        }
      };


  return (
    <div>
     <br/>
       <div className = ".container">
          <div className = "row">
              <div className = "card col-md-2 offset-md-3 offset-md-3">
                  <div className = "login-box">
                    <h2 className="text-center"><u>New SKU Addition</u> </h2>
                       <br/>
                        <form  method="post">
                            <div className = "form-group">
                                 <label>SKU ID: </label>
                                <input placeholder="skuId" name="skuId" className="form-control"
                                    value={sku.skuId} onChange={(event) => onChangeHandler(event)} />
                                 {errors.skuId && <p style={{ color: "red" }}>{errors.skuId}</p>}
                            </div>
                            <div className = "form-group">
                                <label>SKU Description: </label>
                                <input type="text"   name="skuDescription" className="form-control"
                                    value={sku.skuDescription} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.skuDescription && <p style={{ color: "red" }}>{errors.skuDescription}</p>}
                            </div>
                             <br/>
<div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
  <button
    type="button"
    className="btn btn-primary"
    onClick={handleValidation}
  >
    Submit
  </button>

  <button
    type="button"
    className="btn btn-warning"
    onClick={() => {
      setSku({
        skuId: "",
        skuDescription: "",
      });
      setErrors({});
    }}
  >
    Reset
  </button>
  <button
    type="button"
    className="btn btn-primary"
    onClick={backToRepo}
  >
  Return
  </button>

  
</div>
                        </form>
                    </div>
                 </div>
            </div>
       </div>
    </div>
  )
};

export default SKUAddition