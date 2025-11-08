import React, { useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function SignIn() {
const navigate = useNavigate();
  const [adminlog,setadminloggedin]=useState(false)

  const [loggedIn,setLog]=useState(0)

  const handleUserLogin = async () => {
    if (!userEmail || !userPassword) {
      alert("Enter email & password");
      return;
    }
  
    try {
      const res = await axios.get(
        `https://backend-1-e0l1.onrender.com/students?email=${userEmail}`
      );
  
      if (res.data.length === 0) {
        alert("Email not found");
        return;
      }
  
      const user = res.data[0];
  
      if (user.password === userPassword) {
        alert("Login successful!");
        setLog(1);
        localStorage.setItem("user", JSON.stringify({ id: user.id }));
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };
  
useEffect(() => {
  if (loggedIn) navigate("/dashboard");
}, [loggedIn,navigate]);
useEffect(()=>{
  if(adminlog==true){
    navigate("/attendance")
  }
},[adminlog,navigate])
  const [value, setValue] = useState(0); // active tab
  const [isRegister, setIsRegister] = useState(false); // login/register toggle


  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loginfo, logadmininfo] = useState("");
  const [logpass, logadminpass] = useState("");
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logadmin=()=>{
    if(loginfo=="admin" && logpass=="password"){
      localStorage.setItem("admin","admin")
      setadminloggedin(true)
    }
  }
  const handleUserRegister = async () => {
    if (userPassword !== userConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("https://backend-1-e0l1.onrender.com/students", {
        email: userEmail,
        name: userName,
        password: userPassword,
        attendance: []
      });

      alert("User Registered");


      setUserEmail("");
      setUserName("");
      setUserPassword("");
      setUserConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="vh-100 row container-fluid d-flex justify-content-center align-items-center">
      <Paper elevation={5} className="p-4 rounded-4" style={{ width: 450 }}>

        {/* Tabs for Admin / User */}
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Admin" />
            <Tab label="User" />
          </Tabs>
        </Box>

        {/* ---------------------- ADMIN SECTION ---------------------- */}
        {value === 0 && (
          <Box className="mt-4">
            <h4 className="text-center mb-3">
              {isRegister ? "Admin Registration" : "Admin Login"}
            </h4>

            <TextField label="Admin ID" variant="outlined" fullWidth margin="normal" onChange={(event)=>logadmininfo(event.target.value)}/>

            {isRegister && (
              <TextField label="Email" variant="outlined" fullWidth margin="normal" />
            )}

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal" onChange={(event)=>logadminpass(event.target.value)}
            />

            {isRegister && (
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}

            <Button variant="contained" color="primary" fullWidth className="mt-3" onClick={!isRegister?()=>logadmin():()=>{console.log("No Register")}}>
              {isRegister ? "Register" : "Login"}
            </Button>

            <Box className="text-center mt-3">
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister
                  ? "Already registered? Login here"
                  : "Not registered? Create an account"}
              </Link>
            </Box>
          </Box>
        )}

        {/* ---------------------- USER SECTION ---------------------- */}
        {value === 1 && (
          <Box className="mt-4">
            <h4 className="text-center mb-3">
              {isRegister ? "User Registration" : "User Login"}
            </h4>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            {isRegister && (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            {isRegister && (
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userConfirmPassword}
                onChange={(e) => setUserConfirmPassword(e.target.value)}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-3"
              onClick={() => {
                if (isRegister) {
                  handleUserRegister();
                } else {
                  handleUserLogin();
                }
              }}              
            >
              {isRegister ? "Register" : "Login"}
            </Button>

            <Box className="text-center mt-3">
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister
                  ? "Already registered? Login here"
                  : "Not registered? Create an account"}
              </Link>
            </Box>
          </Box>
        )}

      </Paper>
    </div>
  );
}
