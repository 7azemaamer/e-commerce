import React, { useContext, useState } from 'react';
import Style from  "./ProductDetails.module.css"
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BallTriangle } from  'react-loader-spinner';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductDetails() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let params=useParams();

  function getSpecificProduct(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let {addToCart} = useContext(CartContext);

  async function addProduct(productId){
    let response = await addToCart(productId);
    if(response.data.status === "success"){
      toast.success("Product added to cart");
    }
    else{
      toast.error("Failed to add product to the cart")
    }
  }

  let {data , isLoading , isFetching} = useQuery("specificProduct",() =>getSpecificProduct(params.id))
  return <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name='description' content={data?.data.data.description} />
        <title>{data?.data.data.title.split(" ").slice(0,2).join(" ")}</title>
      </Helmet>
   {isFetching? 
   <div className='d-flex h-100 py-5 w-100 justify-content-center align-items-center'>
   <BallTriangle
   height={100}
   width={100}
   radius={5}
   color="#4fa94d"
   ariaLabel="ball-triangle-loading"
   wrapperClass={{}}
   wrapperStyle=""
   visible={true}
 />
 </div>
  : <div className="row align-items-center">

  <div className="col-md-4">
    <Slider {...settings}>
      {data?.data.data.images.map((img)=>  <img height={500} className='w-100' src={img} alt="allImages" />)}
    </Slider>
  </div>
  <div className="col-md-8">

    <h2 className='h4 fw-bolder'>{data?.data.data.title}</h2>
    <div className='text-justify text-muted ps-2'>{data?.data.data.description}</div>
    <div className='my-2 fw-bolder'>{data?.data.data.category.name}</div>
    <div className='d-flex justify-content-between '>
      <span className='text-main fw-bolder'>Price: {data?.data.data.price}</span>
      <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsQuantity}</span>
    </div>
    <button onClick={()=> addProduct(data?.data.data.id)} className='btn btn-sm bg-main text-white w-100 mt-2'>Add to Cart</button>
  </div>

</div>}
  </>
}
