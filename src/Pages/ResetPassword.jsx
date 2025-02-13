import React, { useEffect } from 'react'
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import Header from '../Components/Header';
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateValue = Object.values(data).every((el) => el);

    const handleChange = (e) => {
        e.preventDefault();
    
        const { name, value } = e.target;
    
        setData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {

            if(data.newPassword !== data.confirmPassword){
                toast.error("New password and confirm password must be same");
                return
              }

            const response = await api.put(ApiRoutes.reset_password.path, data, {
                authenticate: ApiRoutes.reset_password.authenticate,
            });
        
            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message);
                navigate("/login");
                setData({
                email: "",
                newPassword: "",
                confirmPassword: ""
                });
            
            }
        } catch (error) {
          toast.error(error.response.data.message) ||
            "Error Occured! Please Try Again";
        }
      };

    useEffect(()=>{
        if(!(location.state?.data?.success)){
            navigate("/home");
        }

        if(location.state?.email){
            setData((prev)=>{
                return {
                    ...prev, 
                    email: location.state.email
                }
            })
        }
    }, [])
    
  return (
    <>
        <Header/>
        <section className="container mx-auto w-full">
        <div className="bg-white my-4 max-w-lg mx-auto p-7">
          <p className="text-center font-bold text-lg mb-2">Reset Password</p>
          <form className="grid gap-4 py-7" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="newPassword">New Password:</label>
                <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
                    <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    id="newPassword"
                    value={data.newPassword}
                    onChange={handleChange}
                    className="w-full h-full outline-none bg-blue-50"
                    />
    
                    <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer"
                    >
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </div>
                </div>
            </div>

            <div className="grid gap-1">
              <label htmlFor="confirmPassword">Confirm Password:</label>
                <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-full outline-none bg-blue-50"
                    />
    
                    <div
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="cursor-pointer"
                    >
                    {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </div>
                </div>
            </div>
            <button
              className={`${
                validateValue
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wider`}
              disabled={!validateValue}
            >
              Change Password
            </button>
          </form>
          <p className="text-center my-1">
            Go To
            <Link to={"/login"} className="font-semibold text-green-700 hover:text-green-800">
              <span> Login</span>
            </Link>
          </p>
        </div>
      </section>
    </>
    
  )
}

export default ResetPassword