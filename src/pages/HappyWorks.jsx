import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogFooter,
  } from "@material-tailwind/react";
import { NavbarWithMegaMenu } from '../components/Navbar';
import { Button, Option, Select } from '@material-tailwind/react';
import { Card, Typography } from "@material-tailwind/react";
import DateTimePickerANM from '../components/DateTimePicker';
import DateTimePickerCheckout from '../components/DateTimePickerCheckout';
import TimePickerCheckin from '../components/TimePickerCheckin';
import TimePickerCheckout from '../components/TimePickerCheckout';

const contentData = [{"hw_id":"1","title":"Happy Works","location":"Happy Works 1","rent":"600"},
{"hw_id":"2","title":"Happy Works","location":"Happy Works 2","rent":"600"},
{"hw_id":"3","title":"Happy Works","location":"Happy Works 3","rent":"600"},];

const generateHallInfo = (item) => {
    return `${item.location}`;
};

function HappyWorks() {
    const [selectedProperty, setSelectedProperty] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [price, setPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    // useEffect(() => {
    //     console.log("Price after update: ", totalPrice," & ", price);
    // }, [totalPrice, price]); 

    const handleCheckAvailability = () => {
        // Format the dates using dayjs
        const formattedStartDate = dayjs(checkInDate).format('YYYY/MM/DD');
        const formattedEndDate = dayjs(checkOutDate).format('YYYY/MM/DD');

        console.log("Property of HW: ", selectedProperty);
    
        // Prepare data to send to PHP script
        const data = {
            property: selectedProperty,
            date_from: formattedStartDate.toString(),
            date_to: formattedEndDate.toString(),
            check_in_time: checkInTime,
            check_out_time: checkOutTime
        };
    
        // Send HTTP POST request to PHP script
        fetch('https://meratravelbuddy.com/apis-prod/check_availability_test.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            // Update availability message based on response from PHP script
            setAvailabilityMessage(result.message);
            setOpen(true);
            // setShowPopover(true);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error if any
        });
    
        // Print the selected property and dates
        console.log("Selected Property:", selectedProperty);
        console.log("Start Date:", formattedStartDate);
        console.log("End Date:", formattedEndDate);
        console.log("Start Time:", checkInTime);
        console.log("End Time:", checkOutTime);
      };

    // Function to handle property selection
    const handlePropertySelect = (value) => {
        // setSelectedProperty(value);
        // Find the selected property in contentData and update price and deposit
        const selectedData = contentData.find(item => item.location === value);
        if (selectedData) {
            setSelectedProperty(selectedData.location);
;
            // setPrice(selectedData.rent);
            // setDeposit(selectedData.deposit);

        } else {
            setPrice('');
            setDeposit('');
        }
    };

    // Function to handle check-in date change
const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    updateTotalPrice(date, checkOutDate, checkInTime, checkOutTime); // Include checkInTime and checkOutTime
};

// Function to handle check-out date change
const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    updateTotalPrice(checkInDate, date, checkInTime, checkOutTime); // Include checkInTime and checkOutTime
};

// Function to handle check-in time change
const handleCheckInTimeChange = (time) => {
    setCheckInTime(time);
    updateTotalPrice(checkInDate, checkOutDate, time, checkOutTime); // Include checkInDate and checkOutDate
    console.log("Check-in T-ANM: ", time)
};

// Function to handle check-out time change
const handleCheckOutTimeChange = (time) => {
    setCheckOutTime(time);
    updateTotalPrice(checkInDate, checkOutDate, checkInTime, time); // Include checkInTime and checkOutDate
    console.log("Check-out T-ANM: ", time)
};

    // Function to update the total price based on check-in and check-out times
    // const updateTotalPrice = (checkInDate, checkOutDate, checkInTime, checkOutTime) => {
    //     if (checkInDate && checkOutDate && checkInTime && checkOutTime) {
    //         const startDate = dayjs(checkInDate + ' ' + checkInTime);
    //         const endDate = dayjs(checkOutDate + ' ' + checkOutTime);

    //         // Calculate the duration in hours
    //         const durationInHours = endDate.diff(startDate, 'hour');
    //         console.log("Duration in Hrs: ", durationInHours);

    //         // Calculate the total price
    //         const selectedData = contentData.find(item => item.location === selectedProperty);
    //         if (selectedData) {
    //             const pricePerHour = parseInt(selectedData.rent);
    //             console.log("Price/hr: ", pricePerHour)
    //             const totalPrice = pricePerHour * durationInHours;
    //             setTotalPrice(totalPrice);
    //         }
    //     }
    // };

    // Function to update the total price based on check-in and check-out times
const updateTotalPrice = (checkInDate, checkOutDate, checkInTime, checkOutTime) => {
    console.log("Check-in Date:", checkInDate);
    console.log("Check-out Date:", checkOutDate);
    console.log("Check-in Time:", checkInTime);
    console.log("Check-out Time:", checkOutTime);

    if (checkInDate && checkOutDate && checkInTime && checkOutTime) {
        const startDate = dayjs(checkInDate).add(dayjs(checkInTime).hour(), 'hour').add(dayjs(checkInTime).minute(), 'minute');
        const endDate = dayjs(checkOutDate).add(dayjs(checkOutTime).hour(), 'hour').add(dayjs(checkOutTime).minute(), 'minute');

        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);

        // Calculate the duration in hours
        const durationInHours = endDate.diff(startDate, 'hour');
        console.log("Duration in Hrs: ", durationInHours);

        // Calculate the total price
        const selectedData = contentData.find(item => item.location === selectedProperty);
        if (selectedData) {
            const pricePerHour = parseInt(selectedData.rent);
            console.log("Price/hr: ", pricePerHour)
            const totalPrice = pricePerHour * durationInHours;
            setTotalPrice(totalPrice);
        }
    }
};


    return (
        <>
            <NavbarWithMegaMenu />

            <div className='w-screen'>
                <Card className='grid justify-center mt-3' color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Happy Works
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Check availability & price then <br /> proceed to booking.
                    </Typography>
                    <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="flex flex-col gap-2">
                            <Select
                                // value={selectedProperty}
                                onChange={handlePropertySelect}
                                label="Select Property"
                                success
                            >
                                {contentData.map((item, index) => (
                                    <Option
                                        key={index}
                                        value={item.location}
                                    >
                                        {/* {"BBCC "} {item.hall_type} {"-"} ({item.hall_num}) */}
                                        {generateHallInfo(item)} {"(Conference Hall)"}
                                    </Option>
                                ))}
                            </Select>
                            <DateTimePickerANM onStartDateChange={handleCheckInDateChange} />
                            <DateTimePickerCheckout onEndDateChange={handleCheckOutDateChange} />
                            <div className='grid gap-2'>
                                <TimePickerCheckin onStartTimeChange={handleCheckInTimeChange} />
                                <TimePickerCheckout onEndTimeChange={handleCheckOutTimeChange} />
                            </div>
                        </div>
                    </div>
                    {/* Display price and deposit */}
                    {selectedProperty && (
                        <div className="flex flex-col gap-2 w-full justify-end">
                            <Typography className='w-full text-right' variant="h6">Price: Rs. {price} /- per day</Typography>
                            
                        </div>
                    )}

                    {/* Display total price */}
                    {totalPrice !== '' && (
                        <Typography className='-mt-6' variant="h6">Total Price: Rs. {totalPrice} /-</Typography>
                    )}

                    <div className='w-full mt-2'>
                        <Button className='w-full' onClick={handleCheckAvailability} >Check Availability</Button>
                    </div>

                    
      

                    <div>

                  
                        <Dialog
                            open={open}
                            handler={handleOpen}
                            animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                            }}
                        >

                            {availabilityMessage.includes("not available") ? <Typography className='text-center font-semibold text-red-500 mt-3'>{availabilityMessage}</Typography> : (
                                availabilityMessage.includes("available") ?
                                <> 
                                <div className='py-3'>
                                    <Typography className='text-center font-semibold text-green-600'>{selectedProperty} is available</Typography>
                                    <Typography className='text-center mb-5 font-semibold text-green-600'>for selected date & time.</Typography>
                                    <Button className='lg:w-3/5 w-11/12 flex justify-center bg-green-700 m-auto'>Proceed to Payment</Button> 
                                </div>
                                </> : (
                                    null
                                )
                            )}

            
                            <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            
                            </DialogFooter>
                        </Dialog>
                        
                        
                    </div>

                </Card>

            </div>
        </>
    );
}

export default HappyWorks;
