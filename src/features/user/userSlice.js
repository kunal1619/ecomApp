import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {  deletUserAddress, fetchAndUpdateUserInfo, fetchUserOrders } from "./userAPI"


const initialState = {
  userOrders: [],
  userInfo : null,
  status: "idle",
}

export const fetchUserOrdersAsync = createAsyncThunk(
  "userOrder/fetchUserOrders",
  async (userId) => {
    const response = await fetchUserOrders(userId)
    return response.data
  },
)


export const updateUserInfoAsync = createAsyncThunk(
  "user/fetchAndUpdateUserInfo",
  async (userInfo) => {
    const response = await fetchAndUpdateUserInfo(userInfo)
    return response.data
  },
)

export const deleteUserAddressAsync = createAsyncThunk(
  "user/deletUserAddress",
  async (userId) => {
    const response = await deletUserAddress(userId)
    return response.data
  },
)

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userOrders = action.payload
      })
      .addCase(fetchUserOrdersAsync.rejected, (state) => {
        state.status = "failed"
      })

      //userInfo fetch and update
      //address
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo = action.payload
      })
      .addCase(updateUserInfoAsync.rejected, (state) => {
        state.status = "failed"
      })
      //delete address
      .addCase(deleteUserAddressAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo.addresses.splice(action.payload, 1)
      })
      .addCase(deleteUserAddressAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { increment } = counterSlice.actions


export const selectFetchedUserOrder = (state) => state.userOrder.userOrders;
export const selectUserInfo = (state) => state.userInfo.userInfo;


export default counterSlice.reducer;
