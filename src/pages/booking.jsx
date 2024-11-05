import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Card, CardContent, Box } from '@mui/material';
import { NavbarWithMegaMenu } from '../components/Navbar';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        verifyUserAuthentication();
    }, []);

    const verifyUserAuthentication = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No token found. Please log in.");
                return;
            }

            const response = await axios.get('http://localhost:3000/api/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data && response.data.user) {
                setIsAuthenticated(true);
                fetchUserBookings(response.data.user.id);
            } else {
                toast.error("User not authenticated.");
            }
        } catch (error) {
            console.error("Error verifying authentication:", error);
            toast.error("Authentication failed. Please log in.");
        }
    };

    const fetchUserBookings = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:3000/api/viewUserBookings', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { user_id: userId }
            });

            if (response.data && Array.isArray(response.data.bookings)) {
                setBookings(response.data.bookings);
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
                const token = localStorage.getItem("token");
                const response = await axios.delete('http://localhost:3000/api/cancel-booking', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: { booking_id: bookingId }
                });
                toast.success(response.data.message);
                fetchUserBookings();
            } catch (error) {
                console.error("Error cancelling booking:", error);
            }
        }
    };

    const handlePayNow = (bookingId) => {
        alert(`Proceeding to payment for booking ID: ${bookingId}`);
    };

    return (
        <>
            <ToastContainer />
            <NavbarWithMegaMenu />
            <Container maxWidth="md" sx={{ py: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Your Bookings
                </Typography>

                {isAuthenticated && bookings.length > 0 ? (
                    <List>
                        {bookings.map(booking => (
                            <ListItem key={booking.id} sx={{ padding: 0, marginBottom: 2 }}>
                                <Card 
                                    variant="outlined" 
                                    sx={{ 
                                        width: '100%', 
                                        boxShadow: 3, // Add box shadow
                                        borderRadius: 2, // Rounded corners
                                        padding: 2, // Padding inside the card
                                        transition: '0.3s', // Transition effect
                                        '&:hover': { // Hover effect
                                            boxShadow: 6 
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <ListItemText
                                            primary={`Booking ID: ${booking.booking_id}`}
                                            secondary={
                                                <>
                                                    <Typography component="span"><strong>Property:</strong> {booking.rentalPlace.rental_place_name} ({booking.rentalPlace.property.rental_property_name})</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Date:</strong> {booking.booking_start_date} To {booking.booking_end_date}</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Total Price:</strong> Rs. {booking.total_price} /-</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Booking Status:</strong> {booking.booking_status}</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Payment Status:</strong> {booking.payment_status}</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Phone:</strong> {booking.user.phone_no}</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Amount Paid:</strong> Rs. {booking.amount}</Typography>
                                                    <br />
                                                    <Typography component="span"><strong>Due Amount:</strong> Rs. {booking.due_amount}</Typography>
                                                </>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            {!booking.is_cancelled && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                            {booking.booking_status === 'Accepted' && (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handlePayNow(booking.id)}
                                                >
                                                    Pay Now
                                                </Button>
                                            )}
                                        </ListItemSecondaryAction>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                        {isAuthenticated ? "No bookings found." : "Please log in to view your bookings."}
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default BookingsPage;
