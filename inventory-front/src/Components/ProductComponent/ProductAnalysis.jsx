import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductAnalysis = () => {
    let navigate=useNavigate();
    const [productSale, setProductSale] = useState([]);
    const setProductSalesData=()=>{
        fetch("http://localhost:9898/inventory/analysis")
        .then((res) => res.json())
        .then((data) => {
        const formatted = Object.entries(data).map(([productName,totalSalesValue]) => ({
            productName,
            totalSalesValue,
        }));
   setProductSale(formatted);
 });
 }
 useEffect(() => {
    setProductSalesData();
     }, []);
 const chartData = {
       labels: productSale.map((p) => p.productName),
       datasets: [
         {
           data: productSale.map((p) => p.totalSalesValue),
           backgroundColor: [
             "#FF6384",
             "#36A2EB",
             "#FFCE56",
             "#4BC0C0",
             "#9966FF",
             "#FF9F40",
           ],
         },
       ],
     };

    
    const returnBack=()=>{
      navigate('/AdminMenu');  
  }

    return(
    <div className="max-w-xl mx-auto">
        <h3 className="mb-4 p-3 color text-center">Product Sale Dashboard</h3>
        <div align="left">
        <table className="table m-auto w-50 text-center border mb-6">
        <thead>
            <tr className="table-dark">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Sales Amount</th>
            </tr>
        </thead>
        <tbody className="table-secondary">
            {productSale.map((p, i) => (
            <tr key={i} className="text-center">
                <td className="border px-4 py-2">{p.productName}</td>
                <td className="border px-4 py-2">{p.totalSalesValue.toFixed(2)}</td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
        <div className="text-center mt-4">
         <h5 style={{ color: "white" }}><b>Total Sale per Product</b></h5>
         <div style={{width:"500px",alignContent:"center",justifyContent:"center",margin:"auto"}}>
          <Pie data={chartData}/>
          </div>
          </div >
          <br />
          <div style={{display:"flex",justifyContent:"center"}}>
          <button onClick={()=>returnBack()} className="btn btn-danger">Return</button>    
          </div>
          <br />
    </div>
    );
}

export default ProductAnalysis