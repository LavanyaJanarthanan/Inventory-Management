import React, {useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import '../../LoginView.css';
import {getSingleUserDetails} from '../../Services/LoginService';

const ShowSingleUser = () => {
    const [inventoryUser,setInventoryUser] = useState({
        username:"",
        personalName:"",
        password: "",
        email:"",
        role:"",
    });
    let navigate=useNavigate();
    const showUser=()=>{
        getSingleUserDetails().then(response=>{
             setInventoryUser(response.data);  
            });
         }
    useEffect(() => {
        showUser();
    }, []);
          
    const returnBack=()=>{
        if(inventoryUser.role==='Manager')
        navigate('/ManagerMenu');   
    else if(inventoryUser.role==='Vendor')
        navigate('/VendorMenu');
    }
        
    return (
        <div>
            <br></br>
             <div className = "container">
                        <div className = "login-box">
                        <h2 className="text-center"><u>User Details</u></h2>
                        <br/>
                        <div className = "form-group text-center mb-3">
                          <label>User Id: </label>&nbsp;
                          <label>{inventoryUser.username} </label>
                        </div>
                         <div className = "form-group text-center mb-3">
                           <label>Personal Name: </label>&nbsp;
                           <label>{inventoryUser.personalName}</label>
                        </div>
                         <div className = "form-group text-center mb-3">
                           <label>Email: </label>&nbsp;
                           <label>{inventoryUser.email}</label>
                        </div>
                        <div className = "form-group text-center mb-4">
                           <label>Role: </label>&nbsp;
                           <label>{inventoryUser.role}</label>
                        </div>
                        <div className="text-center">
                         <button className="btn btn-warning" onClick={returnBack}>Return</button>
                        </div>   
                     </div>
                </div>
             </div>
    )
}

export default ShowSingleUser