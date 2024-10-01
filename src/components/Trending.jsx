import React from "react";
import Slider from "react-slick";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import bbcc from "../assets/bbcc.png";
import happyworks from "../assets/happy-works.jpg";
import dda from "../assets/dda.jpg";
import smartconnect from "../assets/smart-connect.jpg";
import ecourban from "../assets/eco-urban-village.jpg";
import snehodiya from "../assets/snehodiya-cover.jpg";
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

export default function Trending() {
  const settings = {
    dots: false,
    // infinite: true,
    // speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: false,
    // autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 640, // Tailwind's md breakpoint
        settings: {
          slidesToShow: 3,
        //   slidesToScroll: 1,
        //   autoplay: true,
        //   autoplaySpeed: 3000,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden mx-2 mb-16">
      <div className="">
            <h2 className='font-bold text-2xl py-2 mx-1 lg:mx-8'>Trending</h2>
        </div>
      <Slider className="mb-6 border-b-2" {...settings}>
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"bbcc/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-3 pb-4"
              >
                <img
                  src={bbcc}
                  className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
                  alt="Hidco logo"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="lg:ml-7">
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      BBCC
                    </Typography>
                    <div className="flex items-center gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"happy-works/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1 "
              >
                <img
                  src={happyworks}
                  className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
                  alt="snehodiya"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="lg:ml-7">
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      Happy Works
                    </Typography>
                    <div className="flex items-center gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"dhono-dhono/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1 "
              >
                <img
                  src={dda}
                  className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
                  alt="snehodiya"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="lg:ml-7">
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      Dhono Dhono Auditorium
                    </Typography>
                    <div className="flex items-center gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"smart-connect/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1 "
              >
                <img
                  src={smartconnect}
                  className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
                  alt="snehodiya"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="lg:ml-7">
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      Smart Connect
                    </Typography>
                    <div className="flex items-center gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"eco-urban-village/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1 "
              >
                <img
                  src={ecourban}
                  className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
                  alt="snehodiya"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="lg:ml-7">
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      Eco Urban Village
                    </Typography>
                    <div className="flex items-center gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"snehodiya/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1 "
              >
                <img
                  src={snehodiya}
                  className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
                  alt="snehodiya"
                />
                <div className="flex w-full flex-col gap-0.5">
                  <div className="lg:ml-7">
                    <Typography variant="h6" color="blue-gray" className="text-xs">
                      Snehodiya
                    </Typography>
                    <div className="flex items-center gap-0">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        </div>
        {/* Add more cards as needed */}
      </Slider>
    </div>
  );
}
