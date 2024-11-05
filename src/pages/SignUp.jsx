import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import * as EmailValidator from 'email-validator';
import hidcoLogo from '../assets/hidco-logo.png';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!name) {
            setError('Name is required');
            return;
        }
        if (!EmailValidator.validate(email)) {
            setError('Invalid email format');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        if (!phoneNo || phoneNo.length < 10) {
            setError('Mobile number must be at least 10 digits long');
            return;
        }

        // Prepare the registration data
        const data = {
            name,
            email,
            password,
            phone_no: phoneNo,
        };

        try {
            // Call the signup API with the required headers for JSON
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Signup successful:', result);
                navigate('/login'); // Redirect to home page after successful signup
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed');
            }
        } catch (error) {
            setError('Signup request failed');
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
                    padding: "1.5rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: '500px',
                }}
            >
                <center>
                    <img
                        src={hidcoLogo}
                        className="h-16 m-3 text-center"
                        alt="Hidco logo"
                    />
                </center>

                <Typography
                    className="text-center"
                    variant="h6"
                    component="h1"
                    gutterBottom
                >
                    Create Your Account
                </Typography>

                {error && <Typography color="error">{error}</Typography>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <TextField
                        label="Mobile Number"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        required
                    />

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
                            Sign Up
                        </Button>
                    </Box>
                </form>

                <Box mt={2} mb={2} textAlign="center">
                    <Typography variant="body2">
                        Already have an account?
                        <Link href="/login" underline="hover" sx={{ ml: 1 }}>
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
