import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";

function App() {
	return (
		<>
      <Header />
			<Routes>
			  <Route path="/" element={<Landing/>} />	
        <Route path="/sign" element={<SignIn/>} />			
			</Routes>
      <Footer />
		</>
	);
}

export default App;
