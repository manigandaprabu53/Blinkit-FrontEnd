import React, { useState } from 'react';
import EditProductAdmin from './EditProductAdmin';
import ConfirmBox from "../Components/ConfirmBox";
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import { toast } from 'react-hot-toast';

function ProductCardAdmin({data, fetchProductData}) {

  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async ()=>{
    try {
      const response = await api.delete(`${ApiRoutes.deleteProduct.path}/?id=${data._id}`, {authenticate: ApiRoutes.deleteProduct.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        toast.success(responseData.message);
        if(fetchProductData){
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message) || "Error Occured! Please Try Again"
    }
  }

  return (
    <div className='w-36 p-4 bg-white rounded'>
        <div >
            <img src={data?.image[0]} alt={data.name} className='w-full h-full object-scale-down bg-white rounded' />
        </div>
        <p className='text-ellipsis line-clamp-2'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>

        <div className='grid grid-cols-2 gap-2 py-2'>
          <button onClick={()=>setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'> Edit </button>

          <button onClick={()=>setOpenDelete(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded'> Delete </button>
        </div>
        {
          editOpen && (
            <EditProductAdmin data={data} fetchProductData={fetchProductData} close={()=>setEditOpen(false)}/>
          )
        }

        {
          openDelete && (
            <ConfirmBox close={()=>setOpenDelete(false)} cancel={()=>setOpenDelete(false)} confirm={handleDelete}/>
          )
        }
    </div>
  )
}

export default ProductCardAdmin