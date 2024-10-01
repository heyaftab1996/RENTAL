import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import '../App.css'; 
import {
    Dialog,
    DialogFooter,
} from "@material-tailwind/react";
import { NavbarWithMegaMenu } from '../components/Navbar';
import { Button, Option, Select } from '@material-tailwind/react';
import { Card, Typography, Input, Textarea } from "@material-tailwind/react";
import DateTimePicker from '../components/DateTimePicker';
import DateTimePickerCheckout from '../components/DateTimePickerCheckout';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from '../components/BottomNav';
import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';

import BbccOuter1 from '../assets/bbcc/bbcc-outer-1.png';
import BbccOuter2 from '../assets/bbcc/bbcc-outer-2.jpg';
import BbccOuter3 from '../assets/bbcc/bbcc-outer-3.jpg';
import BbccHall1 from '../assets/bbcc/bbcc-hall-1.jpg';
import BbccHall6 from '../assets/bbcc/bbcc-hall-2.jpg';
import BbccHall01 from '../assets/bbcc/bbcc-hall-1-front.jpg';
import BbccHall02 from '../assets/bbcc/bbcc-hall.jpg';
import ntmain from '../assets/nt-cover.jpg';
import tour1 from '../assets/bbcc/tour1.jpg';
import tour2 from '../assets/bbcc/tour2.jpg';
import tour3 from '../assets/bbcc/tour3.jpg';
import tour4 from '../assets/bbcc/tour4.jpg';
import tour5 from '../assets/bbcc/tour5.jpg';
import tour6 from '../assets/bbcc/tour6.jpg';
import tour7 from '../assets/bbcc/tour7.jpg';
import tour8 from '../assets/bbcc/tour8.jpg';

const contentData = [
    {"nt_id":"1","title":"Nazrul Tirtha","hall_type":"Screen 3","hall_num":"Mini Auditorium","seating_capacity":"60","rent":"10000","deposit":"4000","additional_hour_at":"1000","image": ntmain},
];

const generateHallInfo = (item) => {
    return `NT ${item.hall_type} (${item.hall_num})`;
};

function NazrulTirtha() {
    const { user } = useAuth();
    const initialProperty = contentData[0];
    const navigate = useNavigate();

    // const [userDetails, setUserDetails] = useState({ name: '', mobile: '', email: '' });
    const [detailsFetched, setDetailsFetched] = useState(false); 
    console.log("User Id: ", user.user_id);

    useEffect(() => {
        if (user && user.user_id) {
            fetchUserDetails();
        }
    }, [user]);


    const fetchUserDetails = async () => {
        try {
            const response = await axios.post('https://meratravelbuddy.com/api/user-details.php', { user_id: user.user_id });
            console.log("Fetched user details: ", response.data);
            // setUserDetails(response.data);
            setFullName(response.data.full_name || ""); // Update full name here
            setPhoneNumber(response.data.mobile || ""); // Update phone number here
            setDetailsFetched(true); // Set detailsFetched to true
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const [selectedProperty, setSelectedProperty] = useState(initialProperty.hall_type);
    const [selectedHallNo, setSelectedHallNo] = useState(initialProperty.hall_num);
    const [price, setPrice] = useState(initialProperty.rent);
    const [deposit, setDeposit] = useState(initialProperty.deposit);
    const [seatingCapacity, setSeatingCapacity] = useState(initialProperty.seating_capacity);
    const [additionalHrAt, setAdditionalHrAt] = useState(initialProperty.additional_hour_at);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(initialProperty.image);

    const handleOpen = () => setOpen(!open);

    const formattedStartDate = dayjs(checkInDate).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(checkOutDate).format('YYYY-MM-DD');

    const start = dayjs(formattedStartDate);
    const end = dayjs(formattedEndDate);
    const numberOfDays = end.diff(start, 'day') + 1;

    const handleCheckAvailability = () => {
        const formattedStartDate = dayjs(checkInDate).format('YYYY-MM-DD');
        const formattedEndDate = dayjs(checkOutDate).format('YYYY-MM-DD');
        const propertyFullInfoName = `NT ${selectedProperty} (${selectedHallNo})`;

        console.log(propertyFullInfoName);

        const data = {
            property: propertyFullInfoName,
            date_from: formattedStartDate,
            date_to: formattedEndDate,
        };

        console.log("Checking availability with data:", data);

        fetch('https://meratravelbuddy.com/apis-prod/check_availability_test.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log("Availability check result:", result);
            setAvailabilityMessage(result.message);
            setOpen(true);
            toast.success(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Error checking availability.');
        });
        
    };

    const handlePropertySelect = (value) => {
        console.log("Selected value:", value);
        const selectedData = contentData.find(item => item.hall_type === value);

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
            setSelectedProperty('');
            setSelectedHallNo('');
            setPrice('');
            setDeposit('');
            setSeatingCapacity('');
            setAdditionalHrAt('');
            setSelectedImage('');
            setTotalPrice(''); // Reset total price
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
            const days = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
            const noOfDays = days + 1;
            const selectedData = contentData.find(item => item.hall_type === selectedProperty);
            if (selectedData) {
                const pricePerDay = parseInt(selectedData.rent);
                const totalPrice = pricePerDay * noOfDays;
                console.log("Total price calculated:", totalPrice);
                setTotalPrice(totalPrice);
            }
        }
    };

    const propertyFullName = `NT ${selectedProperty} (${selectedHallNo})`;

    const [fullName, setFullName] = useState("");
    const [purpose, setPurpose] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errors, setErrors] = useState({
        fullName: "",
        phoneNumber: "",
        purpose: "",
    });

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
                onFailure(new Error('Payment failed'));
            }
        }, 2000);
    };

    const handlePaymentSuccess = () => {
        // After successful payment
        const bookingDetails = {
            user_id: user.user_id,
            username: fullName,
            mobile: phoneNumber,
            purpose_of_booking: purpose,
            property: propertyFullName,
            check_in_date: formattedStartDate,
            check_out_date: formattedEndDate,
            check_in_time: '9:00AM',
            check_out_time: '9:00PM',
            total_price: totalPrice,
            no_of_days: numberOfDays
        };

        fetch('https://meratravelbuddy.com/apis-prod/approval_request_from_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate("/profile", { state: { toastMessage: "Booking request sent for approval!" } });
            // toast.success(data.message);
            // alert(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error('Booking failed. Please try again.');
            // alert('Failed to store booking information. Please try again.');
        });
    }

    const handlePaymentFailure = (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
      {
        title: 'Dda_OUTER',
        images: [
            BbccOuter1,
            BbccOuter2,
            BbccOuter3,
        ],
      },
      {
        title: 'Dda Main Convention Hall (Hall 01)',
        images: [
          BbccHall01,
          BbccHall02,
          BbccHall1,
        ],
      },
      {
        title: 'Tour',
        images: [
          BbccHall6,
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

    return (
        <>
            <NavbarWithMegaMenu />
            <div className='w-full'>
                <Card className='grid justify-center mt-3 mx-5' color="transparent" shadow={false}>
                    
                    <div className="mt-2 mb-2 max-w-screen-lg sm:w-96">
                        <Typography variant="h4" color="blue-gray">
                            Nazrul Tirtha
                        </Typography>
                        <Typography color="gray" className="mb-2 py-2 text-left font-normal leading-4">
                            Nice to meet you! Check availability & price then proceed to booking.
                        </Typography>
                        {selectedImage && (
                            <div className="relative">
                                <img src={selectedImage} alt="Selected Hall" className="mb-3 rounded-lg" />
                                {/* <button className='absolute bottom-0 right-0 rounded-br-md rounded-tl-md p-2 px-3 text-white bg-[#0e4a8f]'>Gallery (see all images)</button> */}

                                <button
                                    className="absolute bottom-0 right-0 rounded-br-md rounded-tl-md p-2 px-3 text-white bg-[#0e4a8f] hover:bg-blue-700"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Gallery (see all images)
                                </button>

                                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                    {/* <h2 className="text-lg font-semibold mb-4">Image Gallery</h2> */}
                                    <ImageGallery categories={categories} />
                                </Modal>

                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <Select
                                label="Select Property"
                                onChange={(value) => handlePropertySelect(value)}
                                success
                                value={selectedProperty} // Set the default selected value
                            >
                                {contentData.map((item, index) => (
                                    <Option key={index} value={item.hall_type}>
                                        {generateHallInfo(item)}
                                    </Option>
                                ))}
                            </Select>
                            <DateTimePicker propertySelected={propertyFullName} onStartDateChange={handleCheckInDateChange} />
                            <DateTimePickerCheckout propertySelected={propertyFullName} onEndDateChange={handleCheckOutDateChange} />
                        </div>
                        {selectedProperty && (
                        <div className="flex flex-col w-full justify-end">
                            <Typography className='w-full text-right' variant="h6">Seating Capacity: {seatingCapacity} people</Typography>
                            <Typography className='w-full text-right' variant="h6">Additional hour at: Rs. {additionalHrAt} /-</Typography>
                            <Typography className='w-full text-right' variant="h6">Price: Rs. {price} /- per day</Typography>
                            <Typography className='w-full text-right' variant="h6">Deposit: Rs. {deposit} /-</Typography>
                            
                        </div>
                        )}
                        {totalPrice !== '' && (
                            <Typography className='-mt-6' variant="h6">Total Price: Rs. {totalPrice} /-</Typography>
                        )}
                        <div className='w-full mt-2 mb-20'>
                            <Button className='w-full bg-green-600' onClick={handleCheckAvailability}>Check Availability</Button>
                        </div>
                    </div>
                    
                    <Dialog
                        open={open && detailsFetched}
                        handler={handleOpen}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                    >
                        {availabilityMessage.includes("not available") ? (
                            <Typography className='text-center font-semibold text-red-500 mt-3'>{availabilityMessage}</Typography>
                        ) : (
                            availabilityMessage.includes("available") && (
                                <div className='py-3 px-5' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                    <Typography className='text-center text-base font-semibold text-green-600'>NT {selectedProperty} ({selectedHallNo}) is available for selected date.</Typography>
                                    <Typography className='text-center text-base mb-5 font-semibold text-green-600'>Please pay a HOLDON amount of Rs. 5,000/- to send your booking request for approval. If approved, this amount will be adjusted in whole amount and if not approved then we'll refund HOLDON amount within 24hrs.</Typography>
                                    <Typography className='text-base text-gray-800 mb-3 font-semibold'>Summary</Typography>
                                    <div className='bg-green-50 p-3 mb-5'>
                                        <Typography>Property: NT {selectedProperty} ({selectedHallNo})</Typography>
                                        <Typography>Check-in Date: {formattedStartDate}</Typography>
                                        <Typography>Check-out Date: {formattedEndDate}</Typography>
                                        <Typography>Time: 9:00am - 9:00pm</Typography>
                                        <Typography>No. of days: {numberOfDays}</Typography>
                                        <Typography>Total Price: Rs. {totalPrice} /-</Typography>
                                    </div>
                                    <div className="mb-4">
                                        <Input
                                        label="Full Name"
                                        value={fullName}
                                        // onChange={handleFullNameChange}
                                        onChange={(e) => {
                                            handleFullNameChange(e);
                                            validateFullName();
                                        }}
                                        onBlur={validateFullName}
                                        className="w-full"
                                        />
                                        {errors.fullName && (
                                            <Typography className="text-red-500 text-sm mt-1">
                                            {errors.fullName}
                                            </Typography>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <Input
                                        label="Phone Number"
                                        value={phoneNumber}
                                        // onChange={handlePhoneNumberChange}
                                        onChange={(e) => {
                                            handlePhoneNumberChange(e);
                                            validatePhoneNumber(phoneNumber);
                                        }}
                                        onBlur={() => validatePhoneNumber(phoneNumber)}
                                        className="w-full"
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
                                        // onChange={handlePurposeChange}
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
                                    
                                    <Button className='lg:w-3/5 w-11/12 flex justify-center bg-green-700 m-auto' onClick={handleProceedToPayClick}>Proceed to Pay HOLDON</Button>
                                </div>
                            )
                        )}
                        <DialogFooter>
                            <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                                <span>Cancel</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </Card>
            </div>
            <ToastContainer className="custom-toast-container" />
            {/* <BottomNav /> */}
        </>
    );
}

export default NazrulTirtha;
