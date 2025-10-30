import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WeeklyAttendance from "./pages/WeeklyAttendance";

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
				<WeeklyAttendance />
				<Footer />
			</div>
		</>
	);
}

export default App;
