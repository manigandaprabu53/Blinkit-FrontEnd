import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import ApiRoutes from '../Utils/ApiRoutes';
import api from "../Service/ApiService";
import Loading from '../Components/Loading';
import ProductCardAdmin from '../Components/ProductCardAdmin';
import { FaSearch } from "react-icons/fa";

function ProductAdmin() {

  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProductData = async ()=>{
      try {
          setLoading(true);
          const response = await api.post(ApiRoutes.getProducts.path, {page: page, limit: 10, search: search}, {authenticate: ApiRoutes.getProducts.authenticate});

          const {data: responseData} = response;

          if(responseData.success){
            setTotalPageCount(responseData.totalNoPages);
            setProductData(responseData.data);
              
          }

      } catch (error) {
          toast.error(error?.response.data.message || "Error! Try Again Later");
      }finally{
        setLoading(false);
      }
  }

  const handleNext = () => {

    if(page !== totalPageCount){
      setPage((prev)=>prev+1)
    }
  }

  const handlePrevious = () => {

    if(page > 1){
      setPage((prev)=>prev-1)
    }
  }

  const handleOnChange = (e)=>{
    
    const {value} = e.target;
    
    setSearch(value);
    setPage(1);
  }

  useEffect(()=>{
      fetchProductData();
  }, [page])

  useEffect(()=>{

    let flag = true;
    const interval = setTimeout(()=>{
      if(flag){

        fetchProductData();
        flag = false;
      }
    }, 400)

    return ()=>{
      clearTimeout(interval)
    }
  }, [search])
  
  return (
    <section>
      <div className='p-2 bg-white shadow-sm flex items-center justify-between h-full gap-4'>

        <h2 className='font-semibold'>Product</h2>
        <div className='h-full w-full ml-auto max-w-56 min-w-26 bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200'>
          <FaSearch size={25} className='text-primary-100'/>
          <input type="text" onChange={handleOnChange} value={search} placeholder='Search Product' className='h-full px-4 outline-none bg-transparent w-full'/>
        </div>

      </div>

      {
        loading && (
          <Loading/>
        )
      }

      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
              productData.map((p, index)=>{
                return (
                  <ProductCardAdmin data={p} fetchProductData={fetchProductData} key={p._id+"ProductAdmin"}/>
                )
              })
            }
          </div>
        </div>
        <div className='flex justify-between my-4'>
          <button onClick={handlePrevious} className='border border-primary-100 px-4 py-1 hover:bg-primary-200'>Previous</button>
          <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border border-primary-100 px-4 py-1 hover:bg-primary-200'>Next</button>

        </div>
      </div>
    </section>
  )
}

export default ProductAdmin