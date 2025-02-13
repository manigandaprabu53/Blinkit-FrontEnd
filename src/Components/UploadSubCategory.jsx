import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../Utils/uploadImage.js';
import { useSelector } from 'react-redux';
import api from '../Service/ApiService.jsx';
import ApiRoutes from '../Utils/ApiRoutes.jsx';
import toast from "react-hot-toast";

function UploadSubCategory({close, fetchData}) {

    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })
    const allCategory = useSelector(state => state.product.allCategory);

    const handleChange = (e)=>{

        const {name, value} = e.target;

        setSubCategoryData((prev)=>{
            return {
                ...prev, [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async (e)=>{
        const file = e.target.files[0];

        if(!file){
            return
        }

        const response = await uploadImage(file);
        
        if(response.data.success){
            const {data: imageResponse} = response;
            setSubCategoryData((prev)=>{
                return {
                    ...prev, image: imageResponse.data.url
                }
            })
        }
    }

    const handleRemoveCategorySelected = (categoryId)=>{

        const index = subCategoryData.category.findIndex(el => el._id == categoryId);
        const finalData = subCategoryData.category.splice(index, 1);
        setSubCategoryData({...subCategoryData, finalData});
    }

    const handleSubmitSubCategory = async (e)=>{
        try {
            e.preventDefault();
            const response = await api.post(ApiRoutes.createSubCategory.path, subCategoryData, {authenticate: ApiRoutes.createSubCategory.authenticate});
            const {data: responseData} = response;
            
            if(responseData.success){
                toast.success(responseData.message);
                if(close){
                    close();
                }
                if(fetchData){
                    fetchData();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message) || "Error Occured! Please Try Again"
        }
    }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-70 flex items-center justify-center'>
        <div className='bg-white w-full max-w-4xl p-4 rounded'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Add Sub Category</h1>
                <button onClick={close} className='w-fit block ml-auto'><IoClose size={25}/></button>
            </div>

            <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                <div className='grid gap-1'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' name='name' value={subCategoryData.name} onChange={handleChange} className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded' />
                </div>

                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex flex-col gap-3 lg:flex-row items-center'>
                        <div className='border h-36 lg:w-36 w-full bg-blue-50 flex justify-center items-center'>
                            {
                                !subCategoryData.image ? (
                                    <p className='text-sm text-neutral-400'>No Image</p>
                                ) : (
                                    <img src={subCategoryData.image} alt="Sub Category" className='w-full h-full object-scale-down'/>
                                )
                            }
                        </div>
                        <label htmlFor="uploadSubCategoryImage">
                            <div className='px-4 py-1 border border-primary-100 text-primary-100 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer'>
                                Upload Image
                            </div>
                            <input type="file" id='uploadSubCategoryImage' className='hidden' onChange={handleUploadSubCategoryImage}/>
                        </label>
                    </div>
                </div>
                <div className='grid gap-1'>
                    <label>Category</label>
                    <div className='border focus-within:border-primary-200'>
                        {/* Display Value */}
                        <div className='flex flex-wrap gap-2'>
                            {
                                subCategoryData.category.map((cat, index)=>{
                                    return (
                                        <p key={cat._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>{cat.name} <span className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)}><IoClose size={20}/></span></p>
                                    )
                                })
                            }
                        </div>

                        {/* Select Category */}
                        <select 
                            className='w-full p-2 bg-transparent outline-none border' 
                            onChange={(e)=>{
                                const value = e.target.value
                                const categoryDetails = allCategory.find(el => el._id == value)
                                setSubCategoryData((prev)=>{
                                    return{
                                        ...prev, category: [...prev.category, categoryDetails]
                                    }
                                })
                            }}>
                            <option value={""}>Select Category</option>
                            {
                                allCategory.map((category, index)=>{
                                   return <option value={category._id} key={category._id+" SubCategory"}>{category?.name}</option>
                                })
                            }
                        </select>

                    </div>
                </div>

                <button className={`px-4 py-2 border ${!subCategoryData.name || !subCategoryData.image || !subCategoryData.category[0] ? "bg-gray-200" : "bg-primary-200"}`}>
                    Submit
                </button>
            </form>
        </div>
    </section>
  )
}

export default UploadSubCategory