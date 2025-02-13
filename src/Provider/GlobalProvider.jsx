import { createContext, useContext, useEffect, useState } from "react";
import api from "../Service/ApiService";
import ApiRoutes from "../Utils/ApiRoutes";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { handleAddItemCart } from "../store/cartProduct.js";
import { handleAddAddress } from "../store/addressSlice.js";
import priceWithDiscount from "../Utils/priceWithDiscount";
import { setOrder } from "../store/orderSlice";


export const globalContext = createContext(null)

export const useGlobalContext = ()=>useContext(globalContext)

const GlobalProvider = ({children})=>{
    
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [priceWithOutDiscount, setPriceWithOutDiscount] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const cartItem = useSelector(state=>state.cartItem.cart);
    const user = useSelector(state => state.user);

    const fetchCartItem = async () =>{
        try {
            const response = await api.get(ApiRoutes.getCartItem.path);
            const { data: responseData } = response;
            
            if(responseData.success){
            dispatch(handleAddItemCart(responseData.data));
            }
    
        } catch (error) {
            console.log(error);
        }
    }

    const updateCartQty = async (id, qty)=>{
        try {
            const response = await api.put(ApiRoutes.updateCartItem.path, {_id: id, qty: qty});

            const {data: responseData} = response;

            if(responseData.success){
                // toast.success(responseData.message);
                fetchCartItem();
                return responseData;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    }

    const deleteCartItem = async (cartId)=>{
        try {
            
            const response = await api.delete(`${ApiRoutes.deleteCartItem.path}/?id=${cartId}`);

            const {data: responseData} = response;

            if(responseData.success){
                // toast.success(responseData.message);
                fetchCartItem();
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    }

    const handleLogoutProvider = ()=>{
        localStorage.clear();
        dispatch(handleAddItemCart([]))
    }

    const fetchAddress = async ()=>{
        try {
            
            const response = await api.get(ApiRoutes.getAddress.path);
            console.log("Address: ", response)
            const { data: responseData } = response;

            if(responseData.success){
                dispatch(handleAddAddress(responseData.data))
            }

        } catch (error) {
            console.log(error); 
        }
    }

    const fetchOrder = async ()=>{
        try {
            
            const response = await api.get(ApiRoutes.getOrderItem.path);

            const {data: responseData} = response;

            if(responseData.success){
                console.log("Response Data From Orders: ", response)
                dispatch(setOrder(responseData.data));
            }

        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(()=>{
        fetchCartItem();
    }, [])

    useEffect(()=>{
        const qty = cartItem.reduce((prev, curr)=>{
        return prev + curr.quantity
        }, 0)
        setTotalQty(qty)

        const price = cartItem.reduce((prev, curr)=>{
        return prev + (priceWithDiscount(curr?.productId?.price, curr?.productId?.discount) * curr?.quantity)
        }, 0)
        setTotalPrice(price)
        
        const priceWithNoDiscount = cartItem.reduce((prev, curr)=>{
        return prev + (curr?.productId?.price * curr?.quantity)
        }, 0)
        setPriceWithOutDiscount(priceWithNoDiscount)
    }, [cartItem])

    useEffect(()=>{
        fetchCartItem();
        fetchAddress();
        fetchOrder();
        // handleLogoutProvider();
    }, [user])
    
    return (


        <globalContext.Provider value={{fetchCartItem, updateCartQty, deleteCartItem, handleLogoutProvider, fetchAddress, fetchOrder, totalPrice, totalQty, priceWithOutDiscount}}>
            {children}
        </globalContext.Provider>
    )
}

export default GlobalProvider;