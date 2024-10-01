import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DatePickerStyles.css';

export default function DateTimePicker({ propertySelected, onStartDateChange }) {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch unavailable dates with booking counts from the local API
  useEffect(() => {
    if (propertySelected) {
      fetch('http://localhost:8000/api/get-unavailable-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ property: propertySelected }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Fetched unavailable dates:', data);
          setUnavailableDates(data);
        })
        .catch(error => console.error('Error fetching unavailable dates:', error));
    }
  }, [propertySelected]);

  // Close calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setCalendarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to add a class based on the number of bookings for that date
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const foundDate = unavailableDates.find(d => d.date === formattedDate);

      if (foundDate) {
        if (foundDate.bookings >= 4) {
          return 'unavailable-date-red';  // More than 3 bookings: red
        } else if (foundDate.bookings < 4 && foundDate.bookings > 0) {
          return 'unavailable-date-yellow';  // Less than 4 bookings: yellow
        }
      }
    }
    return null;
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
    onStartDateChange(date);
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  return (
    <div className="custom-calendar-container">
      <input 
        ref={inputRef}
        type="text"
        value={selectedDate ? dayjs(selectedDate).format('MM/DD/YYYY') : ''}
        onClick={toggleCalendar}
        readOnly
        placeholder="Pick Checkin Date"
        className="calendar-input"
      />
      {calendarVisible && (
        <div ref={calendarRef} className="calendar-popup">
          <Calendar
            onChange={handleDateChange}
            tileClassName={tileClassName} // Use to color dates based on availability
            className="custom-calendar"
          />
        </div>
      )}
    </div>
  );
}
