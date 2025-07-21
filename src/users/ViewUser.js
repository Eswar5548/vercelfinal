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

  const API_BASE = " https://1585802952ec.ngrok-free.app"; // ✅ Same base URL as Home.js & EditUser.js

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
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Acc_Num:</b> {user.name}
              </li>
              <li className="list-group-item">
                <b>Address:</b> {user.username}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {user.email}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
