import React, { useEffect } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import AppRoutes from "./Utils/AppRoutes";
import getUserDetails from "./Utils/getUserDetails.js";
import {setUserDetails} from "./store/userSlice.js";
import { useDispatch } from "react-redux";
import {setAllCategory, setAllSubCategory, setLoadingCategory} from "./store/productSlice.js";
import ApiRoutes from "./Utils/ApiRoutes.jsx";
import api from "./Service/ApiService.jsx";
import toast from "react-hot-toast";
import { handleAddItemCart } from "./store/cartProduct.js";
import GlobalProvider from "./Provider/GlobalProvider.jsx";
import { FaShoppingCart } from "react-icons/fa";
import displayPriceInRupees from "./Utils/displayPriceInRupees.js";
import CartMobile from "./Components/CartMobile.jsx";

function App() {

  const dispatch = useDispatch();
  const router = createBrowserRouter(AppRoutes);
  

  const getUserData = async ()=>{
    try {
      const userData = await getUserDetails();
      if(userData){
        dispatch(setUserDetails(userData?.data));
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Error Occured! Try Again Later");
    }
  }

  const fetchCategory = async () => {
    try {
        dispatch(setLoadingCategory(true));
        const response = await api.get(ApiRoutes.getCategory.path, {authenticate: ApiRoutes.getCategory.authenticate});
        const {data: responseData} = response;
        
        if(responseData.success){
          dispatch(setAllCategory(responseData.data))
        }
        
    } catch (error) {
      // toast.error(error.response?.data?.message || "Error Occured! Try Again Later");
    }finally{
      dispatch(setLoadingCategory(false));
    }
  }

  const fetchSubCategory = async () => {
    try {

        const response = await api.post(ApiRoutes.getSubCategory.path);

        const {data: responseData} = response;
        
        if(responseData.success){
          dispatch(setAllSubCategory(responseData.data))
        }
        
    } catch (error) {
      // toast.error(error.response?.data?.message || "Error Occured! Try Again Later");
    }
  }

  // const fetchCartItem = async () =>{
  //   try {
  //     const response = await api.get(ApiRoutes.getCartItem.path);
  //     const { data: responseData } = response;
      
  //     if(responseData.success){
  //       dispatch(handleAddItemCart(responseData.data));
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(()=>{
    getUserData();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem();
  }, [])

  
  return (
    <GlobalProvider>
      <RouterProvider router={router}/>
    </GlobalProvider>
  )
}

export default App
