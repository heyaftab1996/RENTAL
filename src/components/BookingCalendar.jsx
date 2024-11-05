import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import dayjs from 'dayjs';
import "../css/Calendar.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

const BookingCalendar = ({ rentalPlaceId, showCalendar, onCancel ,rentalPlaceName,RentalPlaceImage,RentalSeatCount}) => {
  const { user } = useAuth();
  const [bookedDates, setBookedDates] = useState([]); // Store booked dates
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]); // Start and End date
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGoToCart, setShowGoToCart] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/availability/${rentalPlaceId}`);
        
        if (response.data && response.data.bookedDates) {
          const bookedDatesFromApi = response.data.bookedDates.map(dateEntry => ({
            date: dayjs(dateEntry.date).toDate(),
            isConfirmed: dateEntry.isConfirmed
          }));
          setBookedDates(bookedDatesFromApi);
        } else {
          setBookedDates([]); // No bookings found
        }
      } catch (err) {
        setError('Failed to fetch availability');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [rentalPlaceId]);

  const isBooked = (date) => {
    return bookedDates.some(
      (booking) => dayjs(date).isBetween(booking.start, booking.end, 'day', '[]')
    );
  };

  const handleDateChange = (range) => {
    const [start, end] = range;

    // Ensure both start and end are not booked
    if (!isBooked(start) && (!end || !isBooked(end))) {
      setSelectedDateRange(range);
    } else {
      alert('One of the selected dates is already booked.');
    }
  };

  const handleCancelSelection = () => {
    setSelectedDateRange([null, null]);
    onCancel(); // Call the parent function to close the calendar
  };

  const handleAddToCart = async () => {
    const isAuthenticated = await isUserAuthenticated();
    if (!isAuthenticated) {
        navigate('/login');
        return;
    }

    if (selectedDateRange[0] && selectedDateRange[1]) {
        const bookingData = {
            rentalPlaceId: rentalPlaceId,
            rentalPlaceName: rentalPlaceName,
            RentalPlaceImage: RentalPlaceImage,
            startDate: dayjs(selectedDateRange[0]).format('YYYY-MM-DD'),
            endDate: dayjs(selectedDateRange[1]).format('YYYY-MM-DD'),
        };

        // Check if there's existing booking data in localStorage
        const storedData = localStorage.getItem('cartItems');
        let bookings = [];

        if (storedData) {
            // Parse existing data and ensure it's an array
            bookings = JSON.parse(storedData);
            if (!Array.isArray(bookings)) {
                bookings = []; // Reset to empty array if not valid
            }
        }

        // Add the new booking data to the existing bookings
        bookings.push(bookingData);

        // Save the updated bookings array back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(bookings));

        // Set the state to show "Go to Cart" button
        setShowGoToCart(true);
    } else {
        alert('Please select a valid date range.');
    }
};
  const handleGoToCart = () => {
    navigate('/cart'); // Navigate to cart page
  };
  const isUserAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const response = await axios.get('http://localhost:3000/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return response.data ? true : false;
    } catch (error) {
      console.error('User not authenticated:', error);
      return false;
    }
  };

  // Customize the tile class based on availability and date restrictions
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const bookedDateEntry = bookedDates.find(booking => dayjs(date).isSame(booking.date, 'day'));

      if (bookedDateEntry) {
        return bookedDateEntry.isConfirmed ? 'confirmed-date' : 'unconfirmed-date'; // Mark as red or yellow based on confirmation status
      }

      if (dayjs(date).isBefore(dayjs(), 'day')) {
        return 'disabled-date'; // Custom class for past dates
      }

      if (dayjs(date).isSame(dayjs(), 'day')) {
        return 'current-date'; // Custom class for current date
      }
    }
    return null;
  };

  // Show loading or error messages
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="booking-calendar">
      {showCalendar && (
        <>
          <div className="calendar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button onClick={handleCancelSelection} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleAddToCart} className="add-to-cart-button" style={{ marginLeft: '10px' }} disabled={!selectedDateRange[1]}>
              Add to Cart
            </button>
            {showGoToCart && (
            <button onClick={handleGoToCart} className="go-to-cart-button">
              Go to Cart
            </button>
          )}
          </div>
          <Calendar
            selectRange={true} // Enable date range selection
            onChange={handleDateChange}
            tileClassName={tileClassName} // Apply class to booked and current dates
            value={selectedDateRange}
            minDate={new Date()} // Prevent selection of past dates
          />
          {selectedDateRange[0] && (
            <div className="calendar-footer">
              <p>Selected Start Date: {dayjs(selectedDateRange[0]).format('YYYY-MM-DD')}</p>
              {selectedDateRange[1] && (
                <p>Selected End Date: {dayjs(selectedDateRange[1]).format('YYYY-MM-DD')}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingCalendar;
