import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = " https://13d3953a3225.ngrok-free.app";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${API_BASE}/users`, {
        headers: { "ngrok-skip-browser-warning": "true" }, // ✅ Fix ngrok warning
      });

      const data = result.data;
      console.log("API response:", data);
      console.log("Is array?", Array.isArray(data));

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.content && Array.isArray(data.content)) {
        setUsers(data.content); // ✅ For Spring Boot pageable response
      } else {
        console.error("Unexpected response format:", data);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_BASE}/user/${id}`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      loadUsers(); // refresh list after delete
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Delete failed. Check console for details.");
    }
  };

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;
  if (error) return <h4 className="text-danger text-center">{error}</h4>;

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Acc_Num</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id || index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/viewuser/${user.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/edituser/${user.id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
