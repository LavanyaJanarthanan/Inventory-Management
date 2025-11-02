import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import {registerNewUser} from '../../Services/LoginService';


const RegisterUser = () => {
    const [inventoryUser,setInventoryUser] = useState({
        username:"",
        personalname:"",
        password: "",
        email:"",
        role:"",
    });
    const [confirmPassword,setConfirmPassword]=useState("");
   let navigate = useNavigate();
   const [errors, setErrors] = useState({});
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
   const saveUser = (event) => {
      event.preventDefault();
      if(inventoryUser.password===confirmPassword){
         registerNewUser(inventoryUser).then((response)=>{
           alert("User is registered successfully...");
             
         });
    }
  };

  const  onChangeHandler = (event) =>{
    event.persist();
    const name = event.target.name;
        const value = event.target.value;
       setInventoryUser(values =>({...values, [name]: value }));
     };

     const returnBack=()=>{
      navigate('/');
     }

     const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;
   
        if (!inventoryUser.username.trim()) {
          tempErrors.username = "User Name is required";
          isValid = false;
        }
   
        if (!inventoryUser.password.trim()) {
          tempErrors.password = "Password is required";
          isValid = false;
        }
        else if (inventoryUser.password.length < 5 || inventoryUser.passwordlength > 10) {
           tempErrors.password="Password must be 5-10 characters long";
          isValid = false;
        }
        else if (inventoryUser.password!==confirmPassword) {
          tempErrors.password="Both the passwords are not matched";
         isValid = false;
       }
        if (!inventoryUser.personalname.trim()) {
            tempErrors.personalname = "Personal Name is required";
            isValid = false;
          }
          if (!inventoryUser.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
          }
          else if(!emailPattern.test(inventoryUser.email)){
            tempErrors.email = "Invalid Email Format";
            isValid = false;
          }
          if (!inventoryUser.role.trim()) {
            tempErrors.role = "Role is required";
            isValid = false;
          }
          if (!confirmPassword.trim()) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
          }
 
        setErrors(tempErrors);
        if (isValid) {
          saveUser(event);
        }
      };



  return (
    <div>
     <br/>
       <div className = ".container">
          <div className = "row">
              <div className = "card col-md-2 offset-md-3 offset-md-3">
                  <div className = "login-box">
                    <h2 className="text-center"><u>New User Registration</u> </h2>
                       <br/>
                        <form  method="post">
                            <div className = "form-group">
                                 <label>User Name: </label>
                                <input placeholder="username" name="username" className="form-control"
                                    value={inventoryUser.username} onChange={(event) => onChangeHandler(event)} />
                                 {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Password: </label>
                                <input type="password"   name="password" className="form-control"
                                    value={inventoryUser.password} onChange={(event) => onChangeHandler(event)}/>
                                 {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                            </div>
                            <div className = "form-group">
                                <label>Retype your Password: </label>
                                <input type="password"   name="confirmPassword" className="form-control"
                                    value={confirmPassword} onChange={(event) =>setConfirmPassword(event.target.value)}/>
                                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                            </div>
                            <div className = "form-group">
                                 <label>User's Personal Name: </label>
                                <input placeholder="personal name" name="personalname" className="form-control"
                                    value={inventoryUser.personalname} onChange={(event) => onChangeHandler(event)} />
                                 {errors.personalname && <p style={{ color: "red" }}>{errors.personalname}</p>}
                            </div>
                            <div className = "form-group">
                                 <label>User Email: </label>
                                <input placeholder="email" name="email" className="form-control"
                                    value={inventoryUser.email} onChange={(event) => onChangeHandler(event)} />
                                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            </div>
                            <div className = "form-group">
                               <label>Select Role : </label>
                                <input list="types"  name="role" className="form-control"
                                    value={inventoryUser.role} onChange={(event) => onChangeHandler(event)} />
                                    <datalist id="types">
                                      <option value="Manager"/>
                                    <option value="Admin"/>
                                    <option value="Vendor"/>    
                                   </datalist>
                                   {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
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
      setInventoryUser({
        username: "",
        personalname: "",
        password: "",
        email: "",
        role: "",
      });
      setConfirmPassword("");
      setErrors({});
    }}
  >
    Reset
  </button>
  <button
    type="button"
    className="btn btn-primary"
    onClick={returnBack}
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
}

export default RegisterUser