import React from 'react';
import Style from  "./Footer.module.css";
import google from "../../Assets/images/paypartners/google.png";
import amazon from "../../Assets/images/paypartners/amazon.png";
import american from "../../Assets/images/paypartners/americanex.png";
import paypal from "../../Assets/images/paypartners/paypal.png";
import mastercard from "../../Assets/images/paypartners/mastercard.png";
import appStore from "../../Assets/images/paypartners/app store.png";

export default function Footer() {
  return <div className='bg-main-light py-4 '>
    <div className="container">
      <h3>Get the freshCart app</h3>
      <p className='text-muted'>We will send you a link, open it on your phone to download the app.</p>
      <div className="row border-sm align-items-center">
        <div className="col-md-9">
          <div className='ps-4'>
            <input className='form-control' name='email' placeholder='Email ..' type="email" />
          </div>
        </div>
        <div className="col-md-3">
        <div>
          <button className='w-100 btn btn-sm bg-main text-white py-1 rounded-1'>Share App Link</button>
        </div>
        </div>
      </div>
      <div className="row border-sm align-items-center my-3">
        <div className="col-md-2 text-center">
          <h3 className='h5'>Payment Partners</h3>
        </div>
        <div className="col-md-1">
          <img className='w-100' src={amazon} alt="amazon" />
        </div>
        <div className="col-md-1">
          <img className='w-100' src={american} alt="american express" />
        </div>
        <div className="col-md-1">
          <img className='w-100' src={paypal} alt="paypal" />
        </div>
        <div className="col-md-1">
          <img className='w-100' src={mastercard} alt="mastercard" />
        </div>
        <div className="col-md-4 text-end">
        <h3 className='h5'> Get deliveries with FreshCart</h3>
        </div>
        <div className="col-md-1">
          <img className='w-100' src={appStore} alt="app store" />
        </div>
        <div className="col-md-1">
          <img className='w-100' src={google} alt="google" />
        </div>
      </div>
    </div>
  </div>
}
