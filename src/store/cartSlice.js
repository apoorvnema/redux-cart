import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    showCart: false,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += action.payload.price;
            } else {
                state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price })
            }
            state.totalQuantity++;
        },
        removeFromCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity--;
                if (existingItem.quantity === 0) {
                    state.items = state.items.filter(item => item.id !== action.payload);
                }
                state.totalQuantity--;
                if (state.totalQuantity < 0) {
                    state.totalQuantity = 0;
                }
                if (state.totalQuantity === 0) {
                    state.showCart = false;
                }
            }
        },
        toggleCart: (state) => {
            if(state.totalQuantity <= 0){
                return;
            }
            state.showCart = !state.showCart
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

