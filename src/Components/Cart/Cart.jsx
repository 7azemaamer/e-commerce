import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    removeCartItem,
    updateProductItem,
    clearCart,
    setNumOfCartItems,
    setIsCartEmpty,
    numOfCartItems,
    isCartEmpty
  } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);

  async function clearCartItems() {
    try {
      let response = await clearCart();
      let data = response?.data;
      if (data.message === "success") {
        toast.success("Cart items removed");
        setCartDetails(null);
        setNumOfCartItems(0);
        setDisableBtn(true);
        setIsCartEmpty(true);
        localStorage.setItem("isCartEmpty", true);
      } else {
        toast.error("Can't remove your cart items");
      }
    } catch {
      toast.error("Can't process your request now");
    }
  }

  async function getCartData() {
    let response = await getLoggedUserCart();
    if (response?.data?.status !== "success") {
      setDisableBtn(true);
      setLoading(false);
      setCartDetails(null);
    } else {
      setDisableBtn(false);
      let data = response?.data;
      if (data?.status === "success") {
        setCartDetails(data);
        setLoading(false);
      } else {
        setLoading(false);
        setCartDetails(null);
      }
    }
  }

  async function removeItem(id) {
    let response = await removeCartItem(id);

    let data = response?.data;

    if (data?.status === "success") {
      setCartDetails(data);
    } else {
      setCartDetails(null);
    }
  }

  async function updateCount(id, count) {
    let response = await updateProductItem(id, count);
    if (!response.statusMsg === "fail") {
      let data = response.data;
      if (data?.status === "success") {
        setCartDetails(data);
      } else {
        setCartDetails(null);
      }
    } 
  }
  useEffect(() => {
    if (!isCartEmpty) {
      getCartData();
    } else {
      setDisableBtn(true);
      setLoading(false);
    }
  }, [numOfCartItems, isCartEmpty , updateCount]);
  return (
    <>
      {loading ? (
        <div className="d-flex h-100 py-5 w-100 justify-content-center align-items-center">
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
      ) : (
        <div className="w-75 my-3 mx-auto p-3 bg-main-light rounded-3">
          <h3 className="fw-bolder">Shopping Cart</h3>
          {cartDetails === null ? (
            <>
              <div className="card-body cart p-5">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <i className="fa-solid fa-cart-shopping text-main trolley mb-4"></i>
                  <h3>
                    <strong>Your Cart is Empty</strong>
                  </h3>
                  <h4>Add something to make me happy :)</h4>
                  <Link
                    to={"/"}
                    href="#"
                    className="btn bg-main text-white cart-btn-transform m-3"
                    data-abc="true"
                  >
                    continue shopping
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <h4 className="h6 fw-bolder text-main">
                Cart items: {cartDetails.numOfCartItems}
              </h4>
              <h4 className="h6 fw-bolder text-main mb-4">
                Total Cart Price: {cartDetails.data.totalCartPrice}
              </h4>
              {cartDetails.data.products.map((product) => (
                <div key={product.product.id} className="row border-bottom p-2">
                  <div className="col-md-1">
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="h6">
                          {product.product.title
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")}
                        </h3>
                        <h6 className="text-main">Price: {product.price}EGP</h6>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            updateCount(product.product.id, product.count + 1)
                          }
                          className="btn btn-sm border-main px-2 "
                        >
                          <i className="fas fa-plus fa-1x"></i>
                        </button>
                        <span className="mx-2">{product.count}</span>
                        <button
                          onClick={() =>
                            updateCount(
                              product.product.id,
                              product.count !== 0
                                ? product.count - 1
                                : product.count
                            )
                          }
                          className="btn btn-sm border-main px-2 "
                        >
                          <i className="fas fa-minus  fa-1x"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(product.product.id)}
                      className="btn p-0 font-sm"
                    >
                      <i className="fas fa-trash font-sm text-danger"></i>{" "}
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="row justify-content-evenly">
            {disableBtn ? (
              ""
            ) : (
              <>
                <div className="col-md-5">
                  <button
                    onClick={clearCartItems}
                    className="btn btn-sm btn-danger py-2 text-white w-100 mt-4"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="col-md-5">
                  <Link to={`/checkout/${cartDetails.data._id}`}>
                    <button
                      className="btn btn-sm btn-hover py-2 bg-main text-white w-100 mt-4"
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
