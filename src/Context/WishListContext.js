import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();
export default function WishListProvider(props){
  const [countWishlist, setCountWishlist] = useState(0);

  let headers = {
      token: localStorage.getItem("loginToken"),
    };

  function addInWishes(productId) {
      return axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/wishlist`,
          {
            productId,
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            return getLoggedWishlist()
            .then((wishlistResponse) => {
              if (wishlistResponse?.data.status === "success") {
                setCountWishlist(wishlistResponse.data.count);
                localStorage.setItem("wishListCount", wishlistResponse.data.count);
              }
              return response;
            });
          }
          return response;
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error status code:", error.response.status);
            console.error("Error response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    }
  function getLoggedWishlist() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((response) => {
          if(response?.data.status === "success"){
            setCountWishlist(response?.data?.count);
            localStorage.setItem("wishListCount" , response?.data?.count)
          }
          return response;
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    }
  function rmvProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
        .then((response) => response)
        .catch((error) => {
          if (error.response) {
            console.error("Error response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error:", error.message);
          }
        });
    }

  return <WishListContext.Provider value={{addInWishes , getLoggedWishlist , rmvProduct , countWishlist , setCountWishlist }}>
    {props.children}
  </WishListContext.Provider>
}