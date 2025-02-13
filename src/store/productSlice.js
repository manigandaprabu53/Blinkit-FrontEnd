import {createSlice} from "@reduxjs/toolkit";

const intialValue = {
    allCategory : [],
    loadingCategory: false,
    allSubCategory : [],
    product : [],
}

const productSclice = createSlice({
    name: "product",
    initialState: intialValue,
    reducers: {
        setAllCategory: (state, action)=>{
            state.allCategory = [...action.payload];
        },

        setAllSubCategory: (state, action)=>{
            state.allSubCategory = [...action.payload];
        },

        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload;
        }
    }
})

export const {setAllCategory, setAllSubCategory, setLoadingCategory} = productSclice.actions;

export default productSclice.reducer;