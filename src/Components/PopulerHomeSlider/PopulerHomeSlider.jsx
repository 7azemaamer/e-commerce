import React from 'react';
import Style from  "./PopulerHomeSlider.module.css"
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function PopulerHomeSlider() {

  function getPopularProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let {data , isError , isFetching} = useQuery("popularProducts", getPopularProducts);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoPlay:true
  };
  return <div className='my-3'>
      <h3 className='mb-3'>Shop Popular Category</h3>
      <Slider {...settings}>
        {data?.data.data.map((category )=><div key={category._id}>
          <img className='w-100' height={250} src={category.image} alt={category.name}/>
          <div className='mt-2 fw-bold text-center'>{category.name}</div>
        </div>
        )}
      </Slider>
  </div>
}
