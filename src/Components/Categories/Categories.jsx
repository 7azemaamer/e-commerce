import React from 'react';
import Style from  "./Categories.module.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Categories() {

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let {data , isLoading} = useQuery("categories" , getCategories);
  return <>

    {isLoading? <div className='d-flex h-100 py-5 w-100 justify-content-center align-items-center'>
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
      </div>:<>
      <div className="row py-4 gy-4">
          {data?.data.data.map((category)=><>
              <div className=' col-lg-3 col-md-4 col-6'>
                <Link to={`/category/${category.slug}`}>
                  <div className='category cursor-pointer'>
                    <img className='w-100' height={300} src={category.image} alt={category.name} />
                    <p className='text-center text-main p-3'>{category.name}</p>
                  </div>
                </Link>
              </div>
          </>)}
      </div>

      </>
      }
  </>
}
