import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const API_BASE = "http://localhost:8080"; // removed leading space

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/user/${id}`, user, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`${API_BASE}/user/${id}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to load user details.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                PolicyNumber
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Policy Number"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="claimStatus" className="form-label">
                ClaimStatus
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Claim Status"
                name="username"
                value={username}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="approverComments" className="form-label">
                ApproverComments
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your approverComments"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
