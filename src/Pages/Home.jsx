import React, { useState } from 'react';
import Header from "../Components/Header";
import Footer from '../Components/Footer';
import banner from "../assets/Image/banner.jpg";
import bannerMobile from "../assets/Image/banner-mobile.jpg";
import { useSelector } from 'react-redux';
import validateURL from '../Utils/validateURL';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../Components/CategoryWiseProductDisplay';
import CartMobile from '../Components/CartMobile';

function Home() {

  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state=>state.product.allCategory);
  const subCategoryData = useSelector(state=>state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListPage = (id, cat) => {
    
    const subCategory = subCategoryData.find(sub=>{
      const filterData = sub.category.some(c =>{
        return c._id == id
      })

      return filterData ? true : null
    })

    const url = `/${validateURL(cat)}-${id}/${validateURL(subCategory.name)}-${subCategory._id}`
    navigate(url);
  }

  return (
    <>
        <Header/>
        <main >
          <section className='bg-white'>
            <div className='container mx-auto'>
              <div className={`w-full h-full bg-blue-200 min-h-48 rounded ${!banner && "animate-pulse my-2"}`}>
                <img src={bannerMobile} alt="Banner Mobile" className='w-full h-full lg:hidden' />
                <img src={banner} alt="Banner" className='w-full h-full hidden lg:block' />
              </div>
            </div>

            <div className='container mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-3'>
              
              {
                loadingCategory ? (

                  new Array(12).fill(null).map((c, index)=>{
                    return (
                      <div className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse' key={index}>
                        <div className='bg-blue-100 min-h-24 rounded'></div>
                          <div className='bg-blue-100 h-8 rounded'></div>
                        </div>
  
                    )
                  })
                ) : (

                  categoryData?.map((cat, index)=>{
                    return(

                      <div className='w-full h-full cursor-pointer' onClick={()=>handleRedirectProductListPage(cat._id, cat.name)} key={index}>
                        <div>
                          <img src={cat.image} alt="Category" className='w-full h-full object-scale-down' />
                        </div>
                      </div>
                    )
                  })
                )
              }

            </div>

            {/* Display Category Products */}
            {
              categoryData.map((c, index)=>{
                return (

                  <CategoryWiseProductDisplay id={c?._id} name={c?.name} key={c?._id+"CategoryWiseProduct"}/>
                )
              })
            }

          </section>
        </main>
        <Footer/>


        <CartMobile/>
        
    </>
  )
}

export default Home