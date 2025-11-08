import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://backend-1-e0l1.onrender.com/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Error fetching students:", err));
  }, []);

  const goToDetails = (id) => {
    navigate(`/${id}/studentdetails`);
  };

  return (
    <div className="d-flex flex-column bg-light p-3" 
         style={{ width: "250px", height: "100vh", borderRight: "1px solid #ddd" }}>
      
      <h4 className="mb-3">Students</h4>

      <ul className="list-group">
        {students.map(student => (
          <li
            key={student.id}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
            onClick={() => goToDetails(student.id)}
          >
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
