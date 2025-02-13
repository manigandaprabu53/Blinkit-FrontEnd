import React, { useState } from "react";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: ""
  });

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
      const response = await api.put(ApiRoutes.forgot_password.path, data, {
        authenticate: ApiRoutes.forgot_password.authenticate,
      });

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        navigate("/verify-OTP", {state: {email: data}});
        setData({
          email: ""
        });
        
      }
    } catch (error) {
      toast.error(error.response.data.message) ||
        "Error Occured! Please Try Again";
    }
  };

  return (
    <>
      <Header />
      <section className="container mx-auto w-full">
        <div className="bg-white my-4 max-w-lg mx-auto p-7">
          <p className="text-center font-bold text-lg mb-2">Forgot Password</p>
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
            <button
              className={`${
                validateValue
                  ? "bg-green-700 hover:bg-green-800"
                  : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wider`}
              disabled={!validateValue}
            >
              Send OTP
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
  );
}

export default ForgotPassword;
