import React, { useContext, useEffect, useState } from "react";
import {WishListContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function WishList() {
  let { getLoggedWishlist, rmvProduct,setCountWishlist } = useContext(WishListContext);

  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [haveWishlist, setHaveWishlist] = useState(false);

  async function getWishList() {
    let response = await getLoggedWishlist();
    if (response?.data?.status === "success") {
      setProducts(response?.data?.data);
      setIsLoading(false);
      if(response?.data?.count !== 0){
        setHaveWishlist(true);
      }
      else{
        setCountWishlist(response?.data?.count);
        localStorage.setItem("wishListCount" , response?.data?.count)
      }
    } else {
      setProducts(null);
      setIsLoading(false);
      setHaveWishlist(false);
    }
  }

  async function removeProduct(id) {
    let res = await rmvProduct(id);
    
    if (res?.data?.status === "success") {
      toast.success(res.data?.message);
      getWishList();
      if(res?.data?.data.length === 0 ){
        setHaveWishlist(false);
        setCountWishlist(res?.data?.data.length);
      }
    } else {
      toast.error("Sorry, we can't process your request now");
    }
  }

  useEffect(() => {
    getWishList();
  }, []);

  let { addToCart, setIsCartEmpty, setNumOfCartItems } = useContext(CartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product successfully added to cart");
      setIsCartEmpty(false);
      localStorage.setItem("isCartEmpty", false);
      setNumOfCartItems(response.data.numOfCartItems);
    } else {
      toast.error("Failed to add product to the cart");
      setIsCartEmpty(true);
    }
  }
  return (
    <div className="my-5">
      {isLoading ? (
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
        <div className="row gy-3">
          {haveWishlist ? (
            <>
              {products.map((product) => (
                <div key={product.id} className="position-relative productHolder col-md-2">
                  <button onClick={() => removeProduct(product.id)} className="btn btn-sm btn-danger btn-rmv position-absolute" >Remove</button>
                  <div className="product cursor-pointer py-3 px-2">
                    <Link to={`/product/${product.id}`}>
                      <img className="w-100" src={product.imageCover} alt={product.title}/>
                      <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                      <h3 className="h6">{product.title.split(" ").slice(0, 2).join(" ")} </h3>
                      <div className="d-flex justify-content-between mt-3">
                        <span>{product.price} EGP</span>
                        <span><i className="fas fa-star rating-color"></i>{" "}{product.ratingsAverage}</span>
                      </div>
                    </Link>
                    <button onClick={() => addProduct(product.id)} className="w-100 btn btn-sm bg-main text-white mt-2">{" "}Add to Cart</button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className=" p-5">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <i className="fa-solid fa-heart-crack text-main eno mb-4"></i>
                  <h3>
                    <strong>Your wishlist is Empty</strong>
                  </h3>
                  <h4>Add something to your WishList</h4>
                  <Link to={"/"} href="#" className="btn bg-main text-white cart-btn-transform m-3" data-abc="true">
                    continue shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
