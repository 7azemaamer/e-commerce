import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);
  const [isSendCodeButtonDisabled, setIsSendCodeButtonDisabled] = useState(false);
  const navigate = useNavigate();


  const [email, setEmail] = useState('');


  async function checkemail() {
    setIsSendCodeButtonDisabled(true);


    setEmail(currentEmail);

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email: currentEmail } 
      );

      if (response.data.statusMsg === 'success') {
        toast.success(response.data.message);

        setTimeout(() => {
          setIsSendCodeButtonDisabled(false);
        }, 30000);
      } else {
        toast.error(response.data.message);
        setIsSendCodeButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error sending reset code:', error);
      toast.error('An error occurred while sending the reset code.');
      setIsSendCodeButtonDisabled(false);
    }
  }

  const handleResetPassword = async () => {
    try {
      const verifyResponse = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        { resetCode }
      );
      if (verifyResponse.data.status === 'Success') {
        const newPasswordResponse = await axios.put(
          'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
          { email, newPassword }
          );
        if (newPasswordResponse.data.token ) {
          toast.success('Password changed successfully!');
          navigate('/login');
        } else {
          toast.error("An error occured while changing passoword, send code again"); 
        }
      } else {
        toast.error("Can't reset your password");
      }
    } catch (error) {
      console.error('Error in try block:', error);
    
      if (error.response) {
        console.log('Error response from the server:', error.response.data);
      }
      toast.error(error.response.data.message);
    } 
  };

  useEffect(() => {
    setIsResetButtonDisabled(!(resetCode && newPassword));
  }, [resetCode, newPassword]);

  return (
    <>
      <h2>Reset Password</h2>
      <div className="row my-3 align-items-center">
        <div className="col-md-5">
          <div>
            <input
              className="form-control"
              type="email"
              value={currentEmail}
              placeholder="Current email"
              onChange={(e) => setCurrentEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-5">
          <div>
            <button
              className="btn w-100 bg-main text-white rounded-1 btn-sm"
              onClick={checkemail}
              disabled={isSendCodeButtonDisabled}
            >
              Send Code
            </button>
          </div>
        </div>
      </div>

      <div className="row my-3 align-items-center">
        <div className="col-md-5">
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Reset Code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-5">
          <div>
            <input
              className="form-control"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        id="resetBtn"
        className="btn bg-main text-white rounded-1 btn-sm"
        onClick={handleResetPassword}
        disabled={isResetButtonDisabled}
      >
        Reset Password
      </button>
    </>
  );
}
