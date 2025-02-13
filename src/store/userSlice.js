import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    verify_email: "",
    last_login: "",
    active_status: "",
    address_details: [],
    shopping_cart: [],
    orderHistory: [],
    role: "",

}


const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action)=>{
            // state = {...action.payload}
            state._id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.avatar = action.payload?.avatar;
            state.mobile = action.payload?.mobile;
            state.verify_email = action.payload?.verify_email;
            state.last_login = action.payload?.last_login;
            state.active_status = action.payload?.active_status;
            state.address_details = action.payload?.address_details;
            state.orderHistory = action.payload?.orderHistory;
            state.shopping_cart = action.payload?.shopping_cart;
            state.role = action.payload?.role;
        },

        updateAvatar: (state, action)=>{
            state.avatar = action.payload;
        },

        logout: (state, action)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.avatar = "";
            state.mobile = "";
            state.verify_email = "";
            state.last_login = "";
            state.active_status = "";
            state.address_details = [];
            state.orderHistory = [];
            state.shopping_cart = [];
            state.role = "";
        }
    }

    
})

export const {setUserDetails, updateAvatar, logout} = userSlice.actions;

export default userSlice.reducer;