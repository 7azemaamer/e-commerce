import React from 'react';
import Style from  "../NotFound/NotFound.module.css";
import errorSvg from "../../Assets/images/error.svg";

export default function NotFound() {
  return <div className='position-absolute start-50 translate-middle top-50 '>
    <img className='w-100' src={errorSvg} alt="error 404" />
  </div>
}
