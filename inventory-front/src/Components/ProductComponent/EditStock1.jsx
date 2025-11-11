import { useEffect, useState } from 'react';
import {stockUpdate,getProductById} from '../../Services/ProductService';
import {useParams, useNavigate} from "react-router-dom";
import { saveTransaction, transactionIdGenerate } from '../../Services/TransactionService';
import { getSingleUserDetails } from '../../Services/LoginService';
import '../../LoginView.css';
const EditStock1 = () => {    
    const param = useParams();
    const [flag,setFlag]=useState(0);
    const [date,setDate]=useState("");
    const [errors,setErrors]=useState({});
    const navigate = useNavigate();
    const [stock,setStock]=useState(0.0);
    const [id,setId]=useState(0);
    const [show,setShow]=useState(false);
    const today = new Date().toISOString().split("T")[0];
    const [transaction,setTransaction]=useState({
        transactionId:0,
        transactionType:"",
        productId:"",
        rate:0.0,
        quantity:0.0,
        transactionValue:0.0,
        userId:"",
        transactionDate:""
    })
    const [user,setUser] = useState({
            username:"",
            personalName:"",
            password: "",
            email:"",
            role:"",
        });
    
    const [product,setProduct]=useState({
            productId:"",
            productName: "",
            sku:"",
            purchasePrice: 0.0,
            salesPrice:0.0,
            reorderLevel:0.0,
            stock:0.0,
            vendorId:"",
            status:true
   });
   
   const saveProd=(param)=>{
      getProductById(param.pid).then(response => {
            setProduct(response.data);
        })
   }

   const reset=()=>{
      setStock(0.0);
      setDate("");
   }

   const genId=()=>{
    transactionIdGenerate().then((res)=>{
          setId(res.data);
        })
   }
   const saveUser=()=>{
     getSingleUserDetails().then((res)=>{
          setUser(res.data);
        })
   }
   const formatDate = (date) => {
    if (!date) {
      date=today;
      setDate(today);
    }
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
    useEffect(() => { 
        saveUser();
        setFlag(parseInt(param.flag))
         genId();
      },[param]);

      useEffect(()=>{
        saveProd(param);
      },[param,transaction]);
    
    const returnBack=()=>{
        navigate('/ProductRepo');
    }

    const updateProd=(event)=>{
      let type="IN";
      if(flag===2) type="OUT";
      const newTransaction={...transaction,transactionDate:formatDate(date),quantity:stock,transactionId:id,userId:user.username};
      saveTransaction(newTransaction,product.productId,type).then((res)=>{
          setTransaction(res.data);
          setShow(true);
      }) 
      stockUpdate(product,stock,flag).then((res)=>{
        alert("Stock Updated")
      })
    }

    const handleValidation=(event)=>{
      event.preventDefault();
      let tempErrors = {};
      let isValid = true;
      if(stock==0.0){
        tempErrors.stock="Quantity cannot be zero"
        isValid=false;
      }
      if(stock<0.0){
        tempErrors.stock="Quantity cannot be neagtive"
        isValid=false;
      }
      if(stock!==0.0 && !stock.trim()){
        tempErrors.stock="Quantity is required"
        isValid=false;
      }
      if(flag===2 && stock>product.stock){
        tempErrors.issue = "Issue Quantity Exceeded Stock";
        isValid = false;
      }
      setErrors(tempErrors);
      if (isValid) {
        updateProd(event);
      }
    }
      
   return (
    <div
        style={{
          maxHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }} 
      >
        <div
          style={{
            width: "480px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            padding: "20px 30px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            maxHeight:"95vh"
          }} className='scroller'
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
          {flag===1 ? <>Product Purchase</> :<>Product Issue</>}
          </h3>

          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>Product ID:</label>
              <span>{product.productId}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>Product Name:</label>
              <span>{product.productName}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>SKU:</label>
              <span>{product.sku}</span>
            </div>
            {flag===1 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>Purchase Price:</label>
              <span>{product.purchasePrice}</span>
            </div>}
            {flag===2 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>Sales Price:</label>
              <span>{product.salesPrice}</span>
            </div>}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
            <label>Reorder Level:</label>
              <span>{product.reorderLevel}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>Stock:</label>
              <span>{product.stock}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500 }}>
              <label>Vendor ID:</label>
              <span>{product.vendorId}</span>
            </div>
             {flag===2 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0px", fontWeight: 500 }}>
              <label>Stock Status:</label>
              <span>{product.status ? <p style={{color:"green",margin:"0"}}>Permitted to Issue</p> :<p style={{color:"red",margin:"0"}}>Reached Reorder Level</p>}</span>
            </div>}
          </div>
          <div className = "form-group">
              <label style={{fontWeight:"600"}}>Transaction ID:</label>
              <input type="text"   name="id" className="form-control" 
                  value={id} readOnly/>
          </div>
          <div className = "form-group">
              <label style={{fontWeight:"600",marginBottom:"5px"}}>Transaction Date:</label>
              <input type="date"   name="date" className="form-control" value={date} min={today} onChange={(event)=>(setDate(event.target.value))}/>
              {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
          </div>
          <div className = "form-group">
              <label style={{marginTop:"5px"}}><b>Enter Stock Quantity:</b></label>
              <input type="text"   name="stock" className="form-control" 
                  value={stock} onChange={(event) => setStock(event.target.value)}/>
                  {errors.purchase && <p style={{ color: "red" }}>{errors.purchase}</p>}
                   {errors.issue && <p style={{ color: "red" }}>{errors.issue}</p>}
                   {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
          </div>
          <div style={{ display: "flex",marginTop:"15px",justifyContent:"space-evenly"}} >
          <button
            onClick={handleValidation}
            className="btn btn-success"
          >
          Save
          </button>
          <button
            onClick={reset}
            className="btn btn-secondary"
          >
          Reset
          </button>
          <button
            onClick={returnBack}
            className="btn btn-danger"
          >
          Return
          </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around",marginTop: "10px", fontWeight: 600 }}>
            {show && <p>Transaction Value: &#8377;{transaction.transactionValue}</p>}</div>
        </div>
      </div>
        );

}
export default EditStock1