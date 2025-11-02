
import React, { useEffect, useState } from "react";
import { getOutTransactionsReport } from "../../Services/StockTransactionService";
import {getUserRole} from '../../Services/LoginService';
import { useNavigate } from 'react-router-dom';



const OutTransactionReport = () => {
  const [transactions, setTransactions] = useState([]);
  const[role,setRole]=useState("");
      let navigate = useNavigate();
  

  useEffect(() => {
    setUserRole();
    getOutTransactionsReport()
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));

  }, []);

  const setUserRole=()=>{
              getUserRole().then( response => {
                  setRole(response.data);
             })
          }
      

  const returnBack=()=>{
    if(role==="Admin")
    navigate('/AdminMenu');
  else if(role==="Manager")
    navigate('/ManagerMenu');

  }

  return (
    <div className="text-center">
                  <hr style={{height: "3px", borderWidth:0, color:"yellow" }}/>

      <h2 className="text-center">IN Transaction Report</h2>
      <table className = "table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Value</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transactionId}>
              <td>{t.transactionId}</td>
              <td>{t.productId}</td>
              <td>{t.quantity}</td>
              <td>{t.rate}</td>
              <td>{t.transactionValue}</td>
              <td>{t.userId}</td>
              <td>{t.transactionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
               <button style={{width:"fit-content"}} onClick={()=>returnBack()} className="btn btn-success d-block mx-auto">Return</button>    

    </div>
  );
};

export default OutTransactionReport;
