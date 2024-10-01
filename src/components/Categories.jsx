// File path: /src/components/CategoriesSlider.jsx

import React from "react";
import Slider from "react-slick";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import bbcc from "../assets/bbcc.png";
import audi from "../assets/icons/auditorium.png";
import accomodation from "../assets/icons/accomodation.png";
import banquet from "../assets/icons/banquet.png";
import confernce from "../assets/icons/conference.png";
import lawn from "../assets/icons/lawn.png";
import ground from "../assets/icons/ground.png";
import openTheatre from "../assets/icons/open-theatre.png";
import museum from "../assets/icons/museum-space.png";
import diningHall from "../assets/icons/dining-hall.png";
import artGallery from "../assets/icons/art-gallery.png";
import { Link } from "react-router-dom";

const categories = [
  { name: "Auditoriums", img: audi },
  { name: "Accommodations", img: accomodation },
  { name: "Banquets", img: banquet },
  { name: "Conference", img: confernce },
  { name: "Lawns", img: lawn },
  { name: "Grounds", img: ground },
  { name: "Open Theatre", img: openTheatre },
  { name: "Museum Space", img: museum },
  { name: "Dining Hall", img: diningHall },
  { name: "Art Gallery", img: artGallery },
];

export default function Categories() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 10,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 640, // Small screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden px-2 bg-gray-50">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="px-1">
            <Card color="transparent" shadow={false} className="w-full mx-auto">
              <Link to={category.name}>
                  <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 grid items-center gap-2 pt-0 pb-1 !rounded-md hover:bg-cyan-700  py-1"
                  >
                    <img
                      src={`${category.img}`} // Ensure these images exist in the public/assets folder
                      className="h-12 w-12 object-cover flex mx-auto"
                      alt={category.name}
                    />
                    <div className="flex w-full flex-col gap-0.5">
                      <div className="items-center justify-between">
                        <Typography variant="h6" color="blue-gray" className="text-xs text-center ">
                          {category.name}
                        </Typography>
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
