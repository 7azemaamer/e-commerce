import React, { useContext, useState } from 'react';
import Style from  "./Login.module.css";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { UserToken } from '../../Context/UserToken';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
export default function Login() {

  let navigate = useNavigate();
  const [error , setError] = useState(null);
  const [loading , setLoading] = useState(false);
  let {setUserToken} =useContext(UserToken);

  function forgetPassword(){
    navigate("/resetpassword")
  }
  
  async function loginSubmit(values){
    setLoading(true)
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
    .catch((error) => {
      setError(error.response.data.message);
    setLoading(false);
   })
   if(data.message === "success"){
     setLoading(false);
     localStorage.setItem("loginToken" , data.token);
     setUserToken(data.token);
     navigate("/");
  }
  }
  let validationSchema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().matches(/^[a-zA-Z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and its length from 6 to 11 characters, including at least one uppercase letter").required("Password is required")
  })
  
  let formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema,
    onSubmit:loginSubmit,
  })
  return <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Login</title>
    </Helmet>
      <div className="w-75 mx-auto py-4">
        <h3 className='fw-bolder my-3'>Login Now</h3>
        {error? <div className="alert alert-danger mt-2 p-2">{error}</div>:""}
        <form onSubmit={formik.handleSubmit}>
          
        <label htmlFor="email">Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="form-control mb-3" id="email" name="email" type="email" />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:""}
 
          <label htmlFor="password">Passowrd</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="form-control mb-3" id="password" name="password" type="password" />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div>:""}

          <div className="row">
            <div className="col-md-6">
              <p onClick={forgetPassword} className=' ps-3 cursor-pointer text-muted fw-bold '>
                Forget my password? (write your email above)
              </p>
            </div>
            <div className="col-md-6">
              <Link to={"/register"}><p className='cursor-pointer text-end text-muted fw-bold'>Register now</p></Link>
            </div>
          </div>
          {!loading ?<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn form-btn">Submit</button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className={`btn form-btn ${Style.wider}`}><i className={`fas fa-spinner fa-spin`}></i></button>}
        </form>
      </div>
  </>
}
