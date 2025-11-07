import React, { useState } from "react";

export default function SendLeaveRequest() {
  const userData = localStorage.getItem("user");   // {"id":"jsdjf"}
  const parsedUser = userData ? JSON.parse(userData) : null;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [date,setDate]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!parsedUser || !parsedUser.id) {
      setMsg("No logged-in user found in localStorage.");
      return;
    }

    const newReq = {
      studentid: parsedUser.id,
      message: message,
      seen: 0,
      allow: "allowed",
      allowed: "pending",
      date:date
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/req", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReq),
      });

      if (!res.ok) throw new Error("Failed to send request");

      setMsg("✅ Request sent!");
      setMessage("");

    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Send Leave Request</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          Select Date<br/>
        <input
    type="date"
    value={date}
    onChange={(event) => setDate(event.target.value)}
    className="form-control"
  />
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter leave reason"
            required
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Request"}
        </button>

      </form>

      {msg && <p className="mt-3">{msg}</p>}
      <div style={{height:"100px"}}></div>
    </div>
    
  );
}
