import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    showCart: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        toggleCart: (state) => {
            state.showCart = !state.showCart
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

