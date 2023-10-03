import React from 'react';
import Style from  "./PopUpModal.module.css"

export default function PopUpModal({ order, onHide }) {

  return (
    <div className="popup h-100 w-100 bg-main">
      <div className="popup-content position-fixed top-50 start-50 translate-middle p-5 bg-gray-order">
        <h3 className='fw-bold mb-4'>#{order.id}</h3>
        {order.cartItems.map((pr) => (
          <div className='row' key={pr._id}>
            <div className="col-md-6">
              <p className='fw-bold'>{pr.product.title}</p>
            </div>
            <div className="col-md-6">
              <p className='text-center'>Price: £{pr.price}</p>
            </div>
          </div>
        ))}
        <button className='btn btn-sm bg-main text-white' onClick={onHide}>Hide</button>
      </div>
    </div>
  );
}