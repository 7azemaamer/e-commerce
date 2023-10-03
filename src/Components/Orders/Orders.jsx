import React, { useState } from 'react';
import Style from "./Orders.module.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { BallTriangle } from 'react-loader-spinner';
import PopUpModal from '../PopUpModal/PopUpModal';

export default function Orders() {
  let userToken = localStorage.getItem("loginToken");
  let decodedToken = jwtDecode(userToken);
  let userId = decodedToken.id;
  const [selectedOrder, setSelectedOrder] = useState(null);

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  async function getAllOrders(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }
  let {data ,isLoading} = useQuery("getOrders", getAllOrders);
  console.log(data?.data);

  const showProducts = (order) => {
    setSelectedOrder(order);
  };

  const hideProducts = () => {
    setSelectedOrder(null);
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      {isLoading?<div className='d-flex h-100 py-5 w-100 justify-content-center align-items-center'>
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
  </div>:<div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        {data?.data.map((order, index) => (
          <div className="col-lg-8 col-xl-6 mt-4" key={order.id}>
            <h2 className='h4 fw-bold'>Order {index +1}</h2>
            <div className="card border-top border-bottom border-3" style={{ borderColor: "#0aad0a" }}>
              <div className="card-body p-5">
                <p className="lead fw-bold mb-5 text-main">Purchase Receipt</p>
                <div className="row">
                  <div className="col mb-3">
                    <p className="small text-muted mb-1">Date</p>
                    <p>{new Date(order.paidAt).toLocaleDateString('en-US', options)}</p>
                  </div>
                  <div className="col mb-3">
                    <p className="small text-muted mb-1">Order No.</p>
                    <p>{order.id}</p>
                  </div>
                </div>
                <div className="mx-n5 px-5 py-4 " style={{ backgroundColor: "#f2f2f2" }}>
                  <div className='row' >
                    <div className="col-md-8 col-lg-9">
                      <p className='fw-bold'>Order Price</p>
                    </div>
                    <div className="col-md-4 col-lg-3">
                      <p>£{order.totalOrderPrice}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 col-lg-9">
                      <p className="mb-0 fw-bold">Shipping</p>
                    </div>
                    <div className="col-md-4 col-lg-3">
                      <p className="mb-0">£{order.shippingPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                    <p className="lead fw-bold mb-0 text-main">£{order.totalOrderPrice}</p>
                  </div>
                  <div className="col-md-4">
                   <button onClick={() => showProducts(order)} className="btn text-decoration-underline fw-bold mb-0 text-main">Show products</button>
                  </div>
                </div>
                <p className="mt-4 pt-2 mb-0">Want any help? <a href="#!" className='text-main'>Please contact us</a></p>
              </div>
            </div>
          </div>
        ))}
        </div>
  

      </div>}
      {/* Step 4: Render the PopUpModal component */}
      {selectedOrder && (
        <PopUpModal order={selectedOrder} onHide={hideProducts} />
      )}
    </section>
  );
}
