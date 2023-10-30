import { createSlice } from "@reduxjs/toolkit";


// initial state 
 const initialState = {
    products: [],
    amount: 6,
    total: 0
 };

 const productSlice = createSlice({
    name:'product',
    initialState
 });

 export default productSlice.reducer