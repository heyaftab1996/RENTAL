import React  ,{ useEffect, useState }  from "react";
import Slider from "react-slick";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import axios from 'axios';

import { Link } from "react-router-dom";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AudiCard() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640, // Tailwind's md breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3000/api/rental-property')
      .then((response) => {
        setProperties(response.data); // Set API response data
      })
      .catch((error) => {
        console.error('Error fetching the featured rental properties:', error);
      });
  }, []);

  return (
    <div className="overflow-hidden mx-2">
      <div className="">
            <h2 className='font-bold text-2xl py-2 mx-1 lg:mx-8'>All Rentals</h2>
        </div>
      <Slider className="mb-6 border-b-2" {...settings}>
      {properties.map((property, index) => (

        <div className="px-1">
        <Card color="transparent" shadow={false} className="w-full mx-auto">
          <Link  to={`/property/${property.id}`}>
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 grid items-center gap-2 pb-1"
            >
              <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
              <img
          src={`http://localhost:3000/uploads/${
            property.images && property.images.length > 0
              ? property.images[0].file_name
              : 'noimage.jpg'
          }`}
          className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
          alt={property.rental_property_name || 'No Image'}
        />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <Link
                   to={`/property/${property.id}`}
                    className="bg-orange-red text-white px-4 py-2 rounded shadow-lg"
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="flex w-full flex-col gap-0.5">
                <div className="lg:ml-7">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-xs"
                  >
                  {property.rental_property_name}
                  </Typography>
                  <div className="flex items-center gap-0">
                    {/* <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon /> */}
                    {[...Array(parseInt(property.rating)).keys()].map((star) => (
                      <StarIcon key={star} />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Link>
        </Card>
        </div>
      ))}
      </Slider>
    </div>
  );
}
