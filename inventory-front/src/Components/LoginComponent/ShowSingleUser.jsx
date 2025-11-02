import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSingleUserDetails } from "../../Services/LoginService";

const ShowSingleUser = () => {
  const [inventoryUser, setInventoryUser] = useState({
    username: "",
    personalname: "",
    password: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getSingleUserDetails()
      .then((response) => setInventoryUser(response.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const returnBack = () => {
    if (inventoryUser.role === "Admin") navigate("/AdminMenu");
    if (inventoryUser.role === "Manager") navigate("/ManagerMenu");
    else if (inventoryUser.role === "Vendor") navigate("/VendorMenu");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f6f8fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "400px",
          borderRadius: "16px",
          boxShadow: "0 6px 25px rgba(0, 0, 0, 0.1)",
          padding: "35px 30px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          User Profile
        </h2>

        <div
          style={{
            height: "3px",
            width: "60px",
            backgroundColor: "#007bff",
            borderRadius: "3px",
            margin: "0 auto 25px auto",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {[
            ["User ID", inventoryUser.username],
            ["Personal Name", inventoryUser.personalname],
            ["Email", inventoryUser.email],
            ["Role", inventoryUser.role],
          ].map(([label, value], index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#f8f9fb",
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid #e5e5e5",
              }}
            >
              <span
                style={{
                  fontWeight: "500",
                  color: "#555",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontWeight: "600",
                  color: label === "Role" ? "#007bff" : "#222",
                }}
              >
                {value || "-"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={returnBack}
          style={{
            marginTop: "30px",
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          ← Return
        </button>
      </div>
    </div>
  );
};

export default ShowSingleUser;
