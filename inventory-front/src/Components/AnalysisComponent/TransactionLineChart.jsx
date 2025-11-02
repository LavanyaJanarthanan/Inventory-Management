import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getTransactionAnalysisByType } from "../../Services/StockTransactionService";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const TransactionLineChart = () => {
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getTransactionAnalysisByType().then((res) => {
      const data = res.data;

      // Extract labels (dates)
      const dates = data.map((item) => item.transactionDate);

      // Separate IN and OUT values
      const inValues = data.map((item) =>
        item.transactionType === "IN" ? item.totalValue : 0
      );
      const outValues = data.map((item) =>
        item.transactionType === "OUT" ? item.totalValue : 0
      );

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "IN Transactions",
            data: inValues,
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.3)",
            tension: 0.3,
          },
          {
            label: "OUT Transactions",
            data: outValues,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            tension: 0.3,
          },
        ],
      });
    });
  }, []);

  const returnBack = () => {
    navigate("/AdminMenu");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Transaction Analysis (IN vs OUT)
      </h3>
      {chartData.labels ? (
        <Line data={chartData} />
      ) : (
        <p>Loading transaction data...</p>
      )}
      <button
        className="btn btn-success mt-4"
        onClick={returnBack}
      >
        Return
      </button>
    </div>
  );
};

export default TransactionLineChart;
