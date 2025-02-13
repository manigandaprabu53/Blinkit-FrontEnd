import React from 'react'
import { useGlobalContext } from '../Provider/GlobalProvider';
import { FaShoppingCart } from 'react-icons/fa';
import displayPriceInRupees from '../Utils/displayPriceInRupees';
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CartMobile() {

    const {totalPrice, totalQty} = useGlobalContext();
    const cartItem = useSelector(state=>state.cartItem.cart);

  return (

    <>
        {
            cartItem[0] && (
                <div className="sticky bottom-4 p-2">
                    <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden">
                        <div className='flex gap-2 items-center'>
                            <div className='p-2 bg-green-500 w-fit rounded'>
                                <FaShoppingCart/>
                            </div>
                            <div className='text-xs'>
                                <p>{totalQty} Items</p>
                                <p>{displayPriceInRupees(totalPrice)}</p>
                            </div>
                        </div>
                        <Link to={"/cart"} className='flex items-center gap-1'>
                            <span>View Cart</span>
                            <FaAngleRight/>
                        </Link>
                    </div>
                </div>
            )
        }
    </>
    
  )
}

export default CartMobile