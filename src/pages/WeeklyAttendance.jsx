import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import "../css/WeeklyAttendance.css";
import { useState } from "react";

const initialUsers = [
	{
		id: 1,
		name: "Anjith Sinah",
		todaysAttendance: "present",
		attendance: {
			monday: "present",
			tuesday: "late",
			wednesday: "absent",
			thursday: "present",
			friday: "present",
		},
	},
	{
		id: 2,
		name: "John Doe",
		todaysAttendance: "present",
		attendance: {
			monday: "late",
			tuesday: "present",
			wednesday: "absent",
			thursday: "present",
			friday: "late",
		},
	},
	{
		id: 3,
		name: "Mary Will",
		todaysAttendance: "present",
		attendance: {
			monday: "present",
			tuesday: "present",
			wednesday: "present",
			thursday: "present",
			friday: "absent",
		},
	},
	{
		id: 4,
		name: "Bruce Wayne",
		todaysAttendance: "present",
		attendance: {
			monday: "present",
			tuesday: "present",
			wednesday: "late",
			thursday: "present",
			friday: "present",
		},
	},
	{
		id: 5,
		name: "Peter Parker",
		todaysAttendance: "present",
		attendance: {
			monday: "late",
			tuesday: "present",
			wednesday: "absent",
			thursday: "present",
			friday: "late",
		},
	},
	{
		id: 6,
		name: "Clark Kent",
		todaysAttendance: "present",
		attendance: {
			monday: "present",
			tuesday: "late",
			wednesday: "absent",
			thursday: "present",
			friday: "absent",
		},
	},
	{
		id: 7,
		name: "Bruce Banner",
		todaysAttendance: "present",
		attendance: {
			monday: "present",
			tuesday: "present",
			wednesday: "late",
			thursday: "present",
			friday: "present",
		},
	},
	{
		id: 8,
		name: "Penny Poipole",
		todaysAttendance: "present",
		attendance: {
			monday: "late",
			tuesday: "present",
			wednesday: "absent",
			thursday: "present",
			friday: "late",
		},
	},
	{
		id: 9,
		name: "Peter Pan",
		todaysAttendance: "present",
		attendance: {
			monday: "present",
			tuesday: "present",
			wednesday: "present",
			thursday: "present",
			friday: "present",
		},
	},
	{
		id: 10,
		name: "Tony Stark",
		todaysAttendance: "present",
		attendance: {
			monday: "late",
			tuesday: "present",
			wednesday: "absent",
			thursday: "present",
			friday: "late",
		},
	},
];

function WeeklyAttendance() {
	const isAdminLogin = true;

	const [users, setUsers] = useState(initialUsers);
	const [entriesToShow, setEntriesToShow] = useState(10);

	// pagination
	const [currentPage, setCurrentPage] = useState(1);

	// search students
	const [searchQuery, setSearchQuery] = useState("");

	function handleAttendanceChange(userId, newStatus) {
		setUsers((prevUser) => {
			return prevUser.map((user) => {
				if (user.id === userId) {
					return {
						...user,
						todaysAttendance: newStatus,
					};
				}
				return user;
			});
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
					<div className={`day ${user.attendance.monday}`}>Mon</div>
					<div className={`day ${user.attendance.tuesday}`}>Tue</div>
					<div className={`day ${user.attendance.wednesday}`}>Wed</div>
					<div className={`day ${user.attendance.thursday}`}>Thu</div>
					<div className={`day ${user.attendance.friday}`}>Fri</div>
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
		<div className="table-container shadow">
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

				<div
					className="labels"
					style={{ display: "flex", gap: "10px", alignItems: "center" }}
				></div>
			</div>
		</div>
	);
}

export default WeeklyAttendance;
