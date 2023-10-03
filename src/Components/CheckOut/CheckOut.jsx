import React, { useContext, useState } from 'react';
import Style from  "./CheckOut.module.css";
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
  
  const [loading, setLoading] = useState(true);
  let {cartPayment , setIsCartEmpty , isCartEmpty} = useContext(CartContext);
  let {id} = useParams();

  async function onSubmit(values){
    let response = await cartPayment(id , values);

    if(response?.data.status === "success"){
      setLoading(false);
      window.location.href = response.data.session.url;
      setIsCartEmpty(true);
      localStorage.setItem("isCartEmpty", true);
    }
  }
  
  let validationSchema = yup.object({
    city: yup.string().required("Email is required"),
    details:yup.string().required("Details are required"),
    phone: yup.string().matches(/^(?:\+20|0)(?:1[0125]|2[0-9]|9[0-2])[0-9]{8}$/, "It must be an Egyptian number").required("Phone is required")
  })


  let formik =  useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: ""
      },
      onSubmit,
      validationSchema,
  });

  return <div className='mt-5 w-75 mx-auto' >
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="phone">Phone</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="form-control mb-3" id="phone" name="phone" type="tel" />
      {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:""}

      <label htmlFor="city">City</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className="form-control mb-3" id="city" name="city" type="tel" />
      {formik.errors.city && formik.touched.city? <div className="alert alert-danger mt-2 p-2">{formik.errors.city}</div>:""}

      <label htmlFor="details">Details</label>
      <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className="form-control mb-3" id="details" name="details" type="text" />
      {formik.errors.details && formik.touched.details? <div className="alert alert-danger mt-2 p-2">{formik.errors.details}</div>:""}

      {loading ?<button disabled={!(formik.isValid && formik.dirty)} type="submit" className='bg-main text-white btn btn-sm px-4 py-2 fw-bold rounded-3 '>Pay now</button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className={`btn fw-bold form-btn ${Style.wider}`}><i className={`fas fa-spinner fa-spin`}></i> Wait..</button>}

  </form>
  </div>
}
