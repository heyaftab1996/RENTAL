// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { Button, TextField, Container, Typography, Box } from '@mui/material';
// import * as EmailValidator from 'email-validator';
// import { NavbarWithMegaMenu } from '../components/Navbar';

// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { signup } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!EmailValidator.validate(email)) {
//             setError('Invalid email format');
//             return;
//         }
//         if (password.length < 6) {
//             setError('Password must be at least 6 characters long');
//             return;
//         }
//         const success = await signup(email, password);
//         if (success) {
//             navigate('/');
//         } else {
//             setError('Signup failed');
//         }
//     };

//     return (
//         <>
//         <NavbarWithMegaMenu />
        
//         <Container maxWidth="sm" className='pt-6'>
//             <Typography className='text-center' variant="h4" component="h1" gutterBottom>
//                 Sign Up
//             </Typography>
//             {error && <Typography color="error">{error}</Typography>}
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Email"
//                     type="email"
//                     fullWidth
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <Box mt={2}>
//                     <Button type="submit" variant="contained" color="primary" fullWidth>
//                         Sign Up
//                     </Button>
//                 </Box>
//             </form>
//         </Container>
//         </>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Button, TextField, Container, Typography, Box, Link } from '@mui/material';
import * as EmailValidator from 'email-validator'; // Import email validator
import hidcoLogo from '../assets/hidco-logo.png';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth(); // Destructure the signup function from useAuth
    const navigate = useNavigate(); // Create a navigate function using useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!EmailValidator.validate(email)) {
            setError('Invalid email format');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        const success = await signup(email, password);
        if (success) {
            navigate('/'); // Redirect to home page after successful signup
        } else {
            setError('Signup failed');
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
                    width: '500px', // Adjusted width to make the box smaller
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
                
                <form onSubmit={handleSubmit}> {/* Form submission logic added here */}
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

