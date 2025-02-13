import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import uploadImage from '../Utils/uploadImage';
import toast from 'react-hot-toast';

function EditCategory({close, fetchCategory, data: categoryData}) {

    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [data, setData] = useState({
        _id: categoryData._id,
        name: categoryData.name,
        image: categoryData.image
    })
    
    const handleChange = (e)=>{

        const {name, value} = e.target;

        setData((prev)=>{
            return {
                ...prev, [name]: value
            }
        })
    }

    const handleUploadCategoryImage = async (e)=>{
        const file = e.target.files[0];
        
        if(!file){
            return
        }

        setImageLoading(true);
        const response = await uploadImage(file);
        console.log(response)
        if(response.data.success){
            const {data: imageResponse} = response;
            setData((prev)=>{
                return {
                    ...prev, image: imageResponse.data.url
                }
            })
        }
        setImageLoading(false);
    }
    
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            setLoading(true);
            
            const response = await api.put(ApiRoutes.updateCategory.path, data, {authenticate: ApiRoutes.updateCategory.authenticate});
            const {data: responseData} = response;
            if(responseData.success){
                toast.success(responseData.message);
                close();
                fetchCategory();
            }

        } catch (error) {
            toast.error(error.response.data.message || "Error Occured! Try Again Later");
        }finally{
            setLoading(false);
        }
    }

    
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-70 flex items-center justify-center'>
        <div className="bg-white w-full max-w-4xl p-4 rounded">

            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Edit Category</h1>
                <button onClick={close} className='w-fit block ml-auto'><IoClose size={25}/></button>
            </div>

            <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor="categoryName">Name</label>
                    <input type="text" className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded' id='categoryName' name='name' value={data.name} onChange={handleChange} placeholder='Enter Category Name'/>
                </div>

                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border bg-blue-50 h-36 w-full lg:w-36 flex justify-center items-center rounded'>
                            {
                                data.image ? (
                                    <img src={data.image} alt="Category" className='w-full h-full object-scale-down' />
                                ) : (

                                    <p className='text-sm text-neutral-500'>No Image</p>
                                )
                            }
                        </div>
                        <label htmlFor='uploadCategoryImage'>
                            <div className={`${!data.name ? "bg-gray-300" : "border-primary-200"} px-4 py-2 rounded cursor-pointer border hover:bg-primary-200 font-medium`}>{imageLoading ? "Loading..." : "Upload Image"}</div>
                            <input type="file" id='uploadCategoryImage' disabled={!data.name} onChange={handleUploadCategoryImage} className='hidden'/>
                        </label>
                        
                    </div>
                </div>
                <button disabled={!data.name || !data.image} className={`${data.name && data.image ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-300"} py-2 font-semibold `}>
                    {
                        loading ? "Loading..." : "Update Category"
                    }
                </button>
            </form>
        </div>
    </section>
  )
}

export default EditCategory