import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../LoginView.css";
import "../../App.css";
import { showAllSKUs, removeSKU } from "../../Services/SKUService";
import { getUserRole } from "../../Services/LoginService";

const SKUReport = () => {
  const [role, setRole] = useState("");
  const [skuList, setSkuList] = useState([]);
  let navigate = useNavigate();

  const displayAllSKUs = () => {
    showAllSKUs().then((response) => {
      setSkuList(response.data);
    });
  };

  const setUserRole = () => {
    getUserRole().then((response) => {
      setRole(response.data);
    });
  };

  useEffect(() => {
    displayAllSKUs();
    setUserRole();
  }, []);

  const returnBack = () => {
    if (role === "Admin") navigate("/AdminMenu");
    else if (role === "Manager") navigate("/ManagerMenu");
  };

  const deleteSKU = (id) => {
    removeSKU(id).then((res) => {
      let remainSkus = skuList.filter((sku) => sku.skuId !== id);
      setSkuList(remainSkus);
    });
    navigate("/SkuRepo");
  };

  return (
    <div className="text-center">
      <div>
        <h2 className="text-center top-bar p-2">SKU List</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>SKU Id</th>
              <th>Description</th>
              {(role === "Admin" || role === "Manager") && <th>Update SKU</th>}
              {(role === "Admin" || role === "Manager") && <th>Delete SKU</th>}
            </tr>
          </thead>
          <tbody>
            {skuList.map((sku) => (
              <tr key={sku.skuId}>
                <td>{sku.skuId}</td>
                <td>{sku.skuDescription}</td>

                {(role === "Admin" || role === "Manager") && (
                  <td>
                    <Link to={`/update-sku/${sku.skuId}`}>
                      <button
                        style={{ marginLeft: "10px" }}
                        className="btn btn-info"
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                )}

                {(role === "Admin" || role === "Manager") && (
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteSKU(sku.skuId)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button
          style={{ width: "fit-content" }}
          onClick={() => returnBack()}
          className="btn btn-danger d-block mx-auto"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default SKUReport;
