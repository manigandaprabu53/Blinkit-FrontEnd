import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import api from "../Service/ApiService";
import ApiRoutes from '../Utils/ApiRoutes';
import toast from "react-hot-toast";
import {logout} from "../store/userSlice.js";
import { FaExternalLinkAlt } from "react-icons/fa";
import isAdmin from '../Utils/isAdmin.js';
import { useGlobalContext } from '../Provider/GlobalProvider.jsx';

function UserMenu({close}) {

  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleLogoutProvider } = useGlobalContext();
  
  const handleLogout = async ()=>{
    try {
      const response = await api.get(ApiRoutes.logout.path, {authenticate: ApiRoutes.logout.authenticate});
      
      if(response.status === 200 && response.data.success){
        if(close){
          close();
        }
        dispatch(logout());
        handleLogoutProvider();
        // localStorage.clear();
        
        toast.success("Logout Successfull")
        navigate("/")
      } 
    } catch (error) {
      toast.error(error?.response?.data?.message) || "Error Occured! Try Again Later"
    }
  }

  const handleClose = ()=>{
    if(close){
      close();
    }
  }

  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-1.5'><span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span><span className='text-medium text-red-600'>{user.role === "Admin" ? "(Admin)" : ""}</span><Link to={"/dashboard/profile"} onClick={handleClose} className='hover:text-primary-100 pr-1'><FaExternalLinkAlt size={15}/></Link> </div>

        <Divider/>

        <div className='text-sm grid gap-1'>

          {
            isAdmin(user.role) && (

              <Link to={"/dashboard/category"} onClick={handleClose} className='px-2 hover:bg-gray-200 rounded p-1'>Category</Link>
            )
          }
          
          {
            isAdmin(user.role) && (

              <Link to={"/dashboard/subcategory"} onClick={handleClose} className='px-2 hover:bg-gray-200 rounded p-1'>Sub Category</Link>
            )
          }

          {
            isAdmin(user.role) && (

              <Link to={"/dashboard/upload-product"} onClick={handleClose} className='px-2 hover:bg-gray-200 rounded p-1'>Upload Product</Link>
            )
          }

          {
            isAdmin(user.role) && (

              <Link to={"/dashboard/product"} onClick={handleClose} className='px-2 hover:bg-gray-200 rounded p-1'>Product</Link>
            )
          }
          
          
          
          <Link to={"/dashboard/myorders"} onClick={handleClose} className='px-2 hover:bg-gray-200 rounded p-1'>My Orders</Link>
          
          <Link to={"/dashboard/address"} onClick={handleClose} className='px-2 hover:bg-gray-200 rounded p-1'>Save Address</Link>
          
          <button className='text-left hover:bg-red-500 p-2 rounded hover:text-white' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default UserMenu