import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import "../css/WeeklyAttendance.css";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const initialUsers = [
	
];

function WeeklyAttendance() {
	const navigate = useNavigate();

  const handleLogout = () => {
    const user = localStorage.getItem("admin");

    if (user) {
      // delete the key
      localStorage.removeItem("admin");
      console.log("Logged out");
      navigate("/sign");
    } else {
      // nothing to delete, so just go to signin
      navigate("/sign");
    }
  };
  if(!localStorage.getItem("admin")){
	navigate("/sign");
  }
	useEffect(() => {
		fetch("https://backend-1-e0l1.onrender.com/students")
		  .then((res) => res.json())
		  .then((data) => {
			setUsers(data);
		  })
		  .catch((err) => console.log("Error fetching users:", err));
	  }, []);
	  
	const isAdminLogin = true;

	const [users, setUsers] = useState([]);
	const [entriesToShow, setEntriesToShow] = useState(10);

	// pagination
	const [currentPage, setCurrentPage] = useState(1);

	// search students
	const [searchQuery, setSearchQuery] = useState("");
	function getLastWeekAttendance(attendance) {
		if (!attendance) return {};
	  
		const today = new Date();
		const weekAgo = new Date();
		weekAgo.setDate(today.getDate() - 7);
	  
		const lastWeekEntries = attendance.filter(a => {
		  const d = new Date(a.date);
		  return d >= weekAgo && d <= today;
		});
	  
		// Map day number → string key
		const dayMap = {
		  1: "monday",
		  2: "tuesday",
		  3: "wednesday",
		  4: "thursday",
		  5: "friday"
		};
	  
		// Create final object: { monday: "present", tuesday: "absent", ...}
		const result = {
		  monday: "",
		  tuesday: "",
		  wednesday: "",
		  thursday: "",
		  friday: ""
		};
	  
		lastWeekEntries.forEach(entry => {
		  const d = new Date(entry.date);
		  const day = d.getDay(); // 1 = Monday ... 5 = Friday
		  if (dayMap[day]) {
			result[dayMap[day]] = entry.status;
		  }
		});
	  
		return result;
	  }
	  
	  function handleAttendanceChange(userId, newStatus) {
		const today = new Date().toISOString().split("T")[0];
	  
		setUsers(prev =>
		  prev.map(user =>
			user.id === userId
			  ? { 
				  ...user,
				  attendance: [
					...user.attendance.filter(a => a.date !== today), 
					{ date: today, status: newStatus }
				  ]
				}
			  : user
		  )
		);
	  
		fetch(`https://backend-1-e0l1.onrender.com/students/${userId}`, {
		  method: "PATCH",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			attendance: [
			  ...users.find(u => u.id === userId).attendance.filter(a => a.date !== today),
			  { date: today, status: newStatus }
			]
		  })
		});
	  }
	  
	  

	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalUsers = filteredUsers.length;
	const totalPages = Math.ceil(totalUsers / entriesToShow);

	const startIndex = (currentPage - 1) * entriesToShow;
	const endIndex = startIndex + entriesToShow;

	const usersForCurrentPage = filteredUsers.slice(startIndex, endIndex);

	const userData = usersForCurrentPage.map((user, index) => (
		<tr key={index}>
			<td className="text-center">{user.name}</td>
			{isAdminLogin ? (
				<td className="text-center">
					<select
						name="attendance"
						className={`attendance-select ${user.todaysAttendance}`}
						data-id={user.id}
						value={user.todaysAttendance}
						onChange={(e) => handleAttendanceChange(user.id, e.target.value)}
					>
						<option className="present" value="present">
							Present
						</option>
						<option className="late" value="late">
							Late
						</option>
						<option className="absent" value="absent">
							Absent
						</option>
					</select>
				</td>
			) : null}
			<td className="text-center">
  <div className="day-pills">
    {(() => {
      const week = getLastWeekAttendance(user.attendance);
      return (
        <>
          <div className={`day ${week.monday}`}>Mon</div>
          <div className={`day ${week.tuesday}`}>Tue</div>
          <div className={`day ${week.wednesday}`}>Wed</div>
          <div className={`day ${week.thursday}`}>Thu</div>
          <div className={`day ${week.friday}`}>Fri</div>
        </>
      );
    })()}
  </div>
</td>

			<td className="text-center">
				<button className="btn-details">
					<FontAwesomeIcon icon={faCalendarDays} />
				</button>
			</td>
		</tr>
	));

	//  handlers for pagination and entries change
	const handleEntriesChange = (e) => {
		setEntriesToShow(Number(e.target.value));
		setCurrentPage(1);
	};

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	// search students
	function handleSearchQuery(e) {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	}

	return (
		<>
		<div className="d-flex gap-3" style={{margin:"10px"}}>
		<Link to="/0/studentdetails" className="btn btn-primary">
  View Student Details
</Link>
<Link to="/requests" className="btn btn-success">
  Requests
</Link>
</div>

		<div className="table-container shadow mt-5">
			<div className="entries-container">
				{/* select number of entries to show  */}
				<div className="entries">
					<label htmlFor="entries-number">Show</label>
					<select
						name="entries-number"
						value={entriesToShow}
						onChange={handleEntriesChange}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
					</select>
					<span>Entries</span>
				</div>
				{/* search entry  */}
				<div className="entries">
					<label htmlFor="search-entry">Search:</label>
					<input
						type="text"
						name="search-entry"
						value={searchQuery}
						onChange={handleSearchQuery}
					/>
				</div>
			</div>
			{/* Table  */}
			<div className="table-data">
				<Table bordered hover>
					<thead>
						<tr>
							<th className="text-center">Name</th>
							{isAdminLogin ? (
								<th className="text-center">Mark Attendance</th>
							) : null}
							<th className="text-center">Last Week Attendance</th>
							<th className="text-center">Details</th>
						</tr>
					</thead>
					<tbody>{userData}</tbody>
				</Table>
			</div>

			{/*  Add the pagination controls UI */}
			<div className="pagination-container">
				<span>
					Showing {totalUsers === 0 ? 0 : startIndex + 1} to{" "}
					{Math.min(endIndex, totalUsers)} of {totalUsers} entries
				</span>

				{totalPages > 1 && (
					<div className="pagination-controls">
						<button
							className="btn-pagination"
							onClick={goToPreviousPage}
							disabled={currentPage === 1}
						>
							&lt; Previous
						</button>

						<span style={{ margin: "0 1em" }}>
							Page {currentPage} of {totalPages}
						</span>

						<button
							className="btn-pagination"
							onClick={goToNextPage}
							disabled={currentPage === totalPages}
						>
							Next &gt;
						</button>
					</div>
				)}
			</div>

			{/* attendance label info  */}
			<div
				className="label-info"
				style={{ display: "flex", gap: "5em", justifyContent: "center" }}
			>
				<div
					className="labels"
					style={{ display: "flex", gap: "10px", alignItems: "center" }}
				>
					<div className="present" style={{ padding: "1em" }}></div>
					<span style={{ fontWeight: "600" }}>Present(1)</span>
				</div>
				<div
					className="labels"
					style={{ display: "flex", gap: "10px", alignItems: "center" }}
				>
					<div className="late" style={{ padding: "1em" }}></div>
					<span style={{ fontWeight: "600" }}>Late(2)</span>
				</div>
				<div
					className="labels"
					style={{ display: "flex", gap: "10px", alignItems: "center" }}
				>
					<div className="absent" style={{ padding: "1em" }}></div>
					<span style={{ fontWeight: "600" }}>Absent(3)</span>
				</div>
				<button 
      className="btn btn-danger" 
      onClick={handleLogout}
      style={{ margin: "10px" }}
    >
      Logout
    </button>
				<div
					className="labels"
					style={{ display: "flex", gap: "10px", alignItems: "center" }}
				></div>
			</div>
		</div>
		</>
	);
}

export default WeeklyAttendance;
