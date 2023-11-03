import { createSlice } from "@reduxjs/toolkit";


// initial state 
const initialState = {
    cart: [],
    amount: 6,
    total: 0
 };

const productSlice = createSlice({
   name:'cart',
   initialState,
   reducers: {

      addToCart(state, action) {
         const itemsInCart = state.cart.findIndex( (item)=> item._id === action.payload._id );
         if (itemsInCart >= 0) {
            itemsInCart.cartQuantity ++;
         } else {
            const tempProduct = { ...action.payload, cartQuantity: 1};
            state.cart.push(tempProduct)
         };
      },

      incrementQuantity: (state, action) => {
         const item = state.cart.find((item) => item._id === action.payload)
         item.cartQuantity ++
      }, 

      decrementQuantity: (state, action) => {
         const item = state.cart.find( (item) => item._id === action.payload)

         if (item.cartQuantity === 1) {
            item.cartQuantity = 1
         } else {
            item.cartQuantity --;
         }
      },

      removeItem: (state, action) => {
         const removeItem = state.cart.filter( (item) => item.i_d !== action.payload) 
         state.cart = removeItem;
      }
   },
});

export const {addToCart, incrementQuantity, decrementQuantity, removeItem} = productSlice.actions;
export default productSlice.reducer