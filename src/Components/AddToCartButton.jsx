import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Provider/GlobalProvider';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import Loading from "../Components/Loading";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';

function AddToCartButton({ data }) {

    const {fetchCartItem, updateCartQty, deleteCartItem} = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const cartItem = useSelector(state=>state.cartItem.cart);
    const [isAvailableCart, setIsAvailableCart] = useState(false);
    const [cartIntemDetails, setcartItemDetails] = useState();
    const [qty, setQty] = useState(0);
    

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setLoading(true);

            const response = await api.post(ApiRoutes.addToCart.path,{productId: data?._id}, {authenticate: ApiRoutes.addToCart.authenticate});

            const { data: responseData } = response;

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItem){
                    fetchCartItem();
                }
            }
        } catch (error) {
            toast.error(error.response?.data.message || "Internal Server Error");
        }finally{
            setLoading(false);
        }
    }

    const increaseQty = async (e)=>{
        e.preventDefault();
        e.stopPropagation();

        const res = await updateCartQty(cartIntemDetails?._id, qty+1);

        if(res.success){
            toast.success("Item Added");
        }
    }

    const decreaseQty = async (e)=>{
        e.preventDefault();
        e.stopPropagation();

        if(qty === 1){
            deleteCartItem(cartIntemDetails?._id)
            toast.success("Item Removed")
        }else{
            const res = await updateCartQty(cartIntemDetails?._id, qty-1);
            if(res.success){
                toast.success("Item Removed");
            }
        }

        
    }

    useEffect(()=>{
        const checkingItem = cartItem.some(item => item?.productId?._id === data?._id);
        setIsAvailableCart(checkingItem);

        const product = cartItem.find(item => item?.productId?._id === data?._id);
        setQty(product?.quantity);
        setcartItemDetails(product)
    }, [data, cartItem])

  return (
    <div className='w-full max-w-[150px]'>
        {
            isAvailableCart ? (
                <div className='flex items-center'>
                    <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus/></button>
                    <p className=' flex-1 w-full px-1 font-semibold text-center'>{qty}</p>
                    <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus/></button>
                </div>
            ) : (
                <button onClick={handleAddToCart} className='bg-green-500 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded '>
                    {
                        loading ? <Loading/> : "Add"
                    }
                </button>
            )
        }
        
    </div>
  )
}

export default AddToCartButton