import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  const API_BASE = " http://localhost:8080"; // ✅ Same base URL as Home.js & EditUser.js

    // ✅ Static data (mock claim record)
  const staticData = {
    id: "1",
    email: "itflex81@gmail.com",
    status: "status 1",
    totalClaims: 5,
    isExpired: false,
    policyHolderName: "Pasupuleti Eswar Vamsi Krishna",
    policyNumber: "POL123456789",
    policyStartDate: "2022-08-10",
    policyEndDate: "2025-08-28",
    firNumber: "FIR2025-HYD-00982",
    firDate: "29-Jul-2025",
    fireStationName: "Hyderabad Central Station",
    invoiceNumber: "INV123456",
    invoiceDate: "30-Jul-2025",
    invoiceAmount: "75,000",
    claimAmount: "75,000",
    itemDescription: "Samsung 4K Smart TV (55 inch)"
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`${API_BASE}/user/${id}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user details:", error);
      alert("Failed to load user details.");
    }
  };

  return (
    <div className="container">
    <div className="container mt-5">
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <h4 className="card-title border-bottom pb-2">
            Policy Claim Benefit Details
          </h4>

          <div className="row g-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>PolicyNumber:</b> {user.name}
              </li>
              <li className="list-group-item">
                <b>ClaimStatus:</b> {user.username}
              </li>
              <li className="list-group-item">
                <b>ApproverComments:</b> {user.email}
              </li>
            </ul>
            <div className="col-md-6"><strong>Policy Holder:</strong> Pasupuleti Eswar Vamsi Krishna</div>
            <div className="col-md-6"><strong>FIR Number:</strong> FIR2025-HYD-00982</div>
            <div className="col-md-6"><strong>Email:</strong> itflex81@gmail.com</div>
            <div className="col-md-6"><strong>FIR Date:</strong> 29-Jul-2025</div>
            <div className="col-md-6"><strong>Policy Number:</strong> POL123456789</div>
             <div className="col-md-6"><strong>Fire Station:</strong> Hyderabad Central Station</div>
            <div className="col-md-6"><strong>Policy Start Date:</strong> 2022-08-10</div>
            <div className="col-md-6"><strong>Invoice Number:</strong> INV123456</div>
           
            <div className="col-md-6"><strong>Policy End Date:</strong> 2025-08-28</div>
             <div className="col-md-6"><strong>Invoice Date:</strong> 30-Jul-2025</div>
            <div className="col-md-6"><strong>Status:</strong> status 1</div>
             <div className="col-md-6"><strong>Invoice Amount:</strong> ₹75,000</div>
            <div className="col-md-6"><strong>Total Claims:</strong> 5</div>
            <div className="col-md-6"><strong>Expired:</strong> No</div>
            
            
           
            
            
           
            <div className="col-md-6"><strong>Claim Amount:</strong> ₹75,000</div>
            <div className="col-md-12"><strong>Item Description:</strong> Samsung 4K Smart TV (55 inch)</div>
          </div>

          <div className="d-flex justify-content-between mt-4 border-top pt-3">
            <div>
              <button className="btn btn-outline-secondary me-2">Previous</button>
              <button className="btn btn-outline-secondary">Next</button>
              <button className="btn btn-secondary ms-2">Close</button>
            </div>
            <div>
              <button className="btn btn-danger me-2">Decline</button>
              <button className="btn btn-warning me-2">View Accounting</button>
              <button className="btn btn-primary me-2">Open</button>
              <button className="btn btn-success">Select</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2">Payment Details</h5>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Payee Name</th>
                <th>Payment Date</th>
                <th>Total Amount</th>
                <th>Authorized</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pasupuleti Eswar Vamsi Krishna</td>
                <td>01-Aug-2025</td>
                <td>₹75,000</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-secondary">Previous</button>
            <button className="btn btn-outline-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>



      <div className="row">
        <div className="col-md-12 offset-md-o border rounded p-4 mt-2 shadow">
          <b></b>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
