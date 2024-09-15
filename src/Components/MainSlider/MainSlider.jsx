import { useState } from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import slidePic1 from "./../../assets/images/grocery-banner.png";
import slidePic2 from "./../../assets/images/grocery-banner-2.jpeg";
import slidePic3 from "./../../assets/images/slider-image-1.jpeg";
import slidePic4 from "./../../assets/images/slider-image-2.jpeg";
import slidePic5 from "./../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row rounded-lg justify-center gap-5 items-center m-6">
        <div className="w-full lg:w-3/4 rounded-lg">
          <Slider {...settings}>
            <img
              loading="lazy"
              src={slidePic1}
              className="w-full h-[400px]"
              alt="slide1"
            />

            <img
              loading="lazy"
              src={slidePic2}
              className="w-full h-[400px]"
              alt="slide2"
            />

            <img
              loading="lazy"
              src={slidePic3}
              className="w-full h-[400px]"
              alt="slide3"
            />
          </Slider>
        </div>
        <div className="w-full lg:w-1/4 rounded-lg flex flex-col gap-4">
          <img
            loading="lazy"
            src={slidePic4}
            className="w-[95%] h-[200px] rounded-lg"
            alt="slide4"
          />

          <img
            loading="lazy"
            src={slidePic5}
            className="w-[95%] h-[200px] rounded-lg"
            alt="slide5"
          />
        </div>
      </div>
    </>
  );
}
