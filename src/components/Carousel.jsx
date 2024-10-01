import { Button, Carousel, IconButton, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import bbcc from "../assets/bbcc.png";
import snehodiya from "../assets/snehodiya-cover.jpg";
import nazrulTirtha from "../assets/nt-cover.jpg";
import { Select, Option } from "@material-tailwind/react";
import DateTimePickerANM from "./DateTimePicker";
import { useState } from "react";
import DateTimePickerCheckout from "./DateTimePickerCheckout";
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

 
export function CarouselDefault() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [showPopover, setShowPopover] = useState(false);

  const handleCheckAvailability = () => {
    // Format the dates using dayjs
    const formattedStartDate = dayjs(startDate).format('YYYY/MM/DD');
    const formattedEndDate = dayjs(endDate).format('YYYY/MM/DD');

    // Prepare data to send to PHP script
    const data = {
        property: selectedProperty,
        date_from: formattedStartDate.toString(),
        date_to: formattedEndDate.toString(),
        // check_in_time: "9:00AM",
        // check_out_time: "9:00PM"
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

        setShowPopover(true);
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error if any
    });

    // Print the selected property and dates
    console.log("Selected Property:", selectedProperty);
    console.log("Start Date:", formattedStartDate);
    console.log("End Date:", formattedEndDate);
  };

  const handleChangeProperty = (e) => {
    // Extract the selected value from the event object
    const selectedValue = e.target.value;
    // Log the selected value
    console.log("Selected Property:", selectedValue);
    // Update the selected property state
    setSelectedProperty(selectedValue);
};

  return (
    <>
    <div className="relative">
    {/* Popover to display availability message */}
    <div className="flex justify-center">
        <Popover animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }} placement="top" open={showPopover} onClickOutside={() => setShowPopover(false)}>
        {/* <Popover.Button hidden></Popover.Button> */}
            <PopoverContent>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <p>{availabilityMessage || "Not available"}</p>
                    <Link to={"bbcc/book-now"}>
                    <Button>Proceed to Booking</Button>
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    </div>
    <Carousel
      className=""
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
        
      <div className="relative">
        <div className="absolute top-5 w-screen justify-center">
            <div className="grid justify-center w-1/2 m-auto py-10 bg-opacity-80 bg-white rounded-md">
                <div className="flex gap-2 items-center mb-2">
                    <h2>Select property:</h2>
                    <div>
                <Select value={selectedProperty} onChange={(value) => {
                            if (!selectedProperty) {
                                setSelectedProperty(value);
                                console.log("Propertyyyyy", selectedProperty);
                            } else {
                                
                            }
                        }} label="Select Property" success>
                  <Option value="BBCC Main Convention Hall (Hall - 01)" onChange={() => setSelectedProperty('BBCC Main Convention Hall (Hall - 01)')}>BBCC Main Convention Hall (Hall - 01)</Option>
                  <Option value="Material Tailwind React" onChange={() => setSelectedProperty('Material Tailwind React')}>Material Tailwind React</Option>
                  <Option value="Material Tailwind Vue" onChange={() => setSelectedProperty('Material Tailwind Vue')}>Material Tailwind Vue</Option>
                  <Option value="Material Tailwind Angular" onChange={() => setSelectedProperty('Material Tailwind Angular')}>Material Tailwind Angular</Option>
                  <Option value="Material Tailwind Svelte" onChange={() => setSelectedProperty('Material Tailwind Svelte')}>Material Tailwind Svelte</Option>
                </Select>
                    </div>
                </div>
                <DateTimePickerANM onStartDateChange={(value) => setStartDate(value)} />
                <div className="mt-2"></div>
                <DateTimePickerCheckout onEndDateChange={(value) => setEndDate(value)} />
                <Button className="mt-2" color="green" onClick={handleCheckAvailability}>Check Availability</Button>
            </div>
        </div>
        <img
            src={bbcc}
            alt="image 1"
            className="h-screen w-screen object-top object-cover"
        />
      </div>
      <img
        src={snehodiya}
        alt="image 2"
        className="h-screen w-screen object-top object-cover"
      />
      <div>
        <img
            src={nazrulTirtha}
            alt="image 3"
            className="h-screen w-screen object-top object-cover"
        />
      </div>
      <div className="relative">
                {/* Check availability form */}
                {/* Your check availability form JSX code goes here */}

                {/* Display availability message */}
                <p>{availabilityMessage || "Not available"}</p>
                
            
            </div>
    </Carousel>
        

    {/* <Popover
         animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button>Popover</Button>
        </PopoverHandler>
        <PopoverContent>
        <p>{availabilityMessage || "Not available"}</p>
        </PopoverContent>
      </Popover> */}
    </div>
    </>
  );
}
