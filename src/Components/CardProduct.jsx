import React, { useState } from 'react'
import displayPriceInRupees from '../Utils/displayPriceInRupees'
import { Link } from 'react-router-dom'
import validateURL from '../Utils/validateURL'
import Header from './Header'
import priceWithDiscount from '../Utils/priceWithDiscount'
import { toast } from 'react-hot-toast'
import api from '../Service/ApiService'
import ApiRoutes from '../Utils/ApiRoutes'
import {useGlobalContext} from "../Provider/GlobalProvider";
import AddToCartButton from './AddToCartButton'

function CardProduct({data}) {

    const url = `/product/${validateURL(data.name)}-${validateURL(data._id)}`;
    const [loading, setLoading] = useState(false);
    



  return (
    <>
        <Link to={url} className='border lg:min-w-48 lg:p-4 grid gap-2 lg:gap-3 min-w-36 rounded py-2 bg-white'>
            <div className='min-h-20 max-h-24 lg:max-h-32 rounded'>
                <img src={data.image[0]} alt="Product Images" className='h-full w-full object-scale-down scale-75 lg:scale-120 overflow-hidden'/>
            </div>
            <div className='flex items-center gap-1'>
                <div className='bg-blue-100 text-xs rounded w-fit p-0.5 px-2 text-green-600'>
                    10 Min
                </div>
                <div>
                    {
                        Boolean(data.discount) && (
                            <p className='text-green-600 bg-blue-100 w-fit px-2 text-xs rounded-full'>{data.discount}% discount</p>
                        )
                    }
                </div>
            </div>
            <div className='text-ellipsis line-clamp-2 font-medium text-sm px-1 lg:text-base lg:px-0'>
                {data.name}
            </div>
            <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
                {data.unit}
            </div>

            <div className='flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base px-2 lg:px-0'>
            <div className='flex items-center gap-1'>
                <div className='font-semibold text-sm'>{displayPriceInRupees(priceWithDiscount(data.price, data.discount))}</div>
                
            </div>
            <div className=''>
                {
                    data.stock == 0 ? (
                        <p className='text-red-500 text-sm text-center'>Out Of Stock</p>
                    ) : (
                        <AddToCartButton data={data}/>
                    )
                }
                
            </div>
            </div>
        </Link>

    </>
  )
}

export default CardProduct