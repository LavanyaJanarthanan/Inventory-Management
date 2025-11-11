import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../DarkTheme.css';
import {registerNewUser} from '../../Services/LoginService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faBoxes, faIdCard, faEnvelope, faUserTag, faCheckDouble } from '@fortawesome/free-solid-svg-icons';


const RegisterUser = () => {
  
    const [inventoryUser,setInventoryUser] = useState({
        username:"",
        personalName:"",
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
            alert("User is registered successfully...Go For Login");
            navigate('/');     
          });
      }
    };

    const reset=(event)=>{
      event.preventDefault()
      const user={username:"",personalName:"",
          password: "",
          email:"",
          role:""}
        setConfirmPassword("");
      setInventoryUser(user);
      setErrors({}); 
    }

    const  onChangeHandler = (event) =>{
      event.persist();
      const name = event.target.name;
          const value = event.target.value;
          setInventoryUser(values =>({...values, [name]: value }));
        };
    
    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

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
        else if (inventoryUser.password.length < 5 || inventoryUser.password.length > 10) { 
            tempErrors.password="Password must be 5-10 characters long";
          isValid = false;
        }
        else if (inventoryUser.password!==confirmPassword) {
          tempErrors.confirmPassword="Both the passwords are not matched";
          isValid = false;
        }
        if (!inventoryUser.personalName.trim()) {
            tempErrors.personalName = "Personal Name is required";
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

        <div className="login-container-wrapper">
          <div className="login-container">
                
            
            <div className="logo-area">
                <FontAwesomeIcon icon={faBoxes} className="logo-icon" />
                <h1>Smartshelfx</h1>
                <p>Your Smart Shelf Management System</p>
            </div>

       
            <div className="register-box-new"> 
              <h2 className="text-center">New User Registration</h2>
                
              <form method="post">
                  
  
                <div className="input-group-custom">
                    <FontAwesomeIcon icon={faUser} />
                    <input placeholder="Username" name="username" 
                        value={inventoryUser.username} onChange={onChangeHandler} 
                    />
                </div>
                {errors.username && <p className="error-text">{errors.username}</p>}
                
        
                <div className="input-group-custom">
                    <FontAwesomeIcon icon={faIdCard} />
                    <input placeholder="Personal Name" name="personalName" 
                        value={inventoryUser.personalName} onChange={onChangeHandler} 
                    />
                </div>
                {errors.personalName && <p className="error-text">{errors.personalName}</p>}
                
     
                <div className="input-group-custom">
                    <FontAwesomeIcon icon={faLock} />
                    <input type="password" placeholder="Password (5-10 chars)" name="password" 
                        value={inventoryUser.password} onChange={onChangeHandler}
                    />
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
                
       
                <div className="input-group-custom">
                    <FontAwesomeIcon icon={faCheckDouble} />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" 
                        value={confirmPassword} onChange={onConfirmPasswordChange}
                    />
                </div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

     
                <div className="input-group-custom">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input type="email" placeholder="User Email" name="email" 
                        value={inventoryUser.email} onChange={onChangeHandler} 
                    />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
                
  
                <div className="input-group-custom">
                    <FontAwesomeIcon icon={faUserTag} />
                    <input list="types" placeholder="Select Role" name="role" 
                        value={inventoryUser.role} onChange={onChangeHandler} 
                    />
                    <datalist id="types">
                        <option value="Manager"/>
                        <option value="Admin"/>
                        <option value="Vendor"/> 	
                    </datalist>
                </div>
                {errors.role && <p className="error-text">{errors.role}</p>}
                

                <div className="register-button-group"> 
                    <button className='register-submit-button' onClick={handleValidation}>REGISTER</button>
                    <button className='register-reset-button' onClick={reset}>RESET</button>
                </div>
                
              </form>
              
              <div className="signup-text-custom">
                  <p>Already have an account? <span className="login-link" onClick={() => navigate('/')}>Login here</span></p>
              </div>
              
            </div>
          </div>
        </div>
    )
}

export default RegisterUser;