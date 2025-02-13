import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../Components/UploadSubCategory';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import DisplayTable from '../Components/DisplayTable';
import {createColumnHelper} from "@tanstack/react-table";
import ViewImage from '../Components/ViewImage';
import { MdEdit, MdDelete } from "react-icons/md";
import EditSubCategory from '../Components/EditSubCategory';
import ConfirmBox from "../Components/ConfirmBox";
import toast from 'react-hot-toast';

function SubCategory() {

  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  });
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const columnHelper = createColumnHelper();
  const [editData, setEditData] = useState({
    _id: ""
  })

  const fetchSubCategory = async ()=>{
    try {
      setLoading(true);
      const response = await api.post(ApiRoutes.getSubCategory.path, {authenticate: ApiRoutes.getSubCategory.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        setData(responseData.data);
      }
    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }finally{
      setLoading(false);
    }
  }

  const handleDeleteSubCategory = async () => {
    try {
      
      const response = await api.delete(`${ApiRoutes.deleteSubCategory.path}/?id=${deleteSubCategory._id}`, {authenticate: ApiRoutes.deleteSubCategory.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirm(false);
        setDeleteSubCategory({_id: ""});
      }

    } catch (error) {
      toast.error(error.response.data.message) || "Error Occured! Please Try Again"
    }
  }

  useEffect(()=>{
    fetchSubCategory();
  }, [])

  console.log("Sub Category Data: ", data)

  const column = [
    columnHelper.accessor("name",{
      header: "Name"
    }),

    columnHelper.accessor("image",{
      header: "Image",
      cell: ({row})=>{
        console.log("Row: ", row.original.image);
        return <div className='flex justify-center items-center cursor-pointer'>
          <img src={row.original.image} alt={row.original.name} className='w-8 h-8' onClick={()=>setImageURL(row.original.image)}/>
        </div>
      }
    }),

    columnHelper.accessor("category", {
      header: "Category",
      cell: ({row})=>{
        return (
          <>
            {
              row.original.category.map((c, i)=>{
                return (
                  <p key={c._id+" Table"}>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),

    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({row})=>{
        return (
          <div className='flex justify-center items-center gap-3'>
            <button onClick={()=>{setOpenEditSubCategory(true), setEditData(row.original)}} className='p-2 bg-green-100 rounded-full text-green-500 hover:text-green-800'>
              <MdEdit size={20}/>
            </button>

            <button onClick={()=>{setOpenDeleteConfirm(true), setDeleteSubCategory(row.original)}} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-800'>
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    })
  ]

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=>setOpenAddSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 text-primary-200 hover:text-neutral-800 px-3 py-1 rounded'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable
          data={data}
          column={column}

        />
      </div>

      {
        openAddSubCategory && (
          <UploadSubCategory close={()=>setOpenAddSubCategory(false)} fetchData={fetchSubCategory}/>
        )
      }

      {
        imageURL && <ViewImage url={imageURL} close={()=>setImageURL("")}/>
      }

      {
        openEditSubCategory && <EditSubCategory data={editData} close={()=>setOpenEditSubCategory(false)} fetchData={fetchSubCategory} />
      }

      {
        openDeleteConfirm && <ConfirmBox cancel={()=>setOpenDeleteConfirm(false)} close={()=>setOpenDeleteConfirm(false)} confirm={handleDeleteSubCategory}/>
      }
    </section>
  )
}

export default SubCategory