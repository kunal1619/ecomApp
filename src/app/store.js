import { configureStore } from "@reduxjs/toolkit"
import productReducer from '../features/productList/ProductSlice'
import authReducer from "../features/auth/authSlice"
import cartReducer from "../features/cart/CartSlice"
import orderReducer from "../features/order/orderSlice"
import userOrderReducer from "../features/user/userSlice"
import userInfoReducer from "../features/user/userSlice"


export const store = configureStore({
  reducer:{
    product : productReducer,
    auth : authReducer,
    cart : cartReducer,
    order : orderReducer,
    userOrder : userOrderReducer,
    userInfo : userInfoReducer

  }
})
