import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import api from "../Service/ApiService";
import ApiRoutes from '../Utils/ApiRoutes';
import {updateAvatar} from "../store/userSlice.js";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function UserProfileAvatarEdit({close}) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const handleUploadAvatar = async (e)=>{
        try {
            const file = e.target.files[0];
            if(!file){
                return
            }
            const formData = new FormData();
            formData.append("avatar", file);
            setLoading(true);
            const response = await api.put(ApiRoutes.uploadAvatar.path, formData, {authenticate: ApiRoutes.uploadAvatar.authenticate});
            if(response.status === 200 && response.data.success){
                toast.success(response.data.message);
                console.log("Avatar: ",response.data.data.avatar)
                dispatch(updateAvatar(response.data.data.avatar));
            }
            
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message) || "Error Occured! Please Try Again"
        }
    }

  return (
    <>
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 flex justify-center items-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                    <IoClose size={20}/>
                </button>
                <div className='w-20 h-20 flex justify-center items-center rounded-full overflow-hidden drop-shadow-sm'>
                    {
                        user.avatar ? (
                        <img src={user.avatar} alt={user.avatar} className='h-full w-full' />
                        ) : (
                        <FaRegUserCircle size={65}/>
                        )
                    }
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadProfile">
                        <div className='border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer'>
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                    </label>
                    <input type="file" name='avatar' id='uploadProfile' onChange={handleUploadAvatar} className='hidden'/>
                </form>   
            </div>
        </section>
    </>
  )
}

export default UserProfileAvatarEdit