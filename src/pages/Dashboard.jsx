import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (!localUser || !localUser.id) {
      alert("No user found in localStorage");
      return;
    }

    async function fetchStudent() {
      try {
        const res = await axios.get(`http://localhost:3000/students/${localUser.id}`);
        setStudent(res.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching user details");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!student) {
    return <div className="text-center p-5">Student not found</div>;
  }

  return (
    <div className="container-fluid p-4" style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="avatar"
                className="img-fluid rounded-circle mb-3"
                width="120"
              />
              <h4 className="mb-1">{student.name}</h4>
              <p className="text-muted">@{student.email}</p>
            </div>
          </div><br/>
          <Link to={"/send"}>
          <div className="btn btn-primary w-100">Request</div>
          </Link>
        </div>


        <div className="col-md-9">
          <h2 className="mb-4">Student Dashboard</h2>


          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Profile Summary</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Password:</strong> {student.password}</p>
              <p><strong>Attendance Records:</strong> {student.attendance.length}</p>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Attendance</h5>
            </div>
            <div className="card-body">
              {student.attendance.length === 0 ? (
                <p className="text-muted">No attendance records yet.</p>
              ) : (
                <ul className="list-group">
                  {student.attendance.map((a, i) => (
                    <li key={i} className="list-group-item">
                      {a.date} — {a.status}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
