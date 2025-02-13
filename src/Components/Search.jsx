import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { IoMdArrowRoundBack } from "react-icons/io";
import UseMobile from '../Hooks/UseMobile';

const Search = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = UseMobile();
  const searchText = location?.search?.slice(3);

  const redirectToSearchPage = ()=>{
    navigate("/search");
  }

  const handleOnChange = (e)=>{
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url)
  }

  useEffect(()=>{
    setIsSearchPage(location.pathname === "/search")
  }, [location])

  return (
    <div className='w-full min-w-[320px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 group focus-within:border-primary-200 bg-slate-100'>
        <div>
          
          {
            (isMobile && isSearchPage) ? (
              <Link to={"/home"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
                <IoMdArrowRoundBack size={20}/>
              </Link>
            ) : (
              <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                <FaSearch size={22}/>
              </button>
            )
          }
          
        </div>
        
        <div className='w-full h-full'>
          {
            !isSearchPage ? (
              // Not in search page
              <div onClick={redirectToSearchPage} className='w-full h-full flex justify-center items-center'>
                <TypeAnimation
                    sequence={[
                        'Search "Milk"',
                        2000, 
                        'Search "Bread"',
                        2000,
                        'Search "Sugar"'
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                />
            </div>
            ) : (
              // Inside Search Page
              <div className='w-full h-full'>
                <input type="text" placeholder='Search' defaultValue={searchText} onChange={handleOnChange} className='w-full h-full outline-none'/>
              </div>
            )
          }
        </div>
        
    </div>
  )
}

export default Search