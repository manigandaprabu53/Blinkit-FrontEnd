import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../Components/UserProfileAvatarEdit';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import getUserDetails from '../Utils/getUserDetails';
import { setUserDetails } from '../store/userSlice';

function Profile() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  });

  const handleOnChange = (e)=>{
    e.preventDefault();
    const {name, value} = e.target;

    setUserData((prev)=>{
      return {
        ...prev, [name]: value
      }
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      
      const response = await api.put(ApiRoutes.updateUser.path, userData, {authenticate: ApiRoutes.updateUser.authenticate});

      if(response.data.success){
        toast.success(response.data.message);
        const userData = await getUserDetails();
        if(userData){
          dispatch(setUserDetails(userData.data));
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error Occured! Try Again")
    }
  }

  useEffect(()=>{
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user])
  return (
    <div className='p-4'>
      <div className='w-20 h-20 flex justify-center items-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img src={user.avatar} alt={user.avatar} className='h-full w-full' />
          ) : (
            <FaRegUserCircle size={65}/>
          )
        }
        
      </div>
      <button onClick={()=>setOpenAvatarEdit(true)} className='text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>
      {
        openAvatarEdit && (

          <UserProfileAvatarEdit close={()=>setOpenAvatarEdit(false)}/>

        )
      }
      {/* Name, Mobile, Email, Change Password */}

      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name </label>
          <input type="text" id='name' name='name' value={userData.name} placeholder='Enter your name' onChange={handleOnChange} className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded' required/>
        </div>

        <div className='grid'>
          <label htmlFor="email">Email </label>
          <input type="email" id='email' name='email' value={userData.email} placeholder='Enter your email' onChange={handleOnChange} className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded' required/>
        </div>

        <div className='grid'>
          <label htmlFor="mobile">Mobile </label>
          <input type="text" id='mobile' name='mobile' value={userData.mobile} placeholder='Enter your email' onChange={handleOnChange} className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded' required/>
        </div>

        <button className='border px-4 py-2 font-semibold border-primary-200 text-primary-200 hover:text-black hover:bg-primary-200 rounded'>
          {
            loading ? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Profile