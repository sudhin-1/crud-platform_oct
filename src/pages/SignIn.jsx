import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

export default function SignIn() {
  const [value, setValue] = useState(0); // active tab
  const [isRegister, setIsRegister] = useState(false); // login/register toggle

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

        {/* ADMIN SECTION */}
        {value === 0 && (
          <Box className="mt-4">
            <h4 className="text-center mb-3">
              {isRegister ? "Admin Registration" : "Admin Login"}
            </h4>

            <TextField
              label="Admin ID"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            {isRegister && (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
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

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-3"
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

        {/* USER SECTION */}
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
            />

            {isRegister && (
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
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

            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-3"
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
