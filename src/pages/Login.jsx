import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import hidcoLogo from "../assets/hidco-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (useOtp) {
        // Handle OTP login
        response = await axios.post("http://localhost:3000/api/login-otp", {
          phone_no: phoneNumber,
          otp,
        });
      } else {
        // Handle email/password login
        response = await axios.post("http://localhost:3000/api/login", {
          email,
          password,
        });
      }

      if (response.data.success) {
        const token = response.data.token; // Extract the JWT token
        localStorage.setItem("token", token); // Store the token in localStorage
        toast.success("Logged in!");
        navigate("/")
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError(useOtp ? "OTP login failed" : "Email/Password login failed");
    }
  };

  return (
    <Container
      className="pt-6"
      style={{
        backgroundColor: "#eef8fb",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <center>
          <img
            src={hidcoLogo}
            className="h-20 m-3 text-center"
            alt="Hidco logo"
          />
        </center>

        <Typography variant="h6" component="h1" gutterBottom textAlign="center">
          {useOtp ? "Login with Phone Number and OTP" : "Login with Your Account"}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          {useOtp ? (
            <>
              <TextField
                label="Phone Number"
                type="tel"
                fullWidth
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <TextField
                label="OTP"
                type="text"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#247d93",
                "&:hover": {
                  backgroundColor: "#333333",
                },
                color: "#fff",
              }}
            >
              {useOtp ? "Login with OTP" : "Login"}
            </Button>
          </Box>
        </form>
        <Box mt={2} mb={2} textAlign="center">
          <Typography variant="body2">
            <Link href="/forgot-password" underline="hover">
              Forgot Password?
            </Link>
          </Typography>
          <Typography variant="body2">
            Don't have an account?
            <Link href="/sign-up" underline="hover" sx={{ ml: 1 }}>
              Sign Up
            </Link>
          </Typography>
          <Typography variant="body2">
            {useOtp ? (
              <Link
                component="button"
                underline="hover"
                onClick={() => setUseOtp(false)}
              >
                Login with Passwords
              </Link>
            ) : (
              <Link
                component="button"
                underline="hover"
                onClick={() => setUseOtp(true)}
              >
                Login with OTP
              </Link>
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
