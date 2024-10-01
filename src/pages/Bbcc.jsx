import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Dialog, DialogFooter } from "@material-tailwind/react";
import { NavbarWithMegaMenu } from "../components/Navbar";
import { Button, Option, Select } from "@material-tailwind/react";
import { Box, Tabs, Tab, Paper,IconButton } from '@mui/material';
import { Card, Typography, Input, Textarea } from "@material-tailwind/react";
import moment from "moment"; 
import DateTimePicker from "../components/DateTimePicker";
import DateTimePickerCheckout from "../components/DateTimePickerCheckout";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Modal from "../components/Modal";
import CloseIcon from '@mui/icons-material/Close';
import ImageGallery from "../components/ImageGallery";
import StarRatings from 'react-star-ratings'; // Import StarRatings component
import LocationOnIcon from '@mui/icons-material/LocationOn';
import bbccOuter1 from '../assets/bbcc/bbcc-outer-1.png';
import bbccOuter2 from '../assets/bbcc/bbcc-outer-2.jpg';
import bbccOuter3 from '../assets/bbcc/bbcc-outer-3.jpg';
import bbccHall1 from '../assets/bbcc/bbcc-hall-1.jpg';
import bbccHall6 from '../assets/bbcc/bbcc-hall-2.jpg';
import bbccHall01 from '../assets/bbcc/bbcc-hall-1-front.jpg';
import bbccHall02 from '../assets/bbcc/bbcc-hall.jpg';
import tour1 from '../assets/bbcc/tour1.jpg';
import tour2 from '../assets/bbcc/tour2.jpg';
import tour3 from '../assets/bbcc/tour3.jpg';
import tour4 from '../assets/bbcc/tour4.jpg';
import tour5 from '../assets/bbcc/tour5.jpg';
import tour6 from '../assets/bbcc/tour6.jpg';
import tour7 from '../assets/bbcc/tour7.jpg';
import tour8 from '../assets/bbcc/tour8.jpg';

const contentData = [
    {"bbcc_id":"1","title":"BBCC","hall_type":"Main Convention Hall","hall_num":"Hall - 01","seating_capacity":"3200","rent":"335500","deposit":"100000","additional_hour_at":"20000","image": bbccHall1},
    {"bbcc_id":"2","title":"BBCC","hall_type":"Mini Auditorium","hall_num":"Hall - 06","seating_capacity":"400","rent":"77000","deposit":"50000","additional_hour_at":"3000","image": bbccHall6},
    {"bbcc_id":"3","title":"BBCC","hall_type":"Auditorium","hall_num":"Hall - 07","seating_capacity":"400","rent":"88000","deposit":"50000","additional_hour_at":"3000"},
    {"bbcc_id":"4","title":"BBCC","hall_type":"Banquet Cum Exhibition Hall","hall_num":"Hall - 03 & 05","seating_capacity":"350 each hall","rent":"49500","deposit":"25000","additional_hour_at":"2000"},
    {"bbcc_id":"5","title":"BBCC","hall_type":"Banquet Cum Exhibition Hall (Hall - 02 & 04)","hall_num":"","seating_capacity":"200 each hall","rent":"27500","deposit":"25000","additional_hour_at":"1500"},
    {"bbcc_id":"6","title":"BBCC","hall_type":"PRE-FUCTION AREA A|B|D|E","hall_num":"","seating_capacity":"200","rent":"11000","deposit":"N/A","additional_hour_at":"N/A"},
    {"bbcc_id":"7","title":"BBCC","hall_type":"PRE-FUCTION AREA C|F","hall_num":"","seating_capacity":"150","rent":"11000","deposit":"N/A","additional_hour_at":"N/A"},
    {"bbcc_id":"8","title":"BBCC","hall_type":"PRE-FUCTION AREA G|H","hall_num":"","seating_capacity":"100","rent":"11000","deposit":"N/A","additional_hour_at":"N/A"},
    {"bbcc_id":"6","title":"BBCC","hall_type":"Lawn","hall_num":"01 & 02","seating_capacity":"250","rent":"11000","deposit":"N/A","additional_hour_at":"N/A"},
    {"bbcc_id":"6","title":"BBCC","hall_type":"Glass Room","hall_num":"","seating_capacity":"100","rent":"11000","deposit":"N/A","additional_hour_at":"N/A"}
];

const generateHallInfo = (item) => {
  return `BBCC ${item.hall_type} (${item.hall_num})`;
};


function Bbcc() {
  const { user } = useAuth();
  console.log(user);
  const initialProperty = contentData[0];
  const navigate = useNavigate();

  // const [userDetails, setUserDetails] = useState({ name: '', mobile: '', email: '' });
  const [detailsFetched, setDetailsFetched] = useState(false);
  console.log("User Id: ", user.id);

  useEffect(() => {
    if (user && user.id) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user-details",
        { user_id: user.id }
      );
      console.log("Fetched user details: ", response.data);
      // setUserDetails(response.data);
      setFullName(response.data.full_name || ""); // Update full name here
      setPhoneNumber(response.data.mobile || ""); // Update phone number here
      setDetailsFetched(true); // Set detailsFetched to true
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const [selectedProperty, setSelectedProperty] = useState(
    initialProperty.hall_type
  );
  const [selectedHallNo, setSelectedHallNo] = useState(
    initialProperty.hall_num
  );
  const [price, setPrice] = useState(initialProperty.rent);
  const [activeTab, setActiveTab] = useState(0);
  const [deposit, setDeposit] = useState(initialProperty.deposit);
  const [seatingCapacity, setSeatingCapacity] = useState(
    initialProperty.seating_capacity
  );
  const [additionalHrAt, setAdditionalHrAt] = useState(
    initialProperty.additional_hour_at
  );
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(initialProperty.image);

  const handleOpen = () => setOpen(!open);

  const formattedStartDate = dayjs(checkInDate).format("YYYY-MM-DD");
  const formattedEndDate = dayjs(checkOutDate).format("YYYY-MM-DD");

  const start = dayjs(formattedStartDate);
  const end = dayjs(formattedEndDate);
  const numberOfDays = end.diff(start, "day") + 1;

  // const handleCheckAvailability = () => {
  //   const formattedStartDate = dayjs(checkInDate).format("YYYY-MM-DD");
  //   const formattedEndDate = dayjs(checkOutDate).format("YYYY-MM-DD");
  //   const propertyFullInfoName = `BBCC ${selectedProperty} (${selectedHallNo})`;

  //   console.log(propertyFullInfoName);

  //   const data = {
  //     property: propertyFullInfoName,
  //     date_from: formattedStartDate,
  //     date_to: formattedEndDate,
  //   };

  //   console.log("Checking availability with data:", data);

  //   fetch("https://meratravelbuddy.com/apis-prod/check_availability_test.php", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Availability check result:", result);
  //       setAvailabilityMessage(result.message);
  //       setOpen(true);
  //       toast.success(result.message);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       toast.error("Error checking availability.");
  //     });
  // };
  const handleCheckAvailability = () => {
    const formattedStartDate = dayjs(checkInDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(checkOutDate).format("YYYY-MM-DD");
    const propertyFullInfoName = `BBCC ${selectedProperty} (${selectedHallNo})`; // Use backticks for template literals

    console.log(propertyFullInfoName);

    const data = {
      property: propertyFullInfoName,
      date_from: formattedStartDate,
      date_to: formattedEndDate,
      user_id: user.id
    };

    console.log("Checking availability with data:", data);

    fetch("http://localhost:8000/api/check-availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Availability check result:", result);
        setAvailabilityMessage(result.message);
        //availabilityMessage.includes("available")
        if (result.message.includes("available")) {
            setOpen(true);  // Open modal only if the property is available
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
       // setOpen(true);
        //toast.success(result.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error checking availability.");
      });
};


  const handlePropertySelect = (value) => {
    console.log("Selected value:", value);
    const selectedData = contentData.find((item) => item.hall_type === value);

    if (selectedData) {
      console.log("Selected data found:", selectedData);
      setSelectedProperty(selectedData.hall_type);
      setSelectedHallNo(selectedData.hall_num);
      setPrice(selectedData.rent);
      setDeposit(selectedData.deposit);
      setSeatingCapacity(selectedData.seating_capacity);
      setAdditionalHrAt(selectedData.additional_hour_at);
      setSelectedImage(selectedData.image);

      // Recalculate the total price with the new selected data
      updateTotalPrice(checkInDate, checkOutDate);
    } else {
      console.log("No data found for the selected value.");
      setSelectedProperty("");
      setSelectedHallNo("");
      setPrice("");
      setDeposit("");
      setSeatingCapacity("");
      setAdditionalHrAt("");
      setSelectedImage("");
      setTotalPrice(""); // Reset total price
    }
  };

  const handleCheckInDateChange = (date) => {
    console.log("Check-in date changed:", date);
    setCheckInDate(date);
    updateTotalPrice(date, checkOutDate);
  };

  const handleCheckOutDateChange = (date) => {
    console.log("Check-out date changed:", date);
    setCheckOutDate(date);
    updateTotalPrice(checkInDate, date);
  };

  useEffect(() => {
    updateTotalPrice(checkInDate, checkOutDate);
  }, [selectedProperty, checkInDate, checkOutDate]);

  const updateTotalPrice = (checkInDate, checkOutDate) => {
    console.log("Updating total price with dates:", checkInDate, checkOutDate);
    if (checkInDate && checkOutDate) {
      const startDate = dayjs(checkInDate);
      const endDate = dayjs(checkOutDate);

      const days = dayjs(checkOutDate).diff(dayjs(checkInDate), "day");
      const noOfDays = days + 1;
      const selectedData = contentData.find(
        (item) => item.hall_type === selectedProperty
      );
      if (selectedData) {
        let pricePerDay = parseInt(selectedData.rent);
        // Determine if the date is within the lean period (April to September)
        const isLeanPeriod = startDate.month() >= 3 && startDate.month() <= 8;

        if (isLeanPeriod) {
          // Apply 18% discount
          pricePerDay = pricePerDay * 0.82;
        }

        const totalPrice = Math.round(pricePerDay * noOfDays);
        console.log("Total price calculated:", totalPrice);
        setTotalPrice(totalPrice);
      }
    }
  };

  const propertyFullName = `BBCC ${selectedProperty} (${selectedHallNo})`;
  const [tabIndex, setTabIndex] = useState(0);
  const [fullName, setFullName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    purpose: "",
  });
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const validateFullName = () => {
    if (!fullName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "Full Name is required.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "",
      }));
      return true;
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;

    // Ensure only digits are entered
    if (!/^\d*$/.test(inputPhoneNumber)) {
      return;
    }

    // Limit the input to 10 characters
    const truncatedPhoneNumber = inputPhoneNumber.slice(0, 10);

    // Validate the phone number
    const isValid = validatePhoneNumber(truncatedPhoneNumber);

    // Ensure that the first digit is in the range [6, 9]
    if (
      truncatedPhoneNumber.length > 0 &&
      (truncatedPhoneNumber[0] < "6" || truncatedPhoneNumber[0] > "9")
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone Number must start with a digit between 6 and 9.",
      }));
    } else if (!isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Invalid Phone Number.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "",
      }));
    }

    setPhoneNumber(truncatedPhoneNumber);
  };

  const validatePurpose = () => {
    if (!purpose.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        purpose: "Purpose of Booking is required.",
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        purpose: "",
      }));
      return true;
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  // const handlePhoneNumberChange = (e) => {
  //     setPhoneNumber(e.target.value);
  //   };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleProceedToPayClick = () => {
    const isFullNameValid = validateFullName();
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    const isPurposeValid = validatePurpose();

    if (isFullNameValid && isPhoneNumberValid && isPurposeValid) {
      handleProceedToPay();
    }
  };

  const handleProceedToPay = () => {
    // Handle the proceed to pay action
    console.log("Full Name: ", fullName);
    console.log("Phone Number: ", phoneNumber);
    console.log("Purpose of Booking:", purpose);

    // Integrate your payment gateway here
    // Example: Using a hypothetical payment gateway function `processPayment`
    processPayment(totalPrice, handlePaymentSuccess, handlePaymentFailure);
  };

  const processPayment = (totalPrice, onSuccess, onFailure) => {
    // Hypothetical payment gateway integration
    // Replace this with your actual payment gateway logic
    console.log(`Processing payment of Rs. ${totalPrice}...`);

    // Simulate a successful payment response
    setTimeout(() => {
      const paymentSuccessful = true; // Simulate success or failure

      if (paymentSuccessful) {
        onSuccess();
      } else {
        onFailure(new Error("Payment failed"));
      }
    }, 2000);
  };

  const handlePaymentSuccess = () => {
    // After successful payment
    const bookingDetails = {
      user_id: user.id,
      username: fullName,
      mobile: phoneNumber,
      purpose_of_booking: purpose,
      property: propertyFullName,
      check_in_date: formattedStartDate,
      check_out_date: formattedEndDate,
      check_in_time: "9:00AM",
      check_out_time: "9:00PM",
      total_price: totalPrice,
      no_of_days: numberOfDays,
    };

    fetch(
      "http://127.0.0.1:8000/api/booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/booking", {
          state: { toastMessage: "Booking request sent for approval!" },
        });
        // toast.success(data.message);
        // alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Booking failed. Please try again.");
        // alert('Failed to store booking information. Please try again.');
      });
  };

  const handlePaymentFailure = (error) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      title: "BBCC_OUTER",
      images: [bbccOuter1, bbccOuter2, bbccOuter3],
    },
    {
      title: "BBCC Main Convention Hall (Hall 01)",
      images: [bbccHall01, bbccHall02, bbccHall1],
    },
    {
      title: "Tour",
      images: [
        bbccHall6,
        tour1,
        tour2,
        tour3,
        tour4,
        tour5,
        tour6,
        tour7,
        tour8,
      ],
    },
  ];
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [reviews] = useState([
    {
      userName: "John Doe",
      rating: 5,
      comment: "Amazing place, loved it!",
      date: "2024-09-08", // example date
    },
    {
      userName: "Jane Smith",
      rating: 4,
      comment: "Great experience, but a bit pricey.",
      date: "2024-09-05",
    },
    {
      userName: "Alex Johnson",
      rating: 3,
      comment: "Decent place but could improve the facilities.",
      date: "2024-09-01",
    },
  ]);

  const aboutUsContent = (
    <div className="p-4">
      <Typography variant="h5" className="font-semibold">
        About Us
      </Typography>
      <Typography className="mt-2 text-gray-700">
        Welcome to BBCC! We are committed to providing our guests with the best
        facilities and services. Our venue is perfect for weddings, corporate
        events, and more. With spacious halls, modern amenities, and top-notch
        service, we strive to make every event special.
      </Typography>
      <Typography className="mt-4 text-gray-700">
        Our team ensures that your experience at BBCC is hassle-free, enjoyable,
        and unforgettable. Thank you for choosing us!
      </Typography>
    </div>
  );

  const securityPolicyContent = (
    <div className="p-4">
      <Typography variant="h5" className="font-semibold">
        Security & Policy
      </Typography>
      <Typography className="mt-2 text-gray-700">
        At BBCC, your security is our top priority. We have implemented
        stringent measures to ensure a safe and secure environment for all our
        guests. Our security personnel are available 24/7 to monitor and assist
        with any concerns.
      </Typography>
      <Typography className="mt-4 text-gray-700">
        Please note that we follow a strict no-refund policy for confirmed
        bookings unless otherwise stated. All personal information provided to
        us will be kept confidential and used only for booking purposes.
      </Typography>
    </div>
  );
  const handleContactUsOpen = () => setContactUsOpen(true);
  const handleContactUsClose = () => setContactUsOpen(false);
  return (
    <>
      <NavbarWithMegaMenu />
      <div className="p-5">
        <Card
          className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center pt-0 bg-white shadow-lg rounded-lg"
          color="transparent"
        >
          <div className="relative col-span-1">
            {selectedImage && (
              <>
                <img
                  src={selectedImage}
                  alt="Selected Hall"
                  className="mb-3 rounded-lg w-full h-auto object-cover shadow-md"
                />
                <button
                  className="absolute bottom-2 right-2 rounded-md p-2 px-4 text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  View Gallery
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <ImageGallery categories={categories} />
                </Modal>
              </>
            )}
          </div>
          <div className="col-span-1 flex flex-col gap-4 ">
            <Typography variant="h4" color="blue-gray" className="font-semibold">
            Biswa Bangla Convention Centre
            </Typography>
            <Typography
              color="gray"
              className="mb-2 py-2 text-left font-small leading-6"
            >
             Biswa Bangla Convention Centre is a convention centre in New Town, West Bengal, India. It was built by West Bengal Housing Infrastructure Development Corporation (HIDCO) and opened in the year 2017. It was built to attract meetings, incentives, conferences and exhibitions (MICE) tourism in the city. Check availability and pricing before proceeding with the booking.
            </Typography>

            <div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <LocationOnIcon color="primary" />
    <Typography className="flex-grow">
      New Town, Kolkata
    </Typography>
    <button
      className="text-blue-600 underline"
      onClick={() => setMapModalOpen(true)}
    >
      See on Map
    </button>
  </div>
  <div className="flex gap-4">
    <a href="mailto:info@example.com" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
      Send Mail
    </a>
    <Button
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      onClick={handleContactUsOpen}
    >
      Contact Us
    </Button>
  </div>
</div>

         

        {/* Contact Us Modal */}
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
              Name: John Doe
            </Typography>
            <Typography variant="body1">
              Phone: +91 123 456 7890
            </Typography>
          </div>
        </Dialog>

        {/* Existing Content */}
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9105913082403!2d88.47155787530075!3d22.582447079484695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027533fd17b983%3A0xb09288789f2f7388!2sBiswa%20Bangla%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1725862402139!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
           
          </div>
        </Dialog>
            <Select
              label="Select Property"
              onChange={(value) => handlePropertySelect(value)}
              success
              value={selectedProperty}
              className="mb-4"
            >
              {contentData.map((item, index) => (
                <Option key={index} value={item.hall_type}>
                  {generateHallInfo(item)}
                </Option>
              ))}
            </Select>
            <DateTimePicker
              propertySelected={propertyFullName}
              onStartDateChange={handleCheckInDateChange}
              className="mb-4"
            />
            <DateTimePickerCheckout
              propertySelected={propertyFullName}
              onEndDateChange={handleCheckOutDateChange}
              className="mb-4"
            />

            {selectedProperty && (
              <div className="flex flex-col w-full gap-2">
                <Typography className="text-right" variant="h6">
                  Seating Capacity: <span className="font-bold">{seatingCapacity} people</span>
                </Typography>
                <Typography className="text-right" variant="h6">
                  Daily Rate: <span className="font-bold">Rs. {price} /-</span>
                </Typography>
                <Typography className="text-right" variant="h6">
                  Deposit: <span className="font-bold">Rs. {deposit} /-</span>
                </Typography>
                <Typography className="text-right" variant="h6">
                  Additional Hour Rate: <span className="font-bold">Rs. {additionalHrAt} /-</span>
                </Typography>
                
               
              </div>
            )}
            {totalPrice !== "" && (
              <Typography className="text-center mt-4" variant="h6">
                Total Price: <span className="font-bold">Rs. {totalPrice} /-</span>
              </Typography>
            )}
            <div className="w-full mt-4 mb-20">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                onClick={handleCheckAvailability}
              >
                Check Availability
              </Button>
            </div>
          </div>
          <Dialog
            open={open && availabilityMessage}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            {availabilityMessage.includes("not available") ? (
              <Typography className="text-center font-semibold text-red-500 mt-3">
                {availabilityMessage}
              </Typography>
            ) : (
              availabilityMessage.includes("available") && (
                <div
                  className="py-4 px-6"
                  style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                  <Typography className="text-center text-base font-semibold text-green-600">
  {availabilityMessage}
</Typography>
                  <Typography className="text-center text-base font-semibold text-green-600">
                    
                    BBCC {selectedProperty} ({selectedHallNo}) is available for the selected date.
                  </Typography>
                  <Typography className="text-center text-base mb-4 font-semibold text-green-600">
                    Please pay a HOLDON amount of <span className="font-bold">Rs. 5,000/-</span> to send your booking request for approval. If approved, this amount will be adjusted in the total amount; if not approved, we'll refund the HOLDON amount within 24 hours.
                  </Typography>
                  <Typography className="text-base text-gray-800 mb-3 font-semibold">
                    Summary
                  </Typography>
                  <div className="bg-green-50 p-4 mb-5 rounded-lg shadow-sm">
                    <Typography>
                      Property: BBCC {selectedProperty} ({selectedHallNo})
                    </Typography>
                    <Typography>Check-in Date: {formattedStartDate}</Typography>
                    <Typography>Check-out Date: {formattedEndDate}</Typography>
                    <Typography>Time: 9:00 am - 9:00 pm</Typography>
                    <Typography>No. of Days: {numberOfDays}</Typography>
                    <Typography>Total Price: <span className="font-bold">Rs. {totalPrice} /-</span></Typography>
                  </div>
                  <div className="mb-6">
                    <Input
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => {
                        handleFullNameChange(e);
                        validateFullName();
                      }}
                      onBlur={validateFullName}
                      className="w-full mb-4"
                    />
                    {errors.fullName && (
                      <Typography className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-6">
                    <Input
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => {
                        handlePhoneNumberChange(e);
                        validatePhoneNumber(phoneNumber);
                      }}
                      onBlur={() => validatePhoneNumber(phoneNumber)}
                      className="w-full mb-4"
                    />
                    {errors.phoneNumber && (
                      <Typography className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-6">
                    <Textarea
                      label="Purpose of Booking"
                      value={purpose}
                      onChange={(e) => {
                        handlePurposeChange(e);
                        validatePurpose();
                      }}
                      onBlur={validatePurpose}
                      className="w-full"
                    />
                    {errors.purpose && (
                      <Typography className="text-red-500 text-sm mt-1">
                        {errors.purpose}
                      </Typography>
                    )}
                  </div>
                  <Button
                    className="lg:w-3/5 w-11/12 bg-green-700 text-white font-semibold m-auto"
                    onClick={handleProceedToPayClick}
                  >
                    Proceed to Pay HOLDON
                  </Button>
                </div>
              )
            )}
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                Cancel
              </Button>
            </DialogFooter>
          </Dialog>

          <Box sx={{ width: '100%', typography: 'body1' }}>
      <Paper>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Tabs example"
          variant="fullWidth"
          centered
        >
          <Tab label="Review" />
          <Tab label="About Us" />
          <Tab label="Security and Policy" />
        </Tabs>
      </Paper>
      <Box sx={{ p: 3 }}>
        {tabIndex === 0 && (
          <div>
            <Typography variant="h6">Review Section</Typography>
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <Typography variant="body1" className="font-bold">
                  {review.userName}
                </Typography>
                <StarRatings
                  rating={review.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name='rating'
                />
                <Typography variant="body2" className="mt-1">
                  {review.comment}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mt-1">
                  {dayjs(review.date).format('MMMM D, YYYY')}
                </Typography>
              </div>
            ))}
          </div>
        )}
        {tabIndex === 1 && aboutUsContent}
        {tabIndex === 2 && securityPolicyContent}
      </Box>
    </Box>
        </Card>
       
      </div>

      <ToastContainer className="custom-toast-container" />
      {/* <BottomNav /> */}
    </>
  );
}

export default Bbcc;
