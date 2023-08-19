// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function logindesign() {
//   const [image, setImage] = useState([]);

//   useEffect(() => {
//     fetch(
//       `https://api.unsplash.com//search/photos?client_id=_gHCUNCi6-v4iUce4nK7Smc3rKXx7dNh3fdOCiQ_zFU&query=${searchQuery}&orientation=landscape`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setImage(data);
//         console.log(data);
//       });
//   }, []);

//   const sliderSettings = {
//     autoplay: true,
//     autoplaySpeed: 2000,
//     speed: 1000,
//     prevArrow: null,
//     nextArrow: null,
//     dots: true,
//     infinite: true,
//     fade: true,
//     cssEase: "linear",
//     adaptiveHeight: true,
//     draggable: true,
//   };

//   return <div></div>;
// }
