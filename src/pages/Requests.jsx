import React, { useEffect, useState } from "react";

export default function Requests() {
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDate] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://localhost:3000/req?_sort=id&_order=desc");
        const reqData = await res.json();

        const updated = await Promise.all(
          reqData.map(async (item) => {
            const stuRes = await fetch(`http://localhost:3000/students/${item.studentid}`);
            const student = await stuRes.json();
            return { ...item, student };
          })
        );

        setReqs(updated);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function updateAllowed(id, newValue,stud,date) {
    try {
      // ✅ 1. Update the request
      await fetch(`http://localhost:3000/req/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allowed: newValue }),
      });
  
      // Update UI immediately
      setReqs((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, allowed: newValue } : item
        )
      );
  
      // ✅ Validate required values
  
      const studentId = stud;
      const excusedDate = date;
  
      // ✅ 2. Fetch student data
      const res = await fetch(`http://localhost:3000/students/${studentId}`);
      const student = await res.json();
  
      if (!student) {
        console.error("Student not found:", studentId);
        return;
      }
  
      // ✅ 3. Build new attendance array
      const updatedAttendance = [
        ...student.attendance,
        {
          date: excusedDate,
          status: "excused",
        },
      ];
  
      // ✅ 4. Update student with new attendance
      await fetch(`http://localhost:3000/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance: updatedAttendance }),
      });
  
    } catch (err) {
      console.error("Error updating allowed or attendance:", err);
    }
  }
  
  
  

  if (loading) return <p>Loading...</p>;


  const pending = reqs.filter((r) => r.allowed === "pending" || !r.allowed);
  const approved = reqs.filter((r) => r.allowed === "allowed");
  const rejected = reqs.filter((r) => r.allowed === "rejected");


  const RequestItem = ({ item }) => (
    <li className="list-group-item">
      <strong>Student ID:</strong> {item.studentid} <br />
      <strong>Student Name:</strong> {item.student?.name || "Unknown"} <br />
      <strong>Message:</strong> {item.message} <br />

      <strong>Status:</strong>{" "}
      <span
        className={
          item.allowed === "allowed"
            ? "text-success"
            : item.allowed === "rejected"
            ? "text-danger"
            : "text-warning"
        }
      >
        {item.allowed || "pending"}
      </span>
      <br />

      {item.allowed === "pending" || !item.allowed ? (
        <div className="mt-2">
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => {updateAllowed(item.id, "allowed",item.studentid,item.date);}}
          >
            Grant Leave
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => updateAllowed(item.id, "rejected",item.studentid)}
          >
            Reject
          </button>
        </div>
      ) : null}
    </li>
  );

  return (
    <div className="container mt-4">
      <h3>Requests</h3>

      {/* ✅ Bootstrap Tabs */}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" type="button" role="tab">
            Pending ({pending.length})
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button className="nav-link" id="approved-tab" data-bs-toggle="tab" data-bs-target="#approved" type="button" role="tab">
            Granted ({approved.length})
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button className="nav-link" id="rejected-tab" data-bs-toggle="tab" data-bs-target="#rejected" type="button" role="tab">
            Reject ({rejected.length})
          </button>
        </li>
      </ul>

      {/* ✅ Tab Content */}
      <div className="tab-content mt-3" id="myTabContent">
        
        {/* Pending */}
        <div className="tab-pane fade show active" id="pending" role="tabpanel">
          <ul className="list-group">
            {pending.map((item) => (
              <RequestItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        {/* Approved */}
        <div className="tab-pane fade" id="approved" role="tabpanel">
          <ul className="list-group">
            {approved.map((item) => (
              <RequestItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        {/* Rejected */}
        <div className="tab-pane fade" id="rejected" role="tabpanel">
          <ul className="list-group">
            {rejected.map((item) => (
              <RequestItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

      </div>
      <div style={{height:"100px"}}></div>
    </div>
  );
}
