import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import {validateUser} from '../../Services/LoginService';

const LoginPage = () => {

    const [formData, setFormData] =useState ({
        username: "",
        password: "",
        });

    const [errors, setErrors] = useState({});

    let navigate = useNavigate();

    const checkLogin=(e)=>{
        e.preventDefault();
         validateUser(formData.username,formData.password).then((response)=>{
         let role=String(response.data);
          if(role==="Admin")
              navigate('/AdminMenu');
        else if(role==="Manager")
             navigate('/ManagerMenu');
        else if(role==="Vendor")
             navigate('/VendorMenu');
        else
           alert("Wrong Userid/Password");
        });
    }
    const  onChangeHandler = (event) =>{
      event.persist();
      const name = event.target.name;
          const value = event.target.value;
         setFormData(values =>({...values, [name]: value }));
       };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;
   
        if (!formData.username.trim()) {
          tempErrors.username = "User Name is required";
          isValid = false;
        }
   
        if (!formData.password.trim()) {
          tempErrors.password = "Password is required";
          isValid = false;
        }
   
        setErrors(tempErrors);
        if (isValid) {
          checkLogin(event);
        }
      };
      
    const registerNewUser=(e)=>{
        navigate('/Register');
    }

  return (
     <div>
        <br/>
         <div className = "container">
                  <div className = "card col-md-3 offset-md-3 offset-md-3">
                     <div className = "login-box">
                      <h2 className="text-center">Login</h2>
                         <br/>
                          <form  method="get" autocomplete="off">
                            <div className = "form-group">
                                   <label>User Name: </label>
                                  <input autocomplete="off" placeholder="username" name="username" className="form-control"
                                      value={formData.username} onChange={onChangeHandler} />
                               {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                              </div>
                              <div className = "form-group">
                                  <label>Password: </label>
                                  <input type="password"   name="password" className="form-control"
                                      value={formData.password} onChange={onChangeHandler}/>
                                   {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                              </div>
                              <br/>
                              <button className='btn btn-primary' onClick={handleValidation}>Submit</button>
                          </form>
                          <div>
                         <br/>
                       <button className='btn btn-info' onClick={(e) => registerNewUser(e)}>Register New User</button>
                      </div>
                   </div>
              </div>
          </div>
  </div>
 
 
 
  )
}

export default LoginPage