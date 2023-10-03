import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserToken } from "../../Context/UserToken";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Navbar() {
  let navigate = useNavigate()
  let {userToken , setUserToken} =useContext(UserToken);
  let { numOfCartItems , setNumOfCartItems,  getLoggedUserCart , isCartEmpty , setIsCartEmpty} = useContext(CartContext);
  let {countWishlist , getLoggedWishlist , setCountWishlist} = useContext(WishListContext);

  useEffect(() => {
    getLoggedWishlist()
      .then((response) => {
        if (response?.data.status === "success") {
          setCountWishlist(response?.data?.count);
          localStorage.setItem("wishListCount", response?.data?.count);
        }
      })
      .catch((error) => console.error("Error fetching wishlist count:", error));
  
    if (!isCartEmpty) {
      getLoggedUserCart()
        .then((response) => {
          if (response.data?.status === "success") {
            setNumOfCartItems(response.data?.count);
            localStorage.setItem("wishListCount", response.data?.count);
          }
        })
        .catch((error) => console.error("Error fetching cart count:", error));
    }
  }, [isCartEmpty ]);
  
  function logOut(){
    localStorage.removeItem("loginToken");
    setUserToken(null);
    localStorage.removeItem("isCartEmpty");
    navigate("login");
  }
  return <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="FreshCart" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"products"}>
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/categories"}>
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/brands"}>
                  Brands
                </NavLink>
              </li>
            </ul>: ""}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link">
                  <a target="_blank" href="https://www.facebook.com/7azemaamer">
                    <i className="fab fa-instagram mx-1"></i>
                  </a>
                  <a target="_blank" href="https://www.facebook.com/7azemaamer">
                    <i className="fab fa-facebook mx-1"></i>
                  </a>
                  <a target="_blank" href="https://www.facebook.com/7azemaamer">
                    <i className="fab fa-tiktok mx-1"></i>
                  </a>
                  <a target="_blank" href="https://www.facebook.com/7azemaamer">
                    <i className="fab fa-twitter mx-1"></i>
                  </a>
                  <a target="_blank" href="https://www.facebook.com/7azemaamer">
                    <i className="fab fa-linkedin mx-1"></i>
                  </a>
                  <a target="_blank" href="https://www.facebook.com/7azemaamer">
                    <i className="fab fa-youtube mx-1"></i>
                  </a>
                </div>
              </li>
              {userToken?<>
                <li className="nav-item">
                <span onClick={()=>logOut()} className="nav-link cursor-pointer">
                  Logout
                </span>
              </li>
              <li className="nav-item d-flex align-items-center mx-2">
                <Link to={'profile'}><i className="fa-solid fa-user fs-6"></i></Link>
              </li>
              <li className="nav-item d-flex align-items-center mx-2">
                <Link className="position-relative" to={"/cart"}>
                  <i className="fa-solid mx-2 fs-4 pt-1 fa-cart-shopping text-main"></i>
                  {numOfCartItems!==0 ? <div className="bg-danger font-sm-2 text-white position-absolute top-50 start-50 translate-middle-x rounded-circle px-1">{numOfCartItems}</div> :""}
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center position-relative">
                <Link to={'wishlist'}>
                  <i className="fa-solid fs-3 fa-heart mt-1 mx-3 text-main"></i>
                  {Number(countWishlist)!==0 ? <div className="bg-danger font-sm-2 text-white position-absolute top-50 start-50 translate-middle-x rounded-circle px-1">{countWishlist}</div> :""}
                </Link>
              </li>
              </>:<>
              <li className="nav-item">
                <Link className="nav-Link" to={"login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link" to={"register"}>
                  Register
                </Link>
              </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
}
