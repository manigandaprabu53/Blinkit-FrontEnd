import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../Utils/uploadImage.js';
import Loading from '../Components/Loading.jsx';
import ViewImage from "../Components/ViewImage.jsx";
import { MdDelete, MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import AddField from '../Components/AddField.jsx';
import api from '../Service/ApiService.jsx';
import ApiRoutes from '../Utils/ApiRoutes.jsx';
import toast from "react-hot-toast";
import successAlert from '../Utils/successAlert.js';

function UploadProduct() {

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  })

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const [selectCategory, setSelectCategory] = useState(""); 
  const [selectSubCategory, setSelectSubCategory] = useState(""); 
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  console.log("ALL Sub Category: ", allSubCategory)
  const handleChange = (e)=>{
    const {name, value} = e.target;

    setData((prev)=>{
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e)=>{
    try {
      const file = e.target.files[0];

      if(!file){
        return
      }
      setImageLoading(true);
      const response = await uploadImage(file)

      const {data: responseData} = response;
      const imageUrl = responseData.data.url;
      setData((prev)=>{
        return {
          ...prev,
          image: [...prev.image, imageUrl]
        }
      })
      setImageLoading(false);

    } catch (error) {
      
    }
  }

  const handleDeleteImage = async (index)=>{
    data.image.splice(index, 1);
    setData((prev)=>{
      return {
        ...prev
      }
    })
  }

  const handleRemoveSubCategory = async (i) => {
    data.subCategory.splice(i, 1);

    setData((prev)=>{
      return {
        ...prev
      }
    })
  }

  const handleRemoveCategory = async (i) => {
    data.category.splice(i, 1);

    setData((prev)=>{
      return {
        ...prev
      }
    })
  }

  const hanleAddFieldSubmit = () => {
    setData((prev)=>{
      return {
        ...prev,
        more_details: {...prev.more_details, [fieldName]: ""}
      }
    })
    setFieldName("");
    setOpenAddField(false);
  }

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();

      const response = await api.post(ApiRoutes.createProduct.path, data, {authenticate: ApiRoutes.createProduct.authenticate});
      
      const {data: responseData} = response;
      console.log("Response Data: ", responseData);
      if(responseData.success){
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }

    } catch (error) {
      toast.error(error.response.data.message || "Error Occured! Try Again Later");
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-sm flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>

      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor="name" className='font-medium'>Name</label>
            <input 
              type="text"
              id='name'
              placeholder='Enter Product Name'
              name='name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="description" className='font-medium'>Description</label>
            <textarea
              id='description'
              placeholder='Enter Product Description'
              name='description'
              value={data.description}
              rows={3}
              required
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
            />
          </div>

          <div>
            <p className='font-medium'>Image</p>
            <div>
              <label htmlFor='productImage' className='bg-blue-100 h-24 flex justify-center items-center cursor-pointer' >
                <div className='flex flex-col justify-center items-center'>
                  {
                    imageLoading ? <Loading/> : (
                      <>
                        <FaCloudUploadAlt size={28}/>
                        <p>Upload Image</p>
                      
                      </>
                    )
                  }
                </div>

                <input type="file" id='productImage' name='productImage' className='hidden' accept='image' onChange={handleUploadImage} required/>
              </label>
              <div className='flex flex-wrap gap-4'>
                {/* Display Uploaded Image */}
                {
                  data.image.map((img, index)=>{
                    return (
                      <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img src={img} alt={img} className='w-full h-full object-scale-down cursor-pointer' onClick={()=>setViewImageURL(img)}/>
                        <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 bg-red-500 hover:bg-red-600 rounded text-white p-1 hidden group-hover:block cursor-pointer'>
                          <MdDelete/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="category" className='font-medium'>Category</label>
            <div>
              <select 
                className='bg-blue-50 border w-full p-2 rounded outline-none focus-within:border-primary-200' 
                value={selectCategory} 
                onChange={(e)=>{
                  const value = e.target.value
                  const category = allCategory.find(el=>el._id == value)
                  setData((prev)=>{
                    return {
                      ...prev,
                      category: [...prev.category, category]
                    }
                  })
                  setSelectCategory("")
                }}
              >
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c,i)=>{
                    return (
                      <option value={c._id} key={c._id+"CaregorySection"}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, i)=>{
                    return (
                      <div key={c._id+i+"productSection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div onClick={()=>handleRemoveCategory(i)} className='hover:text-red-500 cursor-pointer'>
                          <IoClose size={20}/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="category" className='font-medium'>Sub Category</label>
            <div>
              <select 
                className='bg-blue-50 border w-full p-2 rounded outline-none focus-within:border-primary-200' 
                value={selectSubCategory} 
                onChange={(e)=>{
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el=>el._id == value)
                  setData((prev)=>{
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
              >
                <option value={""}>Select SubCategory</option>
                {
                  allSubCategory.map((c,i)=>{
                    return (
                      <option value={c._id} key={c._id+"subCategorySection"}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, i)=>{
                    return (
                      <div key={c._id+i+"subCategorySection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div onClick={()=>handleRemoveSubCategory(i)} className='hover:text-red-500 cursor-pointer'>
                          <IoClose size={20}/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="unit" className='font-medium'>Unit</label>
            <input 
              type="text"
              id='unit'
              placeholder='Enter Product Unit'
              name='unit'
              value={data.unit}
              required
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="stock" className='font-medium'>Number Of Stock</label>
            <input 
              type="number"
              id='stock'
              placeholder='Enter Numner Of Stock'
              name='stock'
              value={data.stock}
              required
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="price" className='font-medium'>Product Price</label>
            <input 
              type="number"
              id='price'
              placeholder='Enter Product Price'
              name='price'
              value={data.price}
              required
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          
          <div className='grid gap-1'>
            <label htmlFor="discount" className='font-medium'>Product Discount</label>
            <input 
              type="number"
              id='discount'
              placeholder='Enter Discount'
              name='discount'
              value={data.discount}
              required
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          

          {/* Add More Fields */}
          
          <div>
            {
              Object?.keys(data?.more_details).map((k, index)=>{
                return (
                  <div className='grid gap-1'>
                    <label htmlFor={k}>{k}</label>
                    <input 
                      type="text"
                      id={k}
                      value={data.more_details[k]}
                      required
                      onChange={(e)=>{
                        const value = e.target.value
                        setData((prev)=>{
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [k]: value
                            }
                          }
                        })
                      }}
                      className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                    />
                  </div>
                )
              })
            }
          </div>

          <div onClick={()=>setOpenAddField(true)} className='hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
            Add Field
          </div>

          <button className='bg-primary-100 hover:bg-primary-200 py-2 px-4 rounded font-semibold '>
            Submit
          </button>
        </form>
      </div>
      {
        viewImageURL && (
          <ViewImage url={viewImageURL} close={()=>setViewImageURL("")}/>
        )
      }

      {
        openAddField && (
          <AddField close={()=>setOpenAddField(false)} value={fieldName} onchange={(e)=>setFieldName(e.target.value)} submit={hanleAddFieldSubmit}/>
        )
      }
    </section>
  )
}

export default UploadProduct