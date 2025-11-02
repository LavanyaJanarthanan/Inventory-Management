import {BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import ManagerMenu from "./Components/LoginComponent/ManagerMenu";
import './App.css';
import VendorMenu from "./Components/LoginComponent/VendorMenu";
import ShowSingleUser from "./Components/LoginComponent/ShowSingleUser";
import SKUAddition from "./Components/SKUComponent/SKUAddition";
import SKUReport from "./Components/SKUComponent/SKUReport";
import SKUUpdate from "./Components/SKUComponent/SKUUpdate";
import ProductAddition from "./Components/ProductComponent/ProductAddition";
import ProductReport from "./Components/ProductComponent/ProductReport";
import ViewProduct from "./Components/ProductComponent/ViewProduct";
import UpdateProductPrice from "./Components/ProductComponent/UpdateProductPrice";
import EditStock1 from "./Components/ProductComponent/EditStock1";
import InTransactionReport from "./Components/TransactionComponent/InTransactionReport";
import OutTransactionReport from "./Components/TransactionComponent/OutTransactionReport";
import AllProductAnalysis from "./Components/ProductComponent/AllProductAnalysis";
import TransactionLineChart from "./Components/AnalysisComponent/TransactionLineChart";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterUser/>}/>
        <Route path="/AdminMenu" element={<AdminMenu/>}/>
        <Route path="/ManagerMenu" element={<ManagerMenu/>}/>
        <Route path="/VendorMenu" element={<VendorMenu/>}/>
        <Route path="/ShowSingleUser" element={<ShowSingleUser/>}/>
        <Route path="/SkuAdd" element={<SKUAddition/>}/>
        <Route path="/SkuRepo" element={<SKUReport/>}/>
        <Route path="/update-sku/:id" element={<SKUUpdate/>}/>
        <Route path="/ProAdd" element={<ProductAddition/>}/>
        <Route path="/ProductRepo" element={<ProductReport/>}/>
        <Route path="/view-product/:pid" element={<ViewProduct/>}/>
        <Route path="/update-prodPrice/:pid/" element={<UpdateProductPrice/>}/>
        <Route path="/edit-stock/:pid/:flag" element={<EditStock1/>}/>
        <Route path="/In-Transaction-Report" element={<InTransactionReport/>}></Route>
                <Route path="/Out-Transaction-Report" element={<OutTransactionReport/>}></Route>
                <Route path="/all-products" element={<AllProductAnalysis/>}></Route>
                <Route path="/tran" element={<TransactionLineChart/>}></Route>

      </Routes>
     </BrowserRouter>
 
    </div>
  );
}

export default App;
