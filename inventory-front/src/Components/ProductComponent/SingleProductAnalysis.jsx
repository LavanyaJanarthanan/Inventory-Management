import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { Line } from "react-chartjs-2";
import { getAllProducts } from "../../Services/ProductService";
import { getDemandByProduct } from "../../Services/TransactionService";
import { getUserRole } from "../../Services/LoginService";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const SingleProductAnalysis = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [demandData, setDemandData] = useState([]);

  const fetchAllProducts = () => {
    getAllProducts().then((response) => {
      setProducts(response.data);
    });
  };

  const setUserRole = () => {
    getUserRole().then((response) => {
      setRole(response.data);
    });
  };

  const fetchProductDemand = (productId) => {
    if (!productId) return;
    getDemandByProduct(productId).then((response) => {
      setDemandData(response.data);
    });
  };

  useEffect(() => {
    fetchAllProducts();
    setUserRole();
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
    fetchProductDemand(productId);
  };

  const chartData = {
    labels: demandData.map((_, i) => `T${i + 1}`),
    datasets: [
      {
        label: "Product Demand Trend",
        data: demandData,
        borderColor: "#4CAF50",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(76, 175, 80, 0.05)");
          gradient.addColorStop(1, "rgba(76, 175, 80, 0.35)");
          return gradient;
        },
        fill: true,
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#2e7d32",
        pointBorderColor: "#fff",
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#1b5e20",
        pointHoverBorderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#2c3e50",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1b5e20",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#4CAF50",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Transaction Count",
          color: "#2c3e50",
          font: { size: 14 },
        },
        ticks: { color: "#2c3e50", font: { size: 12 } },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Demand Value",
          color: "#2c3e50",
          font: { size: 14 },
        },
        ticks: { color: "#2c3e50", font: { size: 12 } },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else if (role === "Manager") navigate("/ManagerMenu");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-4 border-0">
        <h3 className="text-center mb-4 color">📊 Single Product Demand Trend</h3>

        <div className="text-center mb-4">
          <label className="form-label fw-bold me-2">Select Product: </label>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="form-select d-inline-block w-auto shadow-sm"
          >
            <option value="">-- Select --</option>
            {products.map((prod) => (
              <option key={prod.productId} value={prod.productId}>
                {prod.productName}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && demandData.length > 0 ? (
          <div style={{ height: "400px", width: "100%" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          selectedProduct && (
            <p className="text-center mt-3 text-muted">
              No demand data found for this product.
            </p>
          )
        )}

        <div className="text-center mt-4">
          <button onClick={returnBack} className="btn btn-danger px-4">
            ⬅ Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductAnalysis;
