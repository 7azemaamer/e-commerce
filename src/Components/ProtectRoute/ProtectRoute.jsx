import React, { useContext } from 'react';
import Style from  "./ProtectRoute.module.css"
import { Navigate } from 'react-router-dom';
import { UserToken } from '../../Context/UserToken';

export default function ProtectRoute(props) {
  if(localStorage.getItem("loginToken") !== null){
    return props.children;
  }
  else{
    return <Navigate to={"/login"}/>
  }
}
