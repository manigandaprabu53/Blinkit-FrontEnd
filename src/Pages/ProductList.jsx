import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link, useParams } from 'react-router-dom'
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import Loading from "../Components/Loading";
import CardProduct from "../Components/CardProduct";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import validateURL from '../Utils/validateURL';
import CartMobile from '../Components/CartMobile';

function ProductList() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setToatalPage] = useState(1);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const params = useParams();

  const subCategory = params.subcategory?.split("-");
  const subCategoryName = subCategory.slice(0, subCategory.length-1).join(" ");

  const categoryId = params.category?.split("-").slice(-1)[0];
  const subCategoryId = params.subcategory?.split("-").slice(-1)[0];

  const fetchProductData = async ()=>{
    try {
      setLoading(true);
      const response = await api.post(ApiRoutes.getProductByCategoryAndSubCategory.path, {categoryId: categoryId, subCategoryId: subCategoryId, page: page, limit: 10}, {authenticate: ApiRoutes.getProductByCategoryAndSubCategory.authenticate});

      const {data: responseData} = response;

      if(responseData.success){

        if(responseData.page == 1){
          setData(responseData.data)
        }else{
          setData([...data, ...responseData.data])
        }
        setToatalPage(responseData.page);
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message) || "Error Occured! Please Try Again"
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProductData();

    const sub = allSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : false
    })

    setDisplaySubCategory(sub)
  }, [params, allSubCategory])

  console.log("DATA: ", data)
  return (
    <>
        <Header/>
        <section className=' sticky top-24 lg:top-20'>
            <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
              
              {/* Sidebar for Subcategory */}
              <div className='min-h-[82vh] max-h-[82vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
                {
                  displaySubCategory.map((s, index)=>{
                    const link = `/${validateURL(s?.category[0]?.name)}-${s?.category[0]?._id}/${validateURL(s.name)}-${s._id}`
                    return (
                      <Link to={link} key={s._id+"SubcategoryProducts"+s.name} className={`w-full p-2 bg-white lg:flex items-center lg:h-16 box-border lg:gap-4 border-b hover:bg-green-200 cursor-pointer ${subCategoryId==s._id ? "bg-green-200" : ""}`}>
                        <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                          <img src={s.image} alt="SubCategory" className='w-14 lg:h-14 lg:w-12 h-full object-scale-down' />
                        </div>
                        <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                      </Link>
                    )
                  })
                }
              </div>


              {/* Product pannel associated with subcategory */}
              <div className='sticky top-20'>
                <div className='bg-white shadow-md p-4'>
                  <h3 className='font-semibold'>{subCategoryName}</h3>
                </div>
                <div>
                  <div className='min-h-[65vh] max-h-[70vh] overflow-y-auto relative'>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
                      {
                        data?.map((p, index)=>{
                          return (
                            <CardProduct data={p} key={p._id+"ProductSubCategory"+index}/>
                          )
                        })
                      }
                    </div>
                  </div>

                  {
                    loading && (
                      <Loading/>
                    )
                  }
                </div>
              </div>

            </div>
        </section>
        <Footer/>

        <CartMobile/>

    </>
  )
}

export default ProductList