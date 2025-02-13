import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from "../Components/Footer";
import CardLoading from "../Components/CardLoading";
import { toast } from 'react-hot-toast';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import CardProduct from "../Components/CardProduct";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import NoDataImage from "../assets/NoDataImage.jpg";
import CartMobile from '../Components/CartMobile';

function SearchPage() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingArrayCard = new Array(10).fill(null);  
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);

  const fetchData = async ()=>{
    try {
      setLoading(true)
      const response = await api.post(ApiRoutes.searchProduct.path, {search: searchText, page: page}, {authenticate: ApiRoutes.searchProduct.authenticate});

      const {data: responseData} = response;

      if(responseData.success){
        if(responseData.page == 1){
          setData(responseData.data);
        }else {
          setData((prev)=>{
            return [
              ...prev,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
        console.log(responseData)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }finally{
      setLoading(false);
    }
  }

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(prev => prev+1)
    }
  }

  useEffect(()=>{
    fetchData();
  }, [page, searchText])

  return (
    <>
      <Header/>
      <section className='bg-white '>
        <div className='container mx-auto p-4'>
          <p className='font-semibold'>Search Results : {data.length}</p>
          <InfiniteScroll dataLength={data.length} hasMore={true} next={handleFetchMore}>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4'>

              {
                data.map((p, i)=>{
                  return (
                    <CardProduct data={p} key={p?._id+"searchProducts"+i}/>
                  )
                })
              }

              {/* Loading Data */}

              {
                loading && (
                  loadingArrayCard.map((_, index)=>{
                    return (
                      <CardLoading key={"LoadingSearchPage"+index}/>
                    )
                  })
                )
              }
              
            </div>
          </InfiniteScroll>
          {
            !data[0] && !loading && (
              <div className='flex justify-center items-center h-full'>
                <img src={NoDataImage} alt="No Data Image" className='w-full h-full max-w-sm max-h-sm' />
              </div>
            )
          }
        </div>
      </section>

      <CartMobile/>
    </>
  )
}

export default SearchPage