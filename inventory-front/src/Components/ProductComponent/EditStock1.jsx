import React, { useEffect, useState } from "react";
import { stockUpdate, getProductById } from "../../Services/ProductService";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleUserDetails } from "../../Services/LoginService";
import { generateId, saveTransactions } from "../../Services/StockTransactionService";

const EditStock1 = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [flag, setFlag] = useState(0);
  const [newId, setNewId] = useState(0);
  const [tValue, setTvalue] = useState(0.0);
  const [quantity, setQuantity] = useState("");
  const [showWarning, setShowWarning] = useState("");
const [transactionDate, setTransactionDate] = useState(
  new Date().toISOString().split("T")[0]
);



  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    sku: "",
    purchasePrice: 0.0,
    salesPrice: 0.0,
    reorderLevel: 0.0,
    stock: 0.0,
    vendorId: "",
  });

  const [iUser, setIUser] = useState({
    username: "",
    personalname: "",
    password: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    getProductById(param.pid)
      .then((response) => {
        setProduct(response.data);
        setFlag(param.flag);
      })
      .catch((err) => console.error("Error fetching product:", err));

    getSingleUserDetails()
      .then((response) => setIUser(response.data))
      .catch((err) => console.error("Error fetching user:", err));

    generateId()
      .then((response) => setNewId(response.data))
      .catch((err) => console.error("Error generating transaction ID:", err));
  }, [param.pid, param.flag]);

  // ✅ Recalculate transaction value dynamically
  useEffect(() => {
    const rate = parseInt(flag) === 1 ? product.purchasePrice : product.salesPrice;
    const q = parseFloat(quantity);
    if (!isNaN(q) && q > 0) {
      setTvalue(rate * q);
    } else {
      setTvalue(0);
    }
  }, [quantity, flag, product]);

  const returnBack = () => navigate("/ProductRepo");

  const handleQuantityChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setQuantity("");
      setTvalue(0);
      return;
    }

    const num = parseFloat(val);
    if (isNaN(num)) return;

    if (num <= 0) {
      alert("Quantity must be greater than zero.");
      setQuantity("");
      setTvalue(0);
      return;
    }

    setQuantity(val);
  };

  // ✅ Reset function to mimic page refresh
const resetForm = () => {
  setQuantity("");
  setTvalue(0);
  setShowWarning("");
  setTransactionDate(new Date().toISOString().split("T")[0]);



  getProductById(param.pid)
    .then((response) => setProduct(response.data))
    .catch((err) => console.error("Error fetching product:", err));

  generateId()
    .then((response) => setNewId(response.data))
    .catch((err) => console.error("Error generating transaction ID:", err));
};


  const updateProd = async (event) => {
    event.preventDefault();
    setShowWarning("");

    const q = parseFloat(quantity);
    if (isNaN(q) || q <= 0) {
      alert("Please enter a valid quantity greater than zero.");
      return;
    }

    try {
      await stockUpdate(product, q, flag);

      const updatedStock =
        parseInt(flag) === 1
          ? parseFloat(product.stock) + q
          : parseFloat(product.stock) - q;

      if (updatedStock <= parseFloat(product.reorderLevel)) {
        setShowWarning(
          `⚠️ Stock for ${product.productName} is below reorder level (${product.reorderLevel}).`
        );
      }

      const rate = parseInt(flag) === 1 ? product.purchasePrice : product.salesPrice;
      const tType = parseInt(flag) === 1 ? "IN" : "OUT";
      const tVal = rate * q;

      const newTransaction = {
        transactionId: newId,
        transactionType: tType,
        productId: product.productId,
        rate: rate,
        quantity: q,
        transactionValue: tVal,
        userId: iUser.username,
        transactionDate: transactionDate || new Date().toISOString().split("T")[0],

      };

      await saveTransactions(newTransaction);

      alert("Stock and Transaction Updated Successfully");
    } catch (err) {
      console.error("Error saving transaction:", err);
      alert("Failed to update stock or save transaction. Check console for details.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
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
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          padding: "35px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: 600,
            color: "#333",
            letterSpacing: "0.5px",
          }}
        >
          {parseInt(flag) === 1 ? "Product Purchase" : "Product Issue"}
        </h3>

        {/* ✅ Reorder Level Warning Message */}
        {showWarning && (
          <div
            style={{
              backgroundColor: "#fff3cd",
              color: "#856404",
              border: "1px solid #ffeeba",
              borderRadius: "8px",
              padding: "10px 15px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {showWarning}
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          {[
            ["Product ID", product.productId],
            ["Product Name", product.productName],
            ["SKU", product.sku],
            ["Reorder Level", product.reorderLevel],
            ["Stock", product.stock],
            ["Vendor ID", product.vendorId],
          ].map(([label, value], index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: 500,
                color: "#444",
              }}
            >
              <label>{label}:</label>
              <span>{value}</span>
            </div>
          ))}

          {parseInt(flag) === 1 ? (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500, color: "#444" }}>
              <label>Purchase Price:</label>
              <span>{product.purchasePrice}</span>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 500, color: "#444" }}>
              <label>Sales Price:</label>
              <span>{product.salesPrice}</span>
            </div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Transaction ID:</label>
          <input
            name="transactionId"
            className="form-control"
            value={newId}
            readOnly
            style={{
              backgroundColor: "#f3f3f3",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* ✅ Quantity Input */}
        <div className="form-group mb-3">
          <label>
            <b>
              {parseInt(flag) === 1 ? "Enter Purchase Quantity:" : "Enter Issue Quantity:"}
            </b>
          </label>
          <input
            type="number"
            inputMode="decimal"
            step="any"
            name="stock"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            autoComplete="off"
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              MozAppearance: "textfield",
            }}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        {/* ✅ Transaction Date Input */}
<div className="form-group mb-3">
  <label><b>Transaction Date:</b></label>
  <input
    type="date"
    className="form-control"
    value={transactionDate}
    onChange={(e) => setTransactionDate(e.target.value)}
    style={{
      borderRadius: "8px",
      border: "1px solid #ccc",
      padding: "8px",
    }}
  />
</div>


        {/* ✅ Transaction Value display */}
        {quantity && parseFloat(quantity) > 0 && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Transaction Value: ₹{tValue.toFixed(2)}
          </div>
        )}

        {/* ✅ Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "25px",
          }}
        >
          <button
            onClick={updateProd}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Save
          </button>

          <button
            onClick={resetForm}
            style={{
              backgroundColor: "#ffc107",
              color: "black",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e0a800")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
          >
            Reset
          </button>

          <button
            onClick={returnBack}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStock1;


