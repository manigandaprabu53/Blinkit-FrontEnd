import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addressList: []
}

const addressSlice = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {

        handleAddAddress: (state, action) => {
            state.addressList = [...action.payload]
            
        }

    }
})

export const { handleAddAddress } = addressSlice.actions

export default addressSlice.reducer