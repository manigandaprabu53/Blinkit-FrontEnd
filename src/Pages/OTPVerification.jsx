import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import toast from "react-hot-toast";
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import { Link, useLocation, useNavigate } from "react-router-dom";

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef([]);
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const validateValue = data.every((el) => el);

  console.log("Location: ", location);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiData = {otp: data.join(""), email: location?.state?.email.email}

      const response = await api.put(ApiRoutes.verify_OTP.path, apiData, {authenticate: ApiRoutes.verify_OTP.authenticate});

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {state: {data: response.data, email: location?.state?.email.email}});
      }
    } catch (error) {
      toast.error(error.response?.data?.message) || "Error Occured! Please Try Again";
      console.log(error)
    }
  };

  useEffect(()=>{
    if(!location?.state?.email){
      navigate("/forgot-password");
    }
  }, [])

  return (
    <>
      <Header />
      <section className="container mx-auto w-full">
        <div className="bg-white my-4 max-w-lg mx-auto p-7">
          <p className="text-center font-bold text-lg mb-2">Verify OTP</p>
          <form className="grid gap-4 py-7" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="otp">Enter OTP:</label>
              <div className="flex items-center gap-2 justify-between mt-3">
                {
                  data?.map((e, i)=>{
                    return (
                      <input
                        type="text"
                        key={"OTP "+i}
                        className="bg-blue-50 w-full max-w-20 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                        id="otp"
                        maxLength={1}
                        value={data[i]}
                        onChange={(e)=>{
                          const value = e.target.value;
                          const newData = [...data];
                          newData[i] = value;
                          setData(newData);
                          
                          if(value){
                            inputRef.current[i+1]?.focus()
                          }
                        }}
                        ref={(ref)=>{
                          inputRef.current[i] = ref
                          return ref
                        }}
                      />
                    )
                  })
                }
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
              Verify OTP
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

export default OTPVerification;
