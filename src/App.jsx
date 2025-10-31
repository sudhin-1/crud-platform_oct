import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WeeklyAttendance from "./pages/WeeklyAttendance";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";

function App() {
	const appContainerStyle = {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	};
	return (
		<>
			<div className="app-container" style={appContainerStyle}>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/sign" element={<SignIn />} />
					<Route path="/attendance" element={<WeeklyAttendance />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
