import React, { useState } from 'react';
import Style from  "./Brands.module.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {

  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let {data , isLoading} = useQuery("allBrands", getAllBrands);

  return (
    <>
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
        <>
          <div className="row py-4 gy-4">
            {data?.data.data.map((brand) => (
              <div className="col-md-3" key={brand._id}>
                <Link to={`/brand/${brand._id}`}>
                  <div className="category cursor-pointer">
                    <img
                      className="w-100"
                      src={brand.image}
                      alt={brand.name}
                    />
                    <p className="text-main p-3">{brand.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
