import React from 'react';
import Style from  "./MainHomeSlider.module.css";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import cover1 from "../../Assets/images/grocery-banner.png";
import cover2 from "../../Assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainHomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          dots: false,
        }
      }
    ]
  };
  return <>
      <div className="mainSlider row gx-0 my-4">
        <div className="col-lg-10 col-md-8 col-6">
          <Slider {...settings}>
            <img height={500} className='w-100' src={slide1} alt="mainCover" />
            <img height={500} className='w-100' src={slide2} alt="mainCover" />
            <img height={500} className='w-100' src={slide3} alt="mainCover" />
          </Slider>
        </div>
        <div className="col-lg-2 col-md-4 col-6">
          <img height={250} className='w-100' src={cover1} alt="mainCover" />
          <img height={250} className='w-100' src={cover2} alt="mainCover" />
        </div>
      </div>
  </>
}
