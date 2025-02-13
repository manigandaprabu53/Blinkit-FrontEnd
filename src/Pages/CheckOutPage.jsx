import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from "../Components/Footer";
import AddAddress from "../Components/AddAddress";
import displayPriceInRupees from '../Utils/displayPriceInRupees';
import { useGlobalContext } from '../Provider/GlobalProvider';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../Service/ApiService';
import ApiRoutes from '../Utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";

function CheckOutPage() {

    const {priceWithOutDiscount, totalPrice, totalQty, fetchCartItem, fetchOrder} = useGlobalContext();
    const [openAddress, setOpenAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(0);
    const addressList = useSelector(state => state.addresses.addressList);
    const cartItem = useSelector(state=>state.cartItem.cart);
    const navigate = useNavigate();

    const handleCashOnDelivery = async ()=>{
        try {

            if(totalQty == 0){
                toast.error("No Items In Cart");
                navigate("/home");
                return
            }
            const response = await api.post(ApiRoutes.cashOnDelivery.path, {list_item: cartItem, totalAmt: totalPrice, addressId: addressList[selectedAddress]._id, subTotalAmt: totalPrice});

            const {data: responseData} = response;

            if(responseData.success){
                toast.success(responseData.message);
                if(fetchCartItem){
                    fetchCartItem();
                    navigate("/success", {state: {text: "Order"}});
                }
                if(fetchOrder){
                    fetchOrder();
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Internal Server Error");
        }
    }

    const handleOnlinePayment = async ()=>{
        try {
            toast.loading("Loading...");
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
            console.log("Stripe Key: ", stripePublicKey)
            const stripePromise = await loadStripe(stripePublicKey);
            const response = await api.post(ApiRoutes.payment_url.path, {list_item: cartItem, totalAmt: totalPrice, addressId: addressList[selectedAddress]?._id, subTotalAmt: totalPrice});
            
            const {data: responseData} = response;
            
            stripePromise.redirectToCheckout({ sessionId : responseData.id })
            if(fetchCartItem){
                fetchCartItem();
            }
            
            if(fetchOrder){
                fetchOrder();
            }
        } catch (error) {
            toast.error(error.response.data.message || "Internal Server Error");
        }
    }

  return (
    <>
        <Header/>

        <section className='min-h-[80vh] bg-blue-50'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                <div className='w-full'>
                    {/* Address Details */}

                    <h3 className='text-lg font-semibold'>Choose Your Address</h3>
                    <div className='bg-white p-2 grid gap-5'>
                        {
                            addressList?.map((address, index)=>{
                                return (
                                    <label htmlFor={"address"+index} key={"addressList"+index} className={address.status ? "" : "hidden"}>
                                        <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                            <div>
                                                <input type="radio" id={"address"+index} name='address' value={index} onChange={(e)=>setSelectedAddress(e.target.value)}/>
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.city} - {address.pincode}</p>
                                                <p>{address.mobile}</p>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                        
                        <div onClick={()=>setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                            Add Address
                        </div>

                    </div>

                </div>

                <div className='w-full max-w-md bg-white py-4 px-2'>
                    {/* Summary */}

                    <h3 className='text-lg font-semibold'>Summary</h3>

                    <div className="p-4">
                        <h3 className='font-semibold'>Bill Details</h3>

                        <div className='flex justify-between gap-4 ml-1'>
                            <p>Items Total</p>
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

                    <div className='w-full flex flex-col gap-4'>
                        <button onClick={handleOnlinePayment} className='px-4 py-2 bg-green-500 text-white font-semibold hover:bg-green-700 rounded'>Pay Online</button>
                        <button onClick={handleCashOnDelivery} className='px-4 py-2 border-2 border-green-600 text-green-600 font-semibold hover:bg-green-700 hover:text-white rounded'>Cash On Delivery</button>
                    </div>
                </div>
            </div>
            {
                openAddress && (
                    <AddAddress close={()=>setOpenAddress(false)}/>
                )
            }
        </section>
        
        <Footer/>
    </>
  )
}

export default CheckOutPage