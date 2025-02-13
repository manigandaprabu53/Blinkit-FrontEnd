import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAddress from '../Components/AddAddress';
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../Components/EditAddressDetails";
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../Provider/GlobalProvider';

function Addresses() {

  const addressList = useSelector(state => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const {fetchAddress} = useGlobalContext();

  const disbaleAddress = async (id)=>{
    try {
      const response = await api.put(ApiRoutes.deleteAddress.path, {_id: id});

      const {data: responseData} = response;

      if(responseData.success){
        toast.success(responseData.message);
        if(fetchAddress){
          fetchAddress();
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <div className='bg-white p-2 shadow-lg flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Address</h2>
        <button onClick={()=>setOpenAddress(true)} className='border border-primary-200 text-primary-200 hover:bg-primary-200 hover:text-black px-2 py-1 rounded-full'>
          Add Address
        </button>
      </div>

      <div className='bg-blue-50 p-2 grid gap-5'>
        {
            addressList?.map((address, index)=>{
                return (
                  <div className={`${!address.status && "hidden"} border rounded p-3 flex gap-3 bg-white`} key={"Addresses"+index}>
                    
                    <div className='w-full'>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.city} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                    </div>
                    <div className='grid gap-10'>
                      <button 
                        onClick={()=>{
                          setOpenEdit(true)
                          setEditData(address)
                        }}
                        className='bg-green-200 p-1 rounded hover:text-white hover:bg-green-600'
                      >
                        <MdEdit/>
                      </button>
                      
                      <button onClick={()=>disbaleAddress(address._id)} className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'><MdDelete size={20}/></button>

                    </div>
                  </div>
                )
            })
        }
        
        <div onClick={()=>setOpenAddress(true)} className='h-16 bg-white border-2 border-dashed flex justify-center items-center cursor-pointer'>
            Add Address
        </div>

      </div>
      {
        openAddress && (
          <AddAddress close={()=>setOpenAddress(false)}/>
        )
      }

      {
        openEdit && (
          <EditAddressDetails close={()=>setOpenEdit(false)} data={editData}/>
        )
      }
    </div>
  )
}

export default Addresses