import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/rental-category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
        {categories.map((category) => (
          <div key={category.id} className="px-1">
            <Card color="transparent" shadow={false} className="w-full mx-auto">
              <Link to={category.rental_category_name}>
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="mx-0 grid items-center gap-2 pt-0 pb-1 !rounded-md hover:bg-cyan-700 py-1"
                >
                  <img
                    src={`http://localhost:3000/uploads/${category.images[0]?.file_name}`} // Construct image URL
                    className="h-12 w-12 object-cover flex mx-auto"
                    alt={category.rental_category_name}
                  />
                  <div className="flex w-full flex-col gap-0.5">
                    <div className="items-center justify-between">
                      <Typography variant="h6" color="blue-gray" className="text-xs text-center">
                        {category.rental_category_name}
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
