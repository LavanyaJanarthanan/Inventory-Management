import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import {findSKUById, update} from '../../Services/SKUService';


const SKUUpdate = () => {
    const [sku,setSku] = useState({
            skuId:"",
            skuDescription:""
        });
    const [desription,setDesription]=useState();
    const {id}=useParams();

    useEffect(()=>{
        findSKUById(id).then((res)=>{
        setSku(res.data);
        setDesription(res.data.skuDescription);
        })
    },[id])
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const  onChangeHandler = (event) =>{
        event.persist();
        const name = event.target.name;
            const value = event.target.value;
        setSku(values =>({...values, [name]: value }));
    };
    const reset=(event)=>{
      event.preventDefault();
      setSku(prev=>({...prev,skuDescription:desription}))
    }
    const updateSku = (event) => {
          event.preventDefault();
          update(sku).then((response)=>{
               alert("SKU Updated");
               navigate('/AdminMenu');    
             });
        }

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;
        if (!sku.skuDescription.trim()) {
          tempErrors.skuDescription = "SKU Description is required";
          isValid = false;
        }
        setErrors(tempErrors);
        if (isValid) {
          updateSku(event);
        }
      };


  return (
    <div>
     <br/>
       <div className = ".container">
          <div className = "row">
              <div className = "card col-md-2 offset-md-3 offset-md-3">
                  <div className = "login-box">
                    <h2 className="text-center"><u>SKU Update</u> </h2>
                       <br/>
                        <form  method="post">
                            <div className = "form-group">
                                <label>SKU ID: </label>
                                <input  name="skuId" className="form-control"
                                    value={sku.skuId} readOnly/>
                                 {errors.skuId && <p style={{ color: "red" }}>{errors.skuId}</p>}
                            </div>
                            <div className = "form-group">
                                <label>SKU Description: </label>
                                <input type="text"  name="skuDescription" className="form-control" autoFocus
                                    value={sku.skuDescription} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.skuDescription && <p style={{ color: "red" }}>{errors.skuDescription}</p>}
                            </div>
                             <br/>
                            <button className='btn btn-primary' onClick={handleValidation}>Update</button>&nbsp;&nbsp;
                            &nbsp;&nbsp;<button className='btn btn-secondary' onClick={reset}>Reset</button>
                        </form>
                    </div>
                 </div>
            </div>
       </div>
    </div>
  )
};

export default SKUUpdate