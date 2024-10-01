import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavbarWithMegaMenu } from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { Container, Typography, TextField, Button, Card, CardContent, Grid, Box, Divider } from '@mui/material';

const UserProfile = () => {
    const { user } = useAuth();
    const location = useLocation();
    const toastMessage = location.state?.toastMessage;

    useEffect(() => {
        if (toastMessage) {
            toast.success(toastMessage);
        }
    }, [toastMessage]);

    const [userDetails, setUserDetails] = useState({ name: '', mobile: '', email: '' });

    useEffect(() => {
        if (user && user.id) {
            fetchUserDetails();
        }
    }, [user]);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user-details', { user_id: user.id });
            setUserDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/update-user-details', {
                user_id: user.id,
                ...userDetails
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    return (
        <>
            <ToastContainer />
            <NavbarWithMegaMenu />
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    User Profile
                </Typography>

                <Card sx={{ mb: 6, borderRadius: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Profile Information
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={userDetails.full_name || ''}
                                    onChange={(e) => setUserDetails({ ...userDetails, full_name: e.target.value })}
                                    InputProps={{ sx: { borderRadius: 1, bgcolor: '#f5f5f5' } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Mobile"
                                    variant="outlined"
                                    fullWidth
                                    value={userDetails.mobile || ''}
                                    onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
                                    InputProps={{ sx: { borderRadius: 1, bgcolor: '#f5f5f5' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={userDetails.email || ''}
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    InputProps={{ sx: { borderRadius: 1, bgcolor: '#f5f5f5' } }}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                                sx={{ borderRadius: 2, textTransform: 'none' }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default UserProfile;
