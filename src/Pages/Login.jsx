import React, { useState } from "react";
import Header from "../Components/Header";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import { Link, useNavigate } from "react-router-dom";
import getUserDetails from "../Utils/getUserDetails.js";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const validateValue = Object.values(data).every(el => el);

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

      const response = await api.post(ApiRoutes.login.path, data, {authenticate: ApiRoutes.login.authenticate});

      if(response.status === 200 && response.data.success){
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await getUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: ""
        })
        navigate("/home");
      }

    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }
  }

  return (
    <>
      <Header />
      <section className="container mx-auto w-full">
        <div className="bg-white my-4 max-w-lg mx-auto p-7">
          <p className="text-center font-bold text-lg mb-2">Welcome To BinkeyIt</p>
          <form className="grid gap-4 py-7" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
                placeholder="Enter Your Email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password:</label>
              <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  id="password"
                  value={data.password}
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
            <Link to={"/forgot-password"} className="block ml-auto hover:text-primary-200">Forgot Password ?</Link>
            <button className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`} disabled={!validateValue}>
              Login
            </button>
          </form>
          <p className="text-center my-1">
            Don't have account ? <Link to={"/register"} className="font-semibold text-green-700 hover:text-green-800">Register</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
