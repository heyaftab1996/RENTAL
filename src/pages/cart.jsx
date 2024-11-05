// CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, IconButton } from '@material-tailwind/react';
import { Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavbarWithMegaMenu } from "../components/Navbar";
import axios from 'axios';
import BookingModal from '../components/BookingModal';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [advancePrice, setAdvancePrice] = useState(0);
  const [showModal, setShowModal] = useState(false); // Add state for modal visibility
  const [bookingInfo, setBookingInfo] = useState(null); // Add state to hold booking info
  
  const calculateDaysBetween = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
    const token = localStorage.getItem('token');

    const fetchRentalDetails = async () => {
      const updatedItems = await Promise.all(
        storedItems.map(async (item) => {
          const response = await axios.get(
            `http://localhost:3000/api/rental-place-details-cart-page/${item.rentalPlaceId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const rentalDetails = response.data;
          return {
            ...item,
            name: rentalDetails.rental_place_name,
            description: rentalDetails.rental_place_description,
            rents: rentalDetails.rents?.map(rent => ({
              chargeName: rent.rental_charges.charges_name,
              amount: parseFloat(rent.amount) || 0,
            })) || [],
            payment_rent_checkout: rentalDetails.rent_add?.map(rent_add => ({
              chargeName: rent_add.charges_name,
              amount: parseFloat(rent_add.amount) || 0,
            })) || [],
            startDate: item.startDate,
            endDate: item.endDate,
            image: `http://localhost:3000/uploads/${rentalDetails.images[0]?.file_name || 'noimage.jpg'}`,
          };
        })
      );
      setCartItems(updatedItems);
    };

    fetchRentalDetails();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemTotal = (item.payment_rent_checkout || []).reduce((acc, rent) => acc + rent.amount, 0);
      return sum + itemTotal;
    }, 0);
    setTotalPrice(total);
    setAdvancePrice(cartItems.length * 5000);
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      const bookingResponses = await Promise.all(
        cartItems.map(async (item) => {
          const response = await axios.get(
            `http://localhost:3000/api/availability-cart-page/${item.rentalPlaceId}/${item.startDate}/${item.endDate}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(item);
          const totalSum = item.payment_rent_checkout.reduce((total, charge) => {
            return total + charge.amount;
          }, 0);
          // Return an object containing the rental place ID and the response data
          return {
            rentalPlaceId: item.rentalPlaceId, // Capture rentalPlaceId
            totalSum: totalSum,
            start_date: item.startDate,
            end_date: item.endDate,
            bookingInfo: response.data, // Response data (could be empty array)
          };
        })
      );
  
      setBookingInfo(bookingResponses); // Set bookingInfo to the array of responses
      //console.log(bookingInfo);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching booking availability:', error);
    }
  };

  return (
    <>
      <NavbarWithMegaMenu />

      <div className="p-5">
        <Typography variant="h4" className="font-semibold mb-4">Your Cart</Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4 mb-4 shadow-lg rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4 w-full">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 flex flex-col">
                      <Typography variant="h6" className="font-semibold">{item.name}</Typography>
                      <Typography variant="body2" className="text-gray-700">Start Date: {item.startDate}</Typography>
                      <Typography variant="body2" className="text-gray-700">End Date: {item.endDate}</Typography>
                      <Typography variant="body2" className="text-gray-700">
                        Number of Days: {calculateDaysBetween(item.startDate, item.endDate)}
                      </Typography>
                    </div>
                    <IconButton color="red" onClick={() => handleRemoveItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-4 shadow-lg rounded-lg bg-gray-50">
              <Typography variant="h5" className="font-semibold mb-4">Price Summary</Typography>
              {cartItems.map((item) => (
                <Box key={item.id} className="flex flex-col mb-2">
                  <Typography variant="body1" className="font-semibold">{item.name}</Typography>
                  {(item.payment_rent_checkout || []).map((rent, index) => (
                    <Box key={index} className="flex justify-between">
                      <Typography variant="body2">{rent.chargeName}</Typography>
                      <Typography variant="body2">₹{rent.amount.toLocaleString()}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
              <Divider className="my-4" />
              <Box className="flex justify-between items-center">
                <Typography variant="h6" className="font-semibold">Total</Typography>
                <Typography variant="h6" className="font-semibold">₹{totalPrice.toLocaleString()}</Typography>
              </Box>
              <Box className="flex justify-between items-center">
                <Typography variant="h6" className="font-semibold">Advance to be paid</Typography>
                <Typography variant="h6" className="font-semibold">₹{advancePrice}</Typography>
              </Box>
              <Button className="w-full mt-4 bg-green-600 text-white hover:bg-green-700" onClick={handleCheckout}>
                Proceed to Pay
              </Button>
            </div>
          </div>
        )}
        {showModal && (
          <BookingModal open={showModal} onClose={() => setShowModal(false)} advancePriceProps={advancePrice} bookingInfo={bookingInfo} />
        )}
      </div>
    </>
  );
};

export default CartPage;
