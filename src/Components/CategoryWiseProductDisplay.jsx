import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import validateURL from '../Utils/validateURL';

function CategoryWiseProductDisplay({id, name}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingCardNumber = new Array(6).fill(null);
    const containerRef = useRef();
    const subCategoryData = useSelector(state=>state.product.allSubCategory);
    const loadingCard = new Array(6).fill(null);

    const handleRedirectProductListPage = () => {
    
        const subCategory = subCategoryData.find(sub=>{
        const filterData = sub.category.some(c =>{
            return c?._id == id
        })

        return filterData ? true : null
        })

        const url = `/${validateURL(name)}-${id}/${validateURL(subCategory?.name)}-${subCategory?._id}`
        
        return url;
    }
    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true);
            const response = await api.post(ApiRoutes.getProductsByCategory.path, {id: id}, {authenticate: ApiRoutes.getProductsByCategory.authenticate});

            const {data: responseData} = response;
            console.log(responseData)
            if(responseData.success){
                setData(responseData.data)
            }

        } catch (error) {
            toast.error(error.response?.data?.message) || "Error Occured! Please Try Again"
        }finally{
            setLoading(false);
        }
    }

    const handleScrollRight = () => {
        containerRef.current.scrollLeft+=200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft-=200
    }

    useEffect(()=>{
        fetchCategoryWiseProduct();
    }, [])

  return (
    <div>
        <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
            <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
            <Link to={handleRedirectProductListPage()} className='text-green-600 hover:text-green-400'>See All</Link>
        </div>
        <div className='relative flex items-center'>
            <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                {
                    loading && 
                    loadingCardNumber.map((_, index)=>{
                        return (
                            <CardLoading key={"CategorywiseProductLoading"+index}/>
                        )
                    })
                }

                {
                    data.map((p, index)=>{
                        return (
                            <CardProduct key={p._id+"CategorywiseProductDisplay"+index} data={p}/>
                        )
                    })
                }
            </div>
            <div className='w-full absolute hidden lg:flex justify-between left-0 right-0 container mx-auto px-2'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'><FaAngleLeft/></button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'><FaAngleRight/></button>
                </div>
        </div>
    </div>
  )
}

export default CategoryWiseProductDisplay