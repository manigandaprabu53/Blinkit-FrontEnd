import React from 'react';
import AddToCartButton from "../Components/AddToCartButton.jsx";
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import {useGlobalContext} from "../Provider/GlobalProvider";
import displayPriceInRupees from "../Utils/displayPriceInRupees.js";
import priceWithDiscount from "../Utils/priceWithDiscount.js";
import {FaCaretRight} from "react-icons/fa";
import { useSelector } from 'react-redux';
import imageEmptyCart from "../assets/empty-cart.png"
import toast from 'react-hot-toast';

function DisplayCartItems({close}) {

    const {priceWithOutDiscount, totalPrice, totalQty} = useGlobalContext();
    const cartItem = useSelector(state => state.cartItem.cart);
    const user = useSelector(state => state.user);
    const navidate = useNavigate();

    const handleRedirectoCheckOutPage = () =>{
        if(user._id){
            navidate("/checkout");

            if(close){
                close();
            }
            return
        }else{
            toast.error("Login To Place Order");
        }
    }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-70 z-50'>
        <div className="bg-white w-full max-w-sm rounded min-h-screen max-h-screen ml-auto">
            <div className='flex items-center justify-between gap-3 p-4 shadow-md'>
                <h2 className='font-semibold'>Cart</h2>

                <Link to={"/home"} className='lg:hidden'>
                    <IoClose size={20}/>
                </Link>

                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={20}/>
                </button>
            </div>

            <div className='lg:min-h-[80vh] min-h-[75vh] h-full max-h-[calc(100vh-120px)] bg-blue-50 p-2 flex flex-col gap-4'>
                {/* Display Items */}

                {
                    cartItem[0] ? (
                        <>
                            <div className='flex items-center justify-between p-2 bg-blue-100 text-blue-500 rounded-full px-4 py-2'>
                                <p>Your Total Savings </p>
                                <p>{displayPriceInRupees(priceWithOutDiscount - totalPrice)}</p>
                            </div>

                            <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                {
                                    cartItem[0] && (
                                        cartItem.map((item, index)=>{
                                            return (
                                                <div className='flex w-full gap-4' key={index+"CartDetails"}>
                                                    <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                        <img src={item?.productId?.image[0]} alt="Cart Product Images" className='object-scale-down'/>
                                                    </div>
                                                    <div className=' w-full max-w-sm text-xs'>
                                                        <p className='text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                        <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                        <p className='font-semibold'>{displayPriceInRupees(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                    </div>
                                                    <div>
                                                        <AddToCartButton data={item?.productId}/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>

                            <div className="bg-white p-4">
                                <h3 className='font-semibold'>Bill Details</h3>

                                <div className='flex justify-between gap-4 ml-1'>
                                    <p>Total Items</p>
                                    <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{displayPriceInRupees(priceWithOutDiscount)}</span> <span>{displayPriceInRupees(totalPrice)}</span></p>
                                </div>
                                
                                <div className='flex justify-between gap-4 ml-1'>
                                    <p>Quantity</p>
                                    <p className='flex items-center gap-2'>{totalQty} Item</p>
                                </div>
                                
                                <div className='flex justify-between gap-4 ml-1'>
                                    <p>Delivery Fee</p>
                                    <p className='flex items-center gap-2'>Free</p>
                                </div>

                                <div className='font-semibold flex justify-between items-center gap-4'>
                                    <p>Grand Total</p>
                                    <p>{totalPrice}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='bg-white flex flex-col justify-center items-center'>
                            <img src={imageEmptyCart} alt="Empty Cart Image" className='w-full h-full object-scale-down'/>
                            <Link onClick={close} to={"/home"} className='bg-green-600 px-4 py-2 text-white rounded'>
                                Shop Now
                            </Link>
                        </div>
                    )
                }  
            </div>
            {
                cartItem[0] && (
                    <div className='p-2 sticky bottom-1.5'>
                        <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base rounded flex justify-between items-center py-4'>
                            <div>
                                {displayPriceInRupees(totalPrice)}
                            </div>
                            {

                            }
                            <button onClick={handleRedirectoCheckOutPage} className='flex items-center gap-1'>Proceed <span><FaCaretRight/></span></button>
                        </div>
                    </div>
                )
            }
            
        </div>
    </section>
  )
}

export default DisplayCartItems