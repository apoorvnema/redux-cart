import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import notificationSlice from "./uiSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        notification: notificationSlice,
    }
})

export default store