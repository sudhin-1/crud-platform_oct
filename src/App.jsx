import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WeeklyAttendance from "./pages/WeeklyAttendance";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import StudentDetails from "./pages/StudentDetails";
import Requests from "./pages/Requests";
import SendLeaveRequest from "./pages/ReqLeave";

function App() {
	const appContainerStyle = {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	};
	const islogged=localStorage.getItem("user")
	return (
		<>
			<div className="app-container" style={appContainerStyle}>
				<Header islogged={islogged}/>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/sign" element={<SignIn />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/attendance" element={<WeeklyAttendance />} />
					<Route path="/showall" element={<Attendance />} />
					<Route path="/requests" element={<Requests/>} />
					<Route path="/send" element={<SendLeaveRequest/>} />
					<Route path="/:id/studentdetails" element={<StudentDetails />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
