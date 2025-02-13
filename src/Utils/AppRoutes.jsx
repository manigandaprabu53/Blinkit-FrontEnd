import {Navigate} from "react-router-dom";
import Home from "../Pages/Home";
import SearchPage from "../Pages/SearchPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import OTPVerification from "../Pages/OTPVerification";
import ResetPassword from "../Pages/ResetPassword";
import UserMenuMobile from "../Pages/UserMenuMobile";
import DashBoard from "../Layout/DashBoard";
import Profile from "../Pages/Profile";
import MyOrders from "../Pages/MyOrders";
import Addresses from "../Pages/Addresses";
import Category from "../Pages/Category";
import SubCategory from "../Pages/SubCategory";
import UploadProduct from "../Pages/UploadProduct";
import ProductAdmin from "../Pages/ProductAdmin";
import AdminPermission from "../Layout/AdminPermission";
import Product from "../Pages/Product";
import ProductList from "../Pages/ProductList";
import ProductDisplayPage from "../Pages/ProductDisplayPage";
import CartMobile from "../Pages/CartMobile";
import CheckOutPage from "../Pages/CheckOutPage";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";

const AppRoutes = [
    {
        path: "/home",
        element: <Home/>
    },

    {
        path: "/search",
        element: <SearchPage/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "register",
        element: <Register/>
    },

    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },

    {
        path: "/verify-OTP",
        element: <OTPVerification/>
    },

    {
        path: "/reset-password",
        element: <ResetPassword/>
    },

    {
        path: "/user",
        element: <UserMenuMobile/>
    },

    {
        path: "/dashboard/",
        element: <DashBoard/>,
        children: [
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "myorders",
                element: <MyOrders/>
            },
            {
                path: "address",
                element: <Addresses/>
            },
            {
                path: "category",
                element: <AdminPermission><Category/></AdminPermission>
            },
            {
                path: "subcategory",
                element: <AdminPermission><SubCategory/></AdminPermission>
            },
            {
                path: "product",
                element: <AdminPermission><ProductAdmin/></AdminPermission>
            },
            {
                path: "upload-product",
                element: <AdminPermission><UploadProduct/></AdminPermission>
            }
        ]
    },

    {
        path: ":category",
        children: [
            {
                path: ":subcategory",
                element: <ProductList/>
            }
        ]
    },

    {
        path: "product/:product",
        element: <ProductDisplayPage/>
    },

    {
        path: "cart",
        element: <CartMobile/>
    },

    {
        path: "checkout",
        element: <CheckOutPage/>
    },

    {
        path: "/success",
        element: <Success/>
    },
    {
        path: "/cancel",
        element: <Cancel/>
    },

    {
        path: "*",
        element: <Navigate to="/home" />
    }

]

export default AppRoutes;