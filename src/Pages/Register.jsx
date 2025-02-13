import React, { useState } from "react";
import Header from "../Components/Header";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      if(data.password !== data.confirmPassword){
        toast.error("password and confirm password must be same");
        return
      }

      const response = await api.post(ApiRoutes.register.path, data, {authenticate: ApiRoutes.register.authenticate})

      if(response.status === 201 && response.data.success){
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        navigate("/login");
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
          <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                autoFocus
                className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
                placeholder="Enter Your Name"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>
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
            <button className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`} disabled={!validateValue}>
              Register
            </button>
          </form>
          <p className="text-center my-1">
            Already have account ? <Link to={"/login"} className="font-semibold text-green-700 hover:text-green-800">Login</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
