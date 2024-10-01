import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { NavbarWithMegaMenu } from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, Card, CardContent, Grid, Box, Button, Divider ,CardHeader} from '@mui/material';

const BookingsPage = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            fetchUserBookings();
        }
    }, [user]);

    const fetchUserBookings = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/user-bookings', { user_id: user.id });
            if (Array.isArray(response.data)) {
                setBookings(response.data);
                console.log(response.data);
            } else {
                console.error("Unexpected response format for user bookings:", response.data);
                setBookings([]);
            }
        } catch (error) {
            console.error("Error fetching user bookings:", error);
            setBookings([]);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                const response = await axios.delete('http://localhost:8000/api/cancel-booking', {
                    data: { booking_id: bookingId }
                });
                toast.success(response.data.message);
                fetchUserBookings(); // Refresh the bookings list
            } catch (error) {
                console.error("Error cancelling booking:", error);
            }
        }
    };

    const handlePayNow = (bookingId) => {
        // Handle payment logic here
        alert(`Proceeding to payment for booking ID: ${bookingId}`);
    };

    // Utility function to get ordinal suffix (e.g., 1st, 2nd, 3rd)
    const getOrdinalSuffix = (num) => {
        const suffix = ['th', 'st', 'nd', 'rd'],
            v = num % 100;
        return num + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
    };

    return (
        <>
            <ToastContainer />
            <NavbarWithMegaMenu />
            <Container maxWidth="md" sx={{ py: 8 }}>
                {/* Display the User ID */}
                {/* {user && user.user_id && (
                    <Typography variant="h5" component="h2" gutterBottom align="center">
                        User ID: {user.user_id}
                    </Typography>
                )} */}

                <Typography variant="h3" component="h1" gutterBottom align="center">
                    Your Bookings
                </Typography>

                {Array.isArray(bookings) && bookings.length > 0 ? (
                    <Grid container spacing={3}>
                        {bookings.map(booking => (
                            <Grid item xs={12} sm={6} md={4} key={booking.ba_id}>
                                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                    {/* Move Booking ID to the CardHeader */}
                                    <CardHeader
                                        title={`Booking ID: ${booking.id}`}
                                        titleTypographyProps={{ variant: 'h6', color: 'gray' }} // Styling the Booking ID
                                        sx={{ backgroundColor: '#f5f5f5' }} // Optional: Adds a light grey background to the header
                                    />
                                    <CardContent>
                                        <Divider sx={{ mb: 2 }} />
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Property:</strong> {booking.property}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Check-In:</strong> {booking.check_in_date}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Check-Out:</strong> {booking.check_out_date}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Total Days:</strong> {booking.no_of_days}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Total Price:</strong> Rs. {booking.total_price} /-
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Holdon Payment Status:</strong> {booking.payment_status}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Approval Status:</strong> {booking.status}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>Queue Position:</strong> {booking.status} 
                                        </Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                            {booking.status !== 'Cancelled' && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleCancelBooking(booking.ba_id)}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                            {booking.status === 'Accepted' && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handlePayNow(booking.ba_id)}
                                                >
                                                    Pay Now
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                        No bookings found.
                    </Typography>
                )}

            </Container>
        </>
    );
};

export default BookingsPage;
