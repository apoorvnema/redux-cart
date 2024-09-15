import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
    items: [],
    showCart: false,
    totalQuantity: 0,
    changed: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        replaceCart: (state, action) => {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
            state.showCart = action.payload.showCart;
        },
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += action.payload.price;
            } else {
                state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price })
            }
            state.totalQuantity++;
            state.changed = true;
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
            state.changed = true;
        },
        toggleCart: (state) => {
            if(state.totalQuantity <= 0){
                return;
            }
            state.showCart = !state.showCart
        }
    }
})

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({ status: 'pending', title: 'Sending...', message: 'Sending cart data!' }));
        const sendRequest = async () => {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}cart.json`, {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, showCart: cart.showCart, totalQuantity: cart.totalQuantity})
            })

            if (!response.ok) {
                throw new Error('Sending cart data failed.')
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({ status: 'success', title: 'Success!', message: 'Sent cart data successfully!' }));
        } catch (error) {
            console.log(error.message);
            dispatch(uiActions.showNotification({ status: 'error', title: 'Error!', message: 'Sending cart data failed!' }));
        }
    }
}

export const getCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}cart.json`);

            if (!response.ok) {
                throw new Error('Fetching cart data failed.')
            }

            const data = await response.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

