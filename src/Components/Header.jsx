import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuCircleUser } from "react-icons/lu";
import UseMobile from '../Hooks/UseMobile';
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import displayPriceInRupees from '../Utils/displayPriceInRupees';
import { useGlobalContext } from '../Provider/GlobalProvider';
import DisplayCartItems from './DisplayCartItems';


function Header() {

  const [isMobile] = UseMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector(state=>state.cartItem.cart);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);
  const {totalPrice, totalQty} = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);

  const user =useSelector((state)=>state.user);

  const redirectToLogin = ()=>{
    navigate("/login");
  }

  const handleCloseUserMenu = ()=>{
    setOpenUserMenu(false);
  }

  const handleMobileUser = ()=>{
    if(!user._id){
      navigate("/login");
      return;
    }

    navigate("/user");
  }

  // Cart Count

  // useEffect(()=>{
  //     const qty = cartItem.reduce((prev, curr)=>{
  //       return prev + curr.quantity
  //     }, 0)
  //     setTotalQty(qty)

  //     const price = cartItem.reduce((prev, curr)=>{
  //       return prev + (curr.productId.price * curr.quantity)
  //     }, 0)
  //     setTotalPrice(price)
  // }, [cartItem])

  return (
    <header className='h-24 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center gap-2 bg-white z-40'>
        {
          !(isSearchPage && isMobile) && (
            <div className='container mx-auto flex justify-between items-center px-2'>
              {/* LOGO */}
              <div className='h-full'>
                  <Link to={"/home"} className='h-full flex justify-center items-center'>
                      <img src={logo} alt="BlinkIt Logo" width={170} height={60} className='hidden lg:block'/>
                      <img src={logo} alt="BlinkIt Logo" width={120} height={60} className='lg:hidden'/>
                  </Link>
              </div>
              {/* SEARCH */}
              <div className='hidden lg:block'>
                <Search/> 
              </div>

              {/* lOGIN AND CART */}
              <div className=''>
                {/* User icon will visible in mobile version only */}
                <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                  <LuCircleUser size={30}/>
                </button>

                {/* Below div (login and cart) will be visible in desktop mode only */}
                <div className='hidden lg:flex items-center gap-10'>
                  {
                    user?._id ? (
                      <div className='relative'>
                        <div className='flex items-center gap-1 cursor-pointer select-none' onClick={()=>setOpenUserMenu((prev)=>!prev)}>
                          <p>Account</p>
                          {
                            openUserMenu ? (

                              <GoTriangleUp size={25}/>

                            ) : (
                              
                              <GoTriangleDown size={25}/>
                            )
                          }
                        </div>
                        {
                          openUserMenu && (
                            <div className='absolute right-0 top-12'>
                              <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                <UserMenu close={handleCloseUserMenu}/>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    ) : (
                      
                      <button onClick={redirectToLogin} className='text-lg px-2'>Login</button>
                    
                    )
                  }

                  {/* Add to cart */}
                  <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 p-2 rounded text-white'>
                    <div className='animate-bounce'>
                      <TiShoppingCart size={25}/>
                    </div>
                    <div className='font-semibold text-sm'>
                      {
                        cartItem[0] ? (
                          <div>
                            <p>{totalQty} Items</p>
                            <p>{displayPriceInRupees(totalPrice)}</p>
                          </div>
                        ) : (
                            <p>My Cart</p>
                        )
                      }
                      
                    </div>
                  </button>
                </div>
              </div>

            </div>
          )
        }
        <div className='container mx-auto px-2 lg:hidden'>
          <Search/>
        </div>

        {
          openCartSection && (
            <DisplayCartItems close={()=>setOpenCartSection(false)}/>
          )
        }
    </header>
  )
}

export default Header