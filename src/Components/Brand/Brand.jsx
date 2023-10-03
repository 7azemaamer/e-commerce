import React, { useState } from 'react';
import Style from "./Brand.module.css"
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function Brand() {
  let { id } = useParams();

  async function getSpecificBrand(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

  let { data , isLoading } = useQuery("getBrand", () => getSpecificBrand(id));
  
  return <>
  {isLoading ? <div className="d-flex h-100 py-5 w-100 justify-content-center align-items-center">
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
    </div> :<>
    <div className='bg-light-sm p-5 row align-items-center mt-5 rounded-3 '>
      <div className="col-md-4 text-center">
        <img className='w-100' src={data?.data.data.image} alt={data?.data.data.name} />
      </div>
      <div className="col-md-8">
        <h3 className='h4 fw-bold'>{data?.data.data.name}</h3>
      </div>
    </div>
    </>}
  </>
  
}
