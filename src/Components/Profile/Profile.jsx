import React, { useState } from 'react';
import Style from  "./Profile.module.css";
import jwtDecode from 'jwt-decode';
import userIcon from "../../Assets/images/userIcon.png";

export default function Profile() {

  const [profilePicture, setProfilePicture] = useState(userIcon);
  let encodedToken = localStorage.getItem("loginToken");
  let decodedToken = jwtDecode(encodedToken);


  return <div className='d-flex justify-content-center align-items-center'>
      <div className="col-md-4">
        <img className="w-100" src={profilePicture} alt="Profile" />

      </div>
      <div className="col-md-8">
      <h2 className='h4 fw-bold text-main'>Welcome {decodedToken.name}</h2>
      <p className='text-justify text-muted ps-2'>You are {decodedToken.role}</p>
      </div>
  </div>;

}
