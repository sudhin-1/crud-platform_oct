import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Sidebar from "../components/Sidebar";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stuRes = await fetch(`https://backend-1-e0l1.onrender.com/students/${id}`);

        if (!stuRes.ok) {
          setStudent(null);
        } else {
          setStudent(await stuRes.json());
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!student)
    return <><div className="d-flex"><Sidebar/><h3 className="text-center mt-5">Select a Student to View Details</h3></div></>;

 
  const attendance = student.attendance || [];


  const absentDays = attendance.filter((a) => a.status === "absent");

  return (
    <>
    <div style={{ display: "flex" }}>
    
    <Sidebar/>
    <div className="container mt-4" style={{ marginLeft: "250px", flex: 1 }}>
        
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3">{student.name}</h2>
        <p className="text-muted">{student.email}</p>

        <Tabs defaultActiveKey="daily" id="student-tabs" className="mt-3">
          
          
          <Tab eventKey="daily" title="Daily Attendance">
            {attendance.length === 0 ? (
              <p className="text-center mt-3">No attendance data found.</p>
            ) : (
              <Card className="mt-3 p-3 shadow-sm">
                <Table striped bordered hover className="mt-2">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.date}</td>
                        <td
                          className={
                            entry.status === "present"
                              ? "text-success fw-bold"
                              : "text-danger fw-bold"
                          }
                        >
                          {entry.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </Tab>

          {/* ✅ Absent Days */}
          <Tab eventKey="absent" title="Absent Days">
            <Card className="mt-3 p-3 shadow-sm">
              <h5>Total Absent: {absentDays.length}</h5>

              <Table bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {absentDays.length === 0 ? (
                    <tr>
                      <td className="text-center">No absences 🎉</td>
                    </tr>
                  ) : (
                    absentDays.map((entry, i) => (
                      <tr key={i}>
                        <td>{entry.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card>
          </Tab>

        </Tabs>
      </Card>
    </div>
    </div>
    </>
  );
}
