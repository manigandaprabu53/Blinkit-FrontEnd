import React, { useEffect, useState } from 'react'
import UploadCategory from '../Components/UploadCategory'
import toast from 'react-hot-toast';
import Loading from '../Components/Loading';
import NoData from '../Components/NoData';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import EditCategory from '../Components/EditCategory';
import ConfirmBox from '../Components/ConfirmBox';
import { useSelector } from 'react-redux';

function Category() {

  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: ""
  })
  const [deleteCategory, setDeleteCategory] = useState({
    _id: ""
  })
  const allCategory = useSelector(state => state.product.allCategory);

  const fetchCategory = async () => {
    try {
        setLoading(true);
        const response = await api.get(ApiRoutes.getCategory.path, {authenticate: ApiRoutes.getCategory.authenticate});
        const {data: responseData} = response;
        
        if(responseData.success){
          setCategoryData(responseData.data);
        }
        
    } catch (error) {
      toast.error(error.response.data.message || "Error Occured! Try Again Later");
    }finally{
      setLoading(false);
    }
  }

  const handleDeleteCategory = async () => {
    try {
      
      const response = await api.delete(`${ApiRoutes.deleteCategory.path}?id=${deleteCategory}`, {authenticate: ApiRoutes.deleteCategory.authenticate});
      const {data: responseData} = response;
      if(responseData.success){
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBox(false);
      }

    } catch (error) {
      toast.error(error.response.data.message || "Error Occured! Try Again Later");
    }
  }

  useEffect(()=>{
    setCategoryData(allCategory)
  }, [allCategory])

  return (
    <>
      <section>
        <div className='p-2 bg-white shadow-sm flex items-center justify-between'>
          <h2 className='font-semibold'>Category</h2>
          <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 text-primary-200 hover:text-neutral-800 px-3 py-1 rounded'>Add Category</button>
        </div>

        {
          !categoryData.length && !loading && (
            <NoData/>
          )
        }

        <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2'>
          {
            categoryData.map((category, index)=>{
              return(
                <div className='w-32 h-56 rounded shadow-md' key={category._id}>

                  <img src={category.image} alt={category.name} className='w-36'/>
                  
                  <div className='flex items-center h-9 gap-2'>
                    <button 
                      onClick={()=>{
                          setOpenEdit(true) 
                          setEditData(category)
                        }
                      } 
                      className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
                      Edit
                    </button>
                    <button 
                      onClick={()=>{
                        setOpenConfirmBox(true) 
                        setDeleteCategory(category._id)
                      }}
                      className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                      Delete
                    </button>
                  </div>
                
                </div>
              )
            })
          }
        </div>

        {
          loading && (<Loading/>)
        }

        {
          openUploadCategory && (<UploadCategory fetchCategory={fetchCategory} close={()=>setOpenUploadCategory(false)}/>)
        }
        
        {
          openEdit && (
            <EditCategory data={editData} fetchCategory={fetchCategory} close={()=>setOpenEdit(false)}/>
          )
        }

        {
          openConfirmBox && (
            <ConfirmBox close={()=>setOpenConfirmBox(false)} cancel={()=>setOpenConfirmBox(false)} confirm={handleDeleteCategory}/>
          )
        }
      </section>
    </>
  )
}

export default Category