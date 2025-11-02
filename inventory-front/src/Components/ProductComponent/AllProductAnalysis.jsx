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
 
const AllProductAnalysis=()=>{

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
             "#e3ff66ff",
             "#FF9F40", 
             "#92c239ff",
             "#bbc444ff",
             "#41bda8ff",
             "#b34848ff",
             "#FF9F40",
            

             "#"
           ],
         },
       ],
     };
   
  const returnBack=()=>{
      navigate('/AdminMenu');  
  }

  return(
   <div className="p-4 max-w-xl mx-auto">
     <h3 className="text-2xl font-bold mb-4">Product Sale Dashboard</h3>
     <div align="left">
     <table className="w-full border mb-6">
       <thead>
         <tr className="bg-gray-200">
           <th className="border px-4 py-2">Product Name</th>
           <th className="border px-4 py-2">Sales Amount</th>
         </tr>
       </thead>
       <tbody>
         {productSale.map((p, i) => (
           <tr key={i} className="text-center">
             <td className="border px-4 py-2">{p.productName}</td>
             <td className="border px-4 py-2">{p.totalSalesValue.toFixed(2)}</td>
           </tr>
         ))}
      </tbody>
     </table>
     </div>
     <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
     <div style={{ width: "80%", maxWidth: "300px" }}>
       <h5>Total Sale per Product</h5>
       <Pie data={chartData} />
     </div>
   </div>
   <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>    
</div>
);
 
 

}

export default AllProductAnalysis;