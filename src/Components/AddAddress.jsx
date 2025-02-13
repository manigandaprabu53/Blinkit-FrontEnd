import React from 'react';
import { useForm } from "react-hook-form";
import { IoClose } from 'react-icons/io5';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../Provider/GlobalProvider';

function AddAddress({close}) {

  const { register, handleSubmit, reset } = useForm();
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data)=>{
    
    try {
      
      const response = await api.post(ApiRoutes.createAddress.path, {address_line: data.addressLine, city: data.city, state: data.state, pincode: data.pincode, country: data.country,  mobile: data.mobile});
      console.log("Inside Submit")
      const { data: responseData } = response;

      if(responseData.success){
        toast.success(responseData.message);
        if(close){
          reset();
          close();
          fetchAddress();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error")
    }
  }
  return (
    <section className='bg-black fixed top-0 bottom-0 left-0 right-0 bg-opacity-70 z-50 overflow-auto'>
      <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold'>Add Address</h2>
          <button onClick={()=>close()} className='hover:text-red-700'>
            <IoClose size={25} />
          </button>
        </div>

        <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>

          <div className='grid gap-1'>
            <label htmlFor="addressLine">Address Line :</label>
            <input 
              type="text" 
              id='addressLine1'
              className='border-2 bg-blue-50 p-2 outline-none focus-within:border-blue-300 rounded'
              {...register("addressLine", {required: true})}
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="city">City :</label>
            <input 
              type="text" 
              id='city'
              className='border-2 bg-blue-50 p-2 outline-none focus-within:border-blue-300 rounded'
              {...register("city", {required: true})}
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="state">State : </label>
            <input 
              type="text" 
              id='state'
              className='border-2 bg-blue-50 p-2 outline-none focus-within:border-blue-300 rounded'
              {...register("state", {required: true})}
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="pincode">Pincode :</label>
            <input 
              type="text" 
              id='pincode'
              className='border-2 bg-blue-50 p-2 outline-none focus-within:border-blue-300 rounded'
              {...register("pincode", {required: true})}
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="country">Country :</label>
            <input 
              type="text" 
              id='country'
              className='border-2 bg-blue-50 p-2 outline-none focus-within:border-blue-300 rounded'
              {...register("country", {required: true})}
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="mobile">Mobile :</label>
            <input 
              type="text" 
              id='mobile'
              className='border-2 bg-blue-50 p-2 outline-none focus-within:border-blue-300 rounded'
              {...register("mobile", {required: true})}
            />
          </div>

          <button type='submit' className='bg-primary-200 w-full py-2 px-4 font-semibold hover:bg-primary-100 rounded mt-4'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default AddAddress