import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
import hidcoLogo from "../assets/hidco-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [useOtp, setUseOtp] = useState(false); // Toggle state for OTP login
  const [error, setError] = useState("");
  const { login, loginWithOtp, sendOtp } = useAuth(); // Ensure loginWithOtp and sendOtp are implemented in AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (useOtp) {
      // Handle Phone Number OTP login
      if (!phoneNumber) {
        setError("Please enter a valid phone number");
        return;
      }
      const success = await loginWithOtp(phoneNumber, otp); // Implement this in your AuthContext
      if (success) {
        toast.success("Logged in with OTP!", {
          onClose: () => navigate("/"),
        });
      } else {
        setError("Invalid OTP or phone number");
      }
    } else {
      // Handle Email/Password login
      const success = await login(email, password);
      if (success) {
        toast.success("Logged in!", {
          onClose: () => navigate("/"),
        });
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <>
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

          <Typography
            className="text-center"
            variant="h6"
            component="h1"
            gutterBottom
          >
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
                sx={{
                  backgroundColor: "#247d93",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                  color: "#fff",
                }}
                fullWidth
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
                  Login with Password
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
    </>
  );
};

export default Login;
