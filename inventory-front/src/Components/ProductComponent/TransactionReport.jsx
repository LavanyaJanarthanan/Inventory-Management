import {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { useEffect } from 'react';
import {getUserRole} from '../../Services/LoginService';
import { getTransactionsByType } from "../../Services/TransactionService";

const TransactionReport = () => {
    const [role,setRole] =useState("");
    const [transactionList,setTransactionList] = useState([]);
    let navigate = useNavigate();
    const {type}=useParams();
    const displayAll=()=>{
        getTransactionsByType(type).then((response)=>{
            setTransactionList(response.data);
        })
    }
    const setUserRole=()=>{
            getUserRole().then( response => {
                setRole(response.data);
           })
        }
    useEffect(()=>{
        displayAll();
        setUserRole();
    },[]);

    const returnBack=()=>{
        if(role==="Admin")
            navigate('/AdminMenu');
        else if(role==="Manager")
            navigate('/ManagerMenu');
    }


  return (
     <div className="text-center">
        <div>
             <h2 className="text-center top-bar p-2">{type==="OUT" ? <>Issue List</> : <>Purchase List</>}</h2>
              <table className = "table table-striped table-bordered table-hover">
               <thead className="no-wrap table-dark">
               <tr>
                 <th>Transaction ID</th>
                 <th>Product ID</th>
                 <th>Rate</th>
                 <th>Quantiity</th>
                 <th>Transaction Value</th>
                 <th>Transaction Date</th>
                 <th>User Name</th>
              </tr>
              </thead>
              <tbody>
                 {
                    transactionList.map((transaction) => (
                      <tr key = {transaction.transactionId}>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.productId}</td>
                      <td>{transaction.rate}</td>
                      <td>{transaction.quantity}</td>
                      <td>{transaction.transactionValue}</td>
                      <td>{transaction.transactionDate}</td>
                      <td>{transaction.userId}</td> 
                      </tr>
                  ) )
               }                        
         </tbody>
        </table>
         <br/>
         <button style={{width:"fit-content"}} onClick={()=>returnBack()} className="btn btn-danger d-block mx-auto">Return</button>    
       </div>
     </div>
  )
}

export default TransactionReport