import React, { useEffect, useRef, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import displayPriceInRupees from '../Utils/displayPriceInRupees';
import Divider from '../Components/Divider';
import AddToCartButton from "../Components/AddToCartButton";
import image1 from "../assets/fast-delivery.png";
import image2 from "../assets/BestPrice.png";
import image3 from "../assets/WideAssortment.png"
import priceWithDiscount from '../Utils/priceWithDiscount';
import CartMobile from '../Components/CartMobile';

const ProductDisplayPage = () => {

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const imageContainer = useRef();
  const productId = params.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  })

  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft+=100
  }

  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft-=100
  }

  const fetchProductDetails = async ()=>{
    try {
      setLoading(true);
      const response = await api.post(ApiRoutes.getProductDetails.path, {productId: productId}, {authenticate: ApiRoutes.getProductDetails.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        setData(responseData.data);
        toast.success(responseData.message);

      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error")
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProductDetails();
  }, [params])

  return (
    <>
        <Header/>
        <section className='container mx-auto p-4 grid lg:grid-cols-2 min-h-[100vh] overflow-y-auto'>
            <div className=''>
              <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
                <img src={data.image[image]} alt="Product Image" className='w-full h-full object-scale-down'/>
              </div>

              <div className='flex items-center justify-center gap-3'>
                {
                  data?.image?.map((img, index)=>{
                    return (
                      <div className={`bg-slate-200 lg:w-5 lg:h-5 w-3 h-3 my-2 rounded-full ${index === image && "bg-slate-300"}`} key={img+index+"point"}>

                      </div>
                    )
                  })
                }
              </div>
              <div className='grid relative'>
                <div ref={imageContainer} className='flex gap-4 w-full relative z-10 overflow-x-auto scrollbar-none'>
                  {
                    data?.image?.map((img, index)=>{
                      return (
                        <div className="h-20 w-20 min-w-20 min-h-20 shadow-sm cursor-pointer" key={img+index}>
                          <img src={img} alt="Product Image" onClick={()=>setImage(index)} className='w-full h-full object-scale-down'/>
                        </div>
                      )
                    })
                  }
                </div>
                
                <div className='w-full flex justify-between items-center absolute h-full -ml-3'>
                  <button onClick={handleScrollLeft} className='bg-white p-1 rounded-full shadow-lg relative z-10'><FaAngleLeft/></button>
                  <button onClick={handleScrollRight} className='bg-white p-1 rounded-full shadow-lg relative z-10'><FaAngleRight/></button>
                </div>

              </div>

              <div className='my-4 hidden lg:grid gap-3'>
                <div>
                  <p className='font-semibold underline'>Description</p>
                  <p className='text-base'>{data.description}</p>
                </div>

                <div>
                  <p className='font-semibold underline'>Unit</p>
                  <p className='text-base'>{data.unit}</p>
                </div>

                {
                  data?.more_deltails && Object.keys(data?.more_deltails).map((e, i)=>{
                    return (
                      <div>
                        <p className='font-semibold underline'>{e}</p>
                        <p className='text-base'>{data.more_deltails[e]}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className='p-4 lg:p-7 text-base lg:text-lg'>
              <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
              <h2 className='text-lg lg:text-3xl font-semibold'>{data.name}</h2>
              <p className='my-2'>Unit: {data.unit}</p>
              
              <Divider/>
              
              <div>
                <p className='text-lg'>Price</p>
                <div className='flex items-center gap-2 lg:gap-4'>
                  <div className='border border-green-600 py-2 px-4 rounded bg-green-50 w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{displayPriceInRupees(priceWithDiscount(data.price, data.discount))}</p>
                  </div>

                  {/* Showing Original Price */}

                  {
                    data.discount && (
                      <p className='line-through'>{displayPriceInRupees(data.price)}</p>
                    )
                  }

                  {/* Showing Discount Percentage */}
                  {
                    data.discount && (
                      <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                    )
                  }
                </div>  
              </div>
              {
                data.stock === 0 ? (
                  <p className='text-lg text-red-500 my-2'>Out Of Stock</p>
                ) :(

                  <div className='my-4'>
                    <AddToCartButton data={data}/>
                  </div>
                  

                  // <button className='my-4 px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded'>
                  //   Add
                  // </button>
                )
              }

              <p className='font-semibold'>Why Shop from BlinkIt?</p>
              
              <div>

                <div className='flex items-center gap-4 my-4'>
                  <img src={image1} alt="Super Fast delivery" className='w-20 h-20' />
                  <div className='text-sm'>
                    <div className='font-semibold'>Super Fast Delivery</div>
                    <p>Get your order delivered to your doorsteps at the earliest from store near you.</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-4 my-4'>
                  <img src={image2} alt="Best Prices and Offers" className='w-20 h-20' />
                  <div className='text-sm'>
                    <div className='font-semibold'>Best Prices and Offers</div>
                    <p>Best price destination with exciting offers imported directly from the manufacturers.</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-4 my-4'>
                  <img src={image3} alt="Wide Assortment" className='w-20 h-20' />
                  <div className='text-sm'>
                    <div className='font-semibold'>Wide Assortment</div>
                    <p>Choose from five thousand plus products across Food, Personal Care, Household and other categories.</p>
                  </div>
                </div>

              </div>
            </div>
            {/* Descriotion section only for mobile verion */}

            <div className='my-4 lg:hidden grid gap-3'>
              <div>
                <p className='font-semibold underline'>Description</p>
                <p className='text-base'>{data.description}</p>
              </div>

              <div>
                <p className='font-semibold underline'>Unit</p>
                <p className='text-base'>{data.unit}</p>
              </div>

              {
                data?.more_deltails && Object.keys(data?.more_deltails).map((e, i)=>{
                  return (
                    <div>
                      <p className='font-semibold underline'>{e}</p>
                      <p className='text-base'>{data.more_deltails[e]}</p>
                    </div>
                  )
                })
              }
            </div>
        </section>
        <Footer/>

        <CartMobile/>

    </>
  )
}

export default ProductDisplayPage