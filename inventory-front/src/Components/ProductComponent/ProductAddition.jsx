import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { addProduct, productIdGenerate } from "../../Services/ProductService";
import { showAllSKUs } from "../../Services/SKUService";
import { getUsersByRole, getUserRole } from "../../Services/LoginService";

const ProductAddition = () => {

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    sku: "",
    purchasePrice: 0.0,
    salesPrice: 0.0,
    reorderLevel: 0.0,
    stock: 0.0,
    status: true,
    vendorId: "",
  });

  const [skuList, setSkuList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch role from backend
    getUserRole().then((res) => {
      setRole(res.data);
      console.log("Fetched role:", res.data);
    });

    // Load SKU and Vendor data
    showAllSKUs().then((res) => setSkuList(res.data));
    productIdGenerate().then((res) => setProduct(values => ({ ...values, productId: res.data })));
    getUsersByRole("Vendor").then((res) => setVendorList(res.data));
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProduct(values => ({ ...values, [name]: value }));
  };

  const reset = (event) => {
    event.preventDefault();
    setProduct(prev => ({
      ...prev,
      productName: "",
      sku: "",
      purchasePrice: 0.0,
      salesPrice: 0.0,
      reorderLevel: 0.0,
      stock: 0.0,
      status: true,
      vendorId: ""
    }));
  };

  const saveProduct = (event) => {
    event.preventDefault();
    if (parseInt(product.stock) <= parseInt(product.reorderLevel)) product.status = false;

    addProduct(product).then(() => {
      alert("Product Added Successfully");
      if (role === "Admin")
        navigate('/AdminMenu');
      else if (role === "Manager")
        navigate('/ManagerMenu');
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!product.productName.trim()) {
      tempErrors.productName = "Product Name is required";
      isValid = false;
    }
    if (!product.sku.trim()) {
      tempErrors.sku = "SKU is required";
      isValid = false;
    }
    if (!product.vendorId.trim()) {
      tempErrors.vendorId = "Vendor ID is required";
      isValid = false;
    }
    if (product.purchasePrice <= 0.0) {
      tempErrors.purchasePrice = "Purchase Price must be greater than 0";
      isValid = false;
    }
    if (product.reorderLevel <= 0.0) {
      tempErrors.reorderLevel = "Reorder Level must be greater than 0";
      isValid = false;
    }
    if (product.stock < 0.0) {
      tempErrors.stock = "Stock cannot be negative";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) saveProduct(event);
  };

  const returnBack = () => {
    console.log("Detected role:", role);
    if (role === "Admin") {
      navigate('/AdminMenu');
    } else if (role === "Manager") {
      navigate('/ManagerMenu');
    } else {
      console.warn("Role not found — staying on current page");
    }
  };

  return (
    <div>
      <br />
      <div className=".container">
        <div className="row">
          <div className="card col-md-2 offset-md-3 offset-md-3">
            <div className="login-box">
              <h2 className="text-center"><u>New Product Addition</u></h2>
              <br />
              <form method="post">
                <div className="form-group">
                  <label>Product ID:</label>
                  <input name="productId" className="form-control" value={product.productId} readOnly />
                </div>

                <div className="form-group">
                  <label>Product Name:</label>
                  <input type="text" placeholder="product name" name="productName" className="form-control"
                    value={product.productName} onChange={onChangeHandler} />
                  {errors.productName && <p style={{ color: "red" }}>{errors.productName}</p>}
                </div>

                <div className="form-group">
                  <label>SKU:</label>
                  <input list="sku" name="sku" className="form-control"
                    value={product.sku} onChange={onChangeHandler} />
                  <datalist id="sku">
                    {skuList.map((sku) => (
                      <option key={sku.skuId} value={sku.skuId}>{sku.skuId}</option>
                    ))}
                  </datalist>
                  {errors.sku && <p style={{ color: "red" }}>{errors.sku}</p>}
                </div>

                <div className="form-group">
                  <label>Purchase Price:</label>
                  <input type="text" name="purchasePrice" className="form-control"
                    value={product.purchasePrice} onChange={onChangeHandler} />
                  {errors.purchasePrice && <p style={{ color: "red" }}>{errors.purchasePrice}</p>}
                </div>

                <div className="form-group">
                  <label>Reorder Level:</label>
                  <input type="text" name="reorderLevel" className="form-control"
                    value={product.reorderLevel} onChange={onChangeHandler} />
                  {errors.reorderLevel && <p style={{ color: "red" }}>{errors.reorderLevel}</p>}
                </div>

                <div className="form-group">
                  <label>Stock:</label>
                  <input type="text" name="stock" className="form-control"
                    value={product.stock} onChange={onChangeHandler} />
                  {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
                </div>

                <div className="form-group">
                  <label>Vendor ID:</label>
                  <input list="vendor" name="vendorId" className="form-control"
                    value={product.vendorId} onChange={onChangeHandler} />
                  <datalist id="vendor">
                    {vendorList.map((vendor) => (
                      <option key={vendor} value={vendor}>{vendor}</option>
                    ))}
                  </datalist>
                  {errors.vendorId && <p style={{ color: "red" }}>{errors.vendorId}</p>}
                </div>

                {/* Button row */}
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <button className="btn btn-primary ms-2" onClick={handleValidation}>Submit</button>&nbsp;&nbsp;
                &nbsp;&nbsp;
                    <button className="btn btn-secondary ms-3" onClick={reset}>Reset</button>&nbsp;&nbsp;
                &nbsp;&nbsp;
                                      <button type="button" className="btn btn-danger ms-3" onClick={returnBack}>Return</button>
                  </div>

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddition;
