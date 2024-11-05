import React, { useState, useEffect } from 'react';
import { Modal, Typography, Box, Button, TextField, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ open, onClose, advancePriceProps, bookingInfo }) => {
    console.log(bookingInfo);
  const [loading, setLoading] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [reason, setReason] = useState('');
  const [governmentId, setGovernmentId] = useState(null);
  const [bookingAttachment, setBookingAttachment] = useState(null);
  const navigate = useNavigate();
 
  // Initialize user details from the first rental place in bookingInfo
  useEffect(() => {
    if (bookingInfo && bookingInfo.length > 0) {
      const userDetails = bookingInfo[0].bookingInfo.userDetaisl;
      if (userDetails) {
        setMobileNo(userDetails.phone_no || '');
      }
    }
  }, [bookingInfo]);

  const handlePayHold = async () => {
    setLoading(true);
    console.log(bookingInfo);
    try {
      const token = localStorage.getItem('token');
      
      // Prepare and submit FormData for each rental place
      const promises = bookingInfo.map(async (info) => {
        const formData = new FormData();
        formData.append('mobile_no', mobileNo);
        formData.append('reason', reason);
        formData.append('total_price', info.totalSum);
        formData.append('amount', 5000);
        formData.append('booking_start_date', info.start_date);
        formData.append('booking_end_date', info.end_date);
        formData.append('due_amount',  (info.totalSum-5000));
        formData.append('rental_place_id', info.rentalPlaceId);

       
        if (governmentId) {
            formData.append('images[]', governmentId); // Use "image[]" for government ID
        }

        return axios.post(
          'http://localhost:3000/api/pay-holdon-amount',
          formData,
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        );
      });

      // Wait for all hold payment requests to complete
      await Promise.all(promises);
      localStorage.removeItem('cartData');
      setTimeout(() => {
        setLoading(false);
        navigate('/booking');
      }, 1000);
    } catch (error) {
      console.error("Error making hold payment:", error);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="p-6 bg-white rounded-md shadow-lg"
        sx={{
          maxWidth: '80%',
          width: '80%',
          margin: 'auto',
          mt: '1%',
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Booking Information
        </Typography>

        {/* Display User Details (only the first rental place details) */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={bookingInfo.length > 0 ? bookingInfo[0].bookingInfo.userDetaisl?.name || '' : ''}
              fullWidth
              margin="normal"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={bookingInfo.length > 0 ? bookingInfo[0].bookingInfo.userDetaisl?.email || '' : ''}
              fullWidth
              margin="normal"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone No"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
        </Grid>

        {/* Reason for Booking */}
        <Grid item xs={12}>
          <TextField
            label="Reason for Booking"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            required
          />
        </Grid>

        {/* File Upload Fields */}
        <Box mt={2}>
          <Typography variant="body2" gutterBottom>Upload Government ID (required):</Typography>
          <input type="file" accept="image/*" onChange={(e) => setGovernmentId(e.target.files[0])} required />
          {/* <Typography variant="body2" gutterBottom style={{ marginTop: '1rem' }}>Upload Booking Attachment:</Typography>
          <input type="file" accept="image/*" onChange={(e) => setBookingAttachment(e.target.files[0])} /> */}
        </Box>

        {/* Conditional Message for Booked Dates */}
        {bookingInfo?.[0]?.bookingInfo?.bookedDates?.length > 0 && (
          <Box mt={2} sx={{ color: 'red' }}>
            {bookingInfo[0].bookingInfo.bookedDates.map((date) => (
              <Typography key={date.date}>
                On {date.date}, {date.count} booking(s) already done. You are number {date.count + 1} in the queue. 
                If previous bookings are canceled, your booking will be confirmed. Otherwise, we will refund your hold amount.
              </Typography>
            ))}
          </Box>
        )}

        {/* Close and Pay Button */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePayHold}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : `Pay Hold on Money (₹${advancePriceProps})`}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingModal;
