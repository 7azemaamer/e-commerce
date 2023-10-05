import React, { useContext, useState } from 'react';
import Style from  "./Products.module.css"
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from  'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
export default function Products() {
 
  function getproducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let {addInWishes} = useContext(WishListContext);

  async function addProductWishlist(productId){
    let res = await addInWishes(productId);
    if(res?.data?.status){
      toast.success(res?.data.message);
    }else
    {
      toast.error("Unfortunately, we can't process your request at this time");
    }
  }

  let {data , isError , isLoading , isFetching} = useQuery("products", getproducts);
  let {addToCart , setIsCartEmpty , setNumOfCartItems} = useContext(CartContext);

  async function addProduct(productId){
    let response = await addToCart(productId);
    if(response.data.status === "success"){
      toast.success("Product successfully added to cart");
      setIsCartEmpty(false);
      localStorage.setItem("isCartEmpty" ,false );
      setNumOfCartItems(response.data.numOfCartItems);

    }
    else{
      toast.error("Failed to add product to the cart");
      setIsCartEmpty(true);
    }
  }
  return <div className='my-5'>

  {isLoading? <div className='d-flex h-100 py-5 w-100 justify-content-center align-items-center'>
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
  </div>:<div className="row gy-3">
    {data?.data.data.map((product)=> <div key={product.id} className=' productHolder position-relative col-lg-2 col-md-4 col-5'>
      <button onClick={() => addProductWishlist(product.id)} className='btn btn-sm p-0'><i className="wishlist fa-solid fa-heart fa-2x position-absolute mt-4 m-3"></i></button>
     <div className="product cursor-pointer py-3 px-2">
     <Link to={`/product/${product.id}`}>
        <img className='w-100' src={product.imageCover} alt={product.title} />
        <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
        <h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='d-flex justify-content-between mt-3'>
          <span>{product.price} EGP</span>
          <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
        </div>
     
     </Link>
        <button onClick={() => addProduct(product.id)} className='w-100 btn btn-sm bg-main text-white mt-2'> Add to Cart</button>
      </div>
    </div>)}
  </div>}
    
  </div>
}
