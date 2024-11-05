import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavbarWithMegaMenu } from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { Container, Typography, TextField, Button, Card, FormControlLabel,CardContent, Checkbox,Grid, Box, Divider, Tabs, Tab, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const UserProfile = () => {
    const location = useLocation();
    const toastMessage = location.state?.toastMessage;
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [tabValue, setTabValue] = useState(0); // For managing active tab

    // Initialize userDetails state
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone_no: '',
        email: '',
        gender: '',
        present_address1: '',
        present_address2: '',
        present_pin: '',
        present_state: '',
        present_city: '',
        permanent_address1: '',
        permanent_address2: '',
        permanent_pin: '',
        permanent_state: '',
        permanent_city: '',
    });

    const [passwordDetails, setPasswordDetails] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    useEffect(() => {
        if (toastMessage) {
            toast.success(toastMessage);
        }
    }, [toastMessage]);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            fetchUserDetails(token); // Fetch details if token exists
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/api/user-details', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserDetails(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to fetch user details.");
        }
    };

    const handleUpdatePersonalDetails = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/updateProfile',
                { 
                  name: userDetails.name, 
                  phone_no: userDetails.phone_no, 
                  email: userDetails.email, 
                  gender: userDetails.gender 
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating user details:", error);
            toast.error("Failed to update user details.");
        }
    };

    const handleUpdateAddressDetails = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/updateProfile',
                {
                    present_address1: userDetails.present_address1,
                    present_address2: userDetails.present_address2,
                    present_city: userDetails.present_city,
                    present_state: userDetails.present_state,
                    present_pin: userDetails.present_pin,
                    permanent_address1: userDetails.permanent_address1,
                    permanent_address2: userDetails.permanent_address2,
                    permanent_city: userDetails.permanent_city,
                    permanent_state: userDetails.permanent_state,
                    permanent_pin: userDetails.permanent_pin,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating address details:", error);
            toast.error("Failed to update address details.");
        }
    };

    const handleChangePassword = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("User not authenticated. Please log in.");
            return;
        }
    
        if (passwordDetails.new_password !== passwordDetails.confirm_password) {
            toast.error("New password and confirm password do not match.");
            return;
        }
    
        try {
            const response = await axios.post(
                'http://localhost:3000/api/change-password',
                { 
                    old_password: passwordDetails.old_password, 
                    new_password: passwordDetails.new_password 
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
    
            toast.success(response.data.message);
        } catch (error) {
            // Check if error response is available and has a message
            if (error.response && error.response.data) {
                toast.error(error.response.data.error);
            } else {
                console.error("Error changing password:", error);
                toast.error("Failed to change password.");
            }
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSameAddressChange = (event) => {
        setIsSameAddress(event.target.checked); // Toggle the checkbox state
        if (event.target.checked) {
            setUserDetails({
                ...userDetails,
                permanent_address1: userDetails.present_address1,
                permanent_address2: userDetails.present_address2,
                permanent_city: userDetails.present_city,
                permanent_state: userDetails.present_state,
                permanent_pin: userDetails.present_pin,
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <NavbarWithMegaMenu />
            <Container maxWidth="md" sx={{ py: 0 }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Personal Details" />
                    <Tab label="Address Details" />
                    <Tab label="Change Password" />
                </Tabs>

                {tabValue === 0 && (
                    <Card sx={{ mb: 6, mt: 4, borderRadius: 3, boxShadow: 4 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Personal Details
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.name || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="phone_no"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.phone_no || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, phone_no: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.email || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                        InputProps={{ 
                                            sx: { borderRadius: 2, bgcolor: '#f0f0f0' },
                                            readOnly: true  // Make email read-only
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            value={userDetails.gender || ''}
                                            onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
                                            label="Gender"
                                            sx={{ borderRadius: 2, bgcolor: '#f0f0f0' }}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Others">Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdatePersonalDetails}
                                    sx={{ borderRadius: 3, textTransform: 'none', paddingX: 3 }}
                                >
                                    Update Profile
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {tabValue === 1 && (
                    <Card sx={{ mb: 6, mt: 4, borderRadius: 3, boxShadow: 4 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Address Details
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Present Address</Typography>
                                </Grid>
                                {/* Present Address Fields */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Address Line 1"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.present_address1 || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, present_address1: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Address Line 2"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.present_address2 || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, present_address2: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.present_city || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, present_city: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="State"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.present_state || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, present_state: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="PIN Code"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.present_pin || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, present_pin: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isSameAddress}
                                                onChange={handleSameAddressChange}
                                                color="primary"
                                            />
                                        }
                                        label="Permanent Address same as Present Address"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Permanent Address</Typography>
                                </Grid>
                                {/* Permanent Address Fields */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Address Line 1"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.permanent_address1 || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, permanent_address1: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Address Line 2"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.permanent_address2 || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, permanent_address2: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.permanent_city || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, permanent_city: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="State"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.permanent_state || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, permanent_state: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="PIN Code"
                                        variant="outlined"
                                        fullWidth
                                        value={userDetails.permanent_pin || ''}
                                        onChange={(e) => setUserDetails({ ...userDetails, permanent_pin: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateAddressDetails}
                                    sx={{ borderRadius: 3, textTransform: 'none', paddingX: 3 }}
                                >
                                    Update Profile
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}

                {tabValue === 2 && (
                    <Card sx={{ mb: 6, mt: 4, borderRadius: 3, boxShadow: 4 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Change Password
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Old Password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        value={passwordDetails.old_password}
                                        onChange={(e) => setPasswordDetails({ ...passwordDetails, old_password: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="New Password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        value={passwordDetails.new_password}
                                        onChange={(e) => setPasswordDetails({ ...passwordDetails, new_password: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirm Password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                        value={passwordDetails.confirm_password}
                                        onChange={(e) => setPasswordDetails({ ...passwordDetails, confirm_password: e.target.value })}
                                        InputProps={{ sx: { borderRadius: 2, bgcolor: '#f0f0f0' } }}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleChangePassword}
                                    sx={{ borderRadius: 3, textTransform: 'none', paddingX: 3 }}
                                >
                                    Change Password
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default UserProfile;
