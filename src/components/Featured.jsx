// import React from "react";
// import Slider from "react-slick";
// import { Card, CardHeader, Typography } from "@material-tailwind/react";
// import bbcc from "../assets/bbcc.png";
// import happyworks from "../assets/happy-works.jpg";
// import dda from "../assets/dda.jpg";
// import nt from "../assets/nt-cover.jpg";
// import smartconnect from "../assets/smart-connect.jpg";
// import ecourban from "../assets/eco-urban-village.jpg";
// import snehodiya from "../assets/snehodiya-cover.jpg";
// import { Link } from "react-router-dom";

// function StarIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className="h-3 w-3 text-yellow-700"
//     >
//       <path
//         fillRule="evenodd"
//         d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }

// export default function Featured() {
//   const settings = {
//     dots: false,
//     // infinite: true,
//     // speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 2,
//     autoplay: false,
//     // autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 640, // Tailwind's md breakpoint
//         settings: {
//           slidesToShow: 3,
//         //   slidesToScroll: 1,
//         //   autoplay: true,
//         //   autoplaySpeed: 3000,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="overflow-hidden mx-2">
//       <div className="border-t-2 mt-2">
//             <h2 className='font-bold text-2xl py-2 mx-1 lg:mx-8'>Featured</h2>
//         </div>
//       <Slider className="mb-6 border-b-2" {...settings}>
//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"bbcc/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-3 pb-4"
//               >
//                 <img
//                   src={bbcc}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="Hidco logo"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs -mt-1">
//                       Biswa Bangla Convention Center
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>

//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"nazrul-tirtha/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-3 pb-4"
//               >
//                 <img
//                   src={nt}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="Hidco logo"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs -mt-1">
//                       Nazrul Tirtha
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>

//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"happy-works/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-2 pb-1 "
//               >
//                 <img
//                   src={happyworks}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="snehodiya"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs">
//                       Happy Works
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"dhono-dhono/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-2 pb-1 "
//               >
//                 <img
//                   src={dda}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="snehodiya"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs">
//                       Dhono Dhono Auditorium
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"smart-connect/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-2 pb-1 "
//               >
//                 <img
//                   src={smartconnect}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="snehodiya"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs">
//                       Smart Connect
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"eco-urban-village/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-2 pb-1 "
//               >
//                 <img
//                   src={ecourban}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="snehodiya"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs">
//                       Eco Urban Village
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//         <div className="px-1">
//           <Card color="transparent" shadow={false} className="w-full mx-auto">
//             <Link to={"snehodiya/book-now"}>
//               <CardHeader
//                 color="transparent"
//                 floated={false}
//                 shadow={false}
//                 className="mx-0 grid items-center gap-2 pb-1 "
//               >
//                 <img
//                   src={snehodiya}
//                   className="h-24 lg:h-24 lg:w-36 w-full object-cover rounded-xl flex mx-auto"
//                   alt="snehodiya"
//                 />
//                 <div className="flex w-full flex-col gap-0.5">
//                   <div className="lg:ml-7">
//                     <Typography variant="h6" color="blue-gray" className="text-xs">
//                       Snehodiya
//                     </Typography>
//                     <div className="flex items-center gap-0">
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                       <StarIcon />
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//             </Link>
//           </Card>
//         </div>
//         {/* Add more cards as needed */}
//       </Slider>
//     </div>
//   );
// }
import React from "react";
import Slider from "react-slick";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import bbcc from "../assets/bbcc.png";
import happyworks from "../assets/happy-works.jpg";
import dda from "../assets/dda.jpg";
import nt from "../assets/nt-cover.jpg";
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

export default function Featured() {
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
    // <div className="overflow-hidden mx-2">
    //   <div className="border-t-2 mt-2">
    //     <h2 className="font-bold text-2xl py-2 mx-1 lg:mx-8">Featured</h2>
    //   </div>
    //   <Slider className="mb-6 border-b-2" {...settings}>
    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"bbcc/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-3 pb-4"
    //           >
    //             <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={bbcc}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs -mt-1"
    //                 >
    //                   Biswa Bangla Convention Center
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>

    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"nazrul-tirtha/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-3 pb-4"
    //           >
    //             <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={nt}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs -mt-1"
    //                 >
    //                   Nazrul Tirtha
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>

    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"happy-works/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-2 pb-1 "
    //           >
    //              <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={happyworks}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs"
    //                 >
    //                   Happy Works
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>
    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"dhono-dhono/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-2 pb-1 "
    //           >
    //              <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={dda}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs"
    //                 >
    //                   Dhono Dhono Auditorium
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>
    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"smart-connect/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-2 pb-1 "
    //           >
    //             <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={smartconnect}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs"
    //                 >
    //                   Smart Connect
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>
    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"eco-urban-village/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-2 pb-1 "
    //           >
    //             <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={ecourban}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs"
    //                 >
    //                   Eco Urban Village
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>
    //     <div className="px-1">
    //       <Card color="transparent" shadow={false} className="w-full mx-auto">
    //         <Link to={"snehodiya/book-now"}>
    //           <CardHeader
    //             color="transparent"
    //             floated={false}
    //             shadow={false}
    //             className="mx-0 grid items-center gap-2 pb-1 "
    //           >
    //             <div className="overflow-hidden rounded-xl flex mx-auto h-80 lg:h-80 lg:w-50 w-full">
    //               <img
    //                 src={snehodiya}
    //                 className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
    //                 alt="Hidco logo"
    //               />
    //             </div>

    //             <div className="flex w-full flex-col gap-0.5">
    //               <div className="lg:ml-7">
    //                 <Typography
    //                   variant="h6"
    //                   color="blue-gray"
    //                   className="text-xs"
    //                 >
    //                   Snehodiya
    //                 </Typography>
    //                 <div className="flex items-center gap-0">
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                   <StarIcon />
    //                 </div>
    //               </div>
    //             </div>
    //           </CardHeader>
    //         </Link>
    //       </Card>
    //     </div>
    //     {/* Add more cards as needed */}
    //   </Slider>
    // </div>



    <div className="overflow-hidden mx-2">
      <div className="border-t-2 mt-2">
        <h2 className="font-bold text-2xl py-2 mx-1 lg:mx-8">Featured</h2>
      </div>
      <Slider className="mb-6 border-b-2" {...settings}>
        {/* Carousel Item 1 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"bbcc/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-3 pb-4"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={bbcc}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Biswa Bangla Convention Center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"bbcc/book-now"}
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
                      className="text-xs -mt-1"
                    >
                      Biswa Bangla Convention Center
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

        {/* Carousel Item 2 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"nazrul-tirtha/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-3 pb-4"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={nt}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Nazrul Tirtha"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"nazrul-tirtha/book-now"}
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
                      className="text-xs -mt-1"
                    >
                      Nazrul Tirtha
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

        {/* Carousel Item 3 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"happy-works/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={happyworks}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Happy Works"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"happy-works/book-now"}
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

        {/* Carousel Item 4 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"dhono-dhono/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={dda}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Dhono Dhono Auditorium"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"dhono-dhono/book-now"}
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

        {/* Carousel Item 5 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"smart-connect/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={smartconnect}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Smart Connect"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"smart-connect/book-now"}
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

        {/* Carousel Item 6 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"eco-urban/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={ecourban}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Eco Urban"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"eco-urban/book-now"}
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
                      Eco Urban
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

        {/* Carousel Item 7 */}
        <div className="px-1">
          <Card color="transparent" shadow={false} className="w-full mx-auto">
            <Link to={"snehodiya/book-now"}>
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 grid items-center gap-2 pb-1"
              >
                <div className="relative flex mx-auto w-full h-80 overflow-hidden rounded-xl">
                  <img
                    src={snehodiya}
                    className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-110"
                    alt="Snehodiya"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <Link
                      to={"snehodiya/book-now"}
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
      </Slider>
    </div>
  );
}
