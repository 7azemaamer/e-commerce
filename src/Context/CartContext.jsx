import axios from "axios";
import { createContext, react, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("loginToken"),
  };

  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  async function getCartItems() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        if(response?.data.status === "success"){
          setNumOfCartItems(response.data.numOfCartItems);
        }
      })
      .catch((error) => error);
  }
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  useEffect(() => {
    if(!isCartEmpty){
      getCartItems()
    }
  }, [isCartEmpty , numOfCartItems]);

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
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

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function removeCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }
  function cartPayment(id, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        { shippingAddress },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function updateProductItem(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateProductItem,
        numOfCartItems,
        setNumOfCartItems,
        clearCart,
        setIsCartEmpty,
        isCartEmpty,
        cartPayment
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
