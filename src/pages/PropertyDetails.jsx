import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";
import { NavbarWithMegaMenu } from "../components/Navbar";
import { Card, Typography, Select, Option,Button, Dialog, DialogFooter } from "@material-tailwind/react"; // Ensure these are correct
import { Box, Tabs, Tab, Paper,IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import BookingCalendar from "../components/BookingCalendar";

import ImageSlider from './imageSlider';
const BookingPage = () => {
  const { propertyId } = useParams(); // Get property ID from URL
  const [propertyData, setPropertyData] = useState(null); // To store fetched property data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedPlace, setSelectedPlace] = useState(null); // To track selected rental place
//  const [selectedImage, setSelectedImage] = useState(null); // To track the selected image
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [reviews, setReviews] = useState([]);
  
  // Fetch property data based on propertyId
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setLoading(true); // Set loading true when fetching starts
        const response = await axios.get(`http://localhost:3000/api/rental-place-by-rental-property/${propertyId}`);
        setPropertyData(response.data); // Set the fetched data
        
        // Fetch reviews
        const responseReview = await axios.get(`http://localhost:3000/api/review-rating-rental-property/${propertyId}`);
        
        // Check if the response data is an object with a 'data' property that is an array
        if (Array.isArray(responseReview.data.data)) {
          setReviews(responseReview.data.data); // Set reviews from the 'data' property
        } else {
          setReviews([]); // Set to an empty array if the response is not an array
        }
  
        if (response.data.rentalPlaces && response.data.rentalPlaces.length > 0) {
          const firstPlace = response.data.rentalPlaces[0];
          setSelectedPlace(firstPlace);
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchPropertyData();
  }, [propertyId]);

  // Ensure hooks are called unconditionally
  const handlePlaceSelect = (event) => {
    const placeId = event; // Extract the value properly
    const place = propertyData.rentalPlaces.find((p) => p.id === parseInt(placeId)); // Find the selected place by ID
    setSelectedPlace(place); // Set the selected place data
    // setSelectedImage(place?.images?.length > 0 ? `http://localhost:3000/uploads/${place.images[0]}` : `http://localhost:3000/uploads/noimage.jpg`);
  };
  const onCancel = () => {
    setShowCalendar(false);
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
 

  

  // Show loading, error or empty state
  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6">Error: {error}</Typography>;
  if (!propertyData || !propertyData.rentalProperty || !propertyData.rentalPlaces) {
    return <Typography variant="h6">No property found.</Typography>;
  }

  // Destructure fetched data
  const { rentalProperty, rentalPlaces } = propertyData;
  const { rental_property_name,rental_property_description, map_iframe,address1,address2,pin_code,state,city ,email,contact_person,contact_person_designation,phone_number,about_us,security_policy} = rentalProperty;
  const handleContactUsOpen = () => setContactUsOpen(true);
  const handleContactUsClose = () => setContactUsOpen(false);
  const handleCheckAvailability = () => {
    console.log(showCalendar);
    setShowCalendar(true); // Show the calendar when button is clicked
  };
  return (
    <>
      <NavbarWithMegaMenu />
      <div className="p-5">
        <Card className="grid grid-cols-1 justify-center pt-0 bg-white shadow-lg rounded-lg">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
            {selectedPlace.id &&  (
                <ImageSlider placeId={selectedPlace.id} />
              )}
              {/* <ImageSlider imagess={selectedImage} /> */}
            </div>

            <div className="col-span-7">
              <Typography variant="h4" color="blue-gray" className="font-semibold">
                {rental_property_name}
              </Typography>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LocationOnIcon color="primary" />
                  <Typography className="flex-grow">
                    {address1}.{address2}.{city},{state},{pin_code}
                  </Typography>
                </div>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setMapModalOpen(true)}>
                    See on Map
                  </button>
                    <Button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"  onClick={handleContactUsOpen}>
                      Contact Us
                  </Button>
                  <Button
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      onClick={handleCheckAvailability}
                    >
                      Check Availability
                    </Button>
            
                </div>
               
                 {showCalendar && selectedPlace && (
                <BookingCalendar rentalPlaceId={selectedPlace.id}  showCalendar={showCalendar} 
                onCancel={() => setShowCalendar(false)} />
              )}
              </div>
              <Dialog
          open={contactUsOpen}
          onClose={handleContactUsClose}
          fullWidth
          maxWidth="sm"
        >
          <div className="p-4">
            <Typography variant="h6" className="mb-4">
              Contact Us
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleContactUsClose}
                aria-label="close"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1300,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <Typography variant="body1" className="mb-2">
              For any inquiries, please contact us at:
            </Typography>
            <Typography variant="body1">
              Name: {contact_person}({contact_person_designation})
            </Typography>
            <Typography variant="body1">
              Phone: {phone_number}
            </Typography>
            <Typography variant="body1">
              Email: <a href={`mailto:${email}`} >
              {email}
                  </a>
            </Typography>
          </div>
        </Dialog>
        <Dialog
          open={mapModalOpen}
          onClose={() => setMapModalOpen(false)}
          fullWidth
          maxWidth="md"
        ></Dialog>
          <Dialog
          open={mapModalOpen}
          onClose={() => setMapModalOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <div className="p-4">
            <Typography variant="h6" className="mb-2">
              Location on Map
              <IconButton
              edge="end"
              color="inherit"
              onClick={() => setMapModalOpen(false)} // Closes the modal when clicked
              aria-label="close"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1300, // Ensures the icon is on top of other content
              }}
            >
              <CloseIcon />
            </IconButton>
            </Typography>
           
            <iframe
              src={map_iframe}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
           
          </div>
        </Dialog>
              {/* Rental Place Selection */}
              <div className="flex flex-col gap-4 mt-4">
                <Select label="Select Rental Place" onChange={handlePlaceSelect}  value={selectedPlace ? selectedPlace.id : ""} >
                  {rentalPlaces.map((place) => (
                    <Option key={place.id} value={place.id}>
                      {place.rental_place_name} (Seating Capacity: {place.seating_capacity})
                    </Option>
                  ))}
                </Select>

                {/* Selected Place Details */}
                {selectedPlace && (
                  <div className="rental-details">
                    <Card className="p-4 border border-gray-300 shadow-lg rounded-lg">
                      <Typography variant="h5" className="font-semibold">
                        {selectedPlace.rental_place_name}(Seating Capacity: {selectedPlace.seating_capacity})(Time Slot: {selectedPlace.time_slot})
                      </Typography>
                      <Typography variant="subtitle1" className="text-gray-700">
                        {selectedPlace.rental_place_description}
                      </Typography>
                      {/* Rent Charges */}
                      {selectedPlace.rents && selectedPlace.rents.length > 0 ? (
                        <>
                          <Typography variant="body1" className="mt-3 font-semibold">
                            Rent Charges:
                          </Typography>
                          <ul className="list-disc ml-4">
                            {selectedPlace.rents.map((rent, index) => (
                              <li key={index}>
                                {rent.charges_name}: ₹{rent.amount}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Typography variant="body2" className="mt-3">
                          No rent charges available.
                        </Typography>
                      )}
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs for Reviews, About Us, and Security & Policy */}
        <Card className="mt-6 p-5 shadow-lg">
          <Box>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Reviews" />
              <Tab label="About Us" />
              <Tab label="Security & Policy" />
            </Tabs>
          </Box>
          <Box>
          {tabIndex === 0 && (
            <div className="p-4">
              {Array.isArray(reviews) && reviews.length === 0 ? (
                <Typography>No reviews yet.</Typography>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="border-b pb-2 mb-2">
                    <Typography variant="h6">{review.user.name}</Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {review.comments}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {dayjs(review.date).format("MMM DD, YYYY")}
                    </Typography>
                  </div>
                ))
              )}
            </div>
          )}
            {tabIndex === 1 && (
              <div className="p-4">
                <Typography variant="h6">About Us</Typography>
                <Typography className="mt-2">
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: about_us }} />
                 
                </Typography>
              </div>
            )}
            {tabIndex === 2 && (
              <div className="p-4">
                <Typography variant="h6">Security & Policy</Typography>
                <Typography className="mt-2">
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: security_policy }} />
                </Typography>
              </div>
            )}
          </Box>
        </Card>
      </div>
    </>
  );
};

export default BookingPage;
