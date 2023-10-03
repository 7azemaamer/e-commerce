import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { UserToken } from '../../Context/UserToken';
import { Offline } from "react-detect-offline";
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Layout() {
  let {setUserToken} = useContext(UserToken);
  let {setIsCartEmpty} = useContext(CartContext);
  let {setCountWishlist} = useContext(WishListContext);

  useEffect(()=>{
    if(localStorage.getItem("loginToken")){
      setUserToken(localStorage.getItem("loginToken"));
    }
    if(localStorage.getItem("wishListCount") !== 0){
      setCountWishlist(localStorage.getItem("wishListCount"));
    }
    if (localStorage.getItem("isCartEmpty") === "true") {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }

    
  } , [])
  return <>
    <Navbar/>
      <div className="container min-height py-5 mt-3">
        <Outlet></Outlet>
      </div>
      <div>
        <Offline>
          <div className="network">
            <i className='fas fa-wifi'> You are offline!</i>
          </div>
        </Offline>
      </div>
    <Footer/>
  </>
}
