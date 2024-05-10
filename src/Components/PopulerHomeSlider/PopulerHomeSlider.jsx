import React from "react"
import Style from "./PopulerHomeSlider.module.css"
import axios from "axios"
import { useQuery } from "react-query"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function PopulerHomeSlider() {
  function getPopularProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let { data, isError, isFetching } = useQuery(
    "popularProducts",
    getPopularProducts
  )

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }
  return (
    <div className="my-3">
      <h3 className="mb-3">Shop Popular Category</h3>
      <Slider {...settings}>
        {data?.data.data.map((category) => (
          <div className="shopPopulerCat" key={category._id}>
            <img
              className="w-100"
              height={250}
              src={category.image}
              alt={category.name}
            />
            <div className="mt-2 fw-bold text-center">{category.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
