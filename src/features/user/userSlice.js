import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {  deletUserAddress, editUserAddress, fetchAndUpdateUserAddress, fetchAndUpdateUserInfo, fetchUserAddresses, fetchUserOrders, fetchuserinfo } from "./userAPI"


const initialState = {
  userOrders: [],
  userInfo : null,
  userAddress : [],
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

export const fetchUserInfoAsync = createAsyncThunk(
  "user/fetchuserinfo",
  async (userid) => {
    const response = await fetchuserinfo(userid)
    return response.data
  },
)

export const fetchUserAddressesAsync = createAsyncThunk(
  "user/fetchAndUpdateUserAddress",
  async (userId) => {
    const response = await fetchAndUpdateUserAddress(userId)
    return response.data
  },
)

export const fetchUserAllAddressesAsync = createAsyncThunk(
  "user/fetchUserAddresses",
  async (userId) => {
    const response = await fetchUserAddresses(userId)
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

export const editUserAddressAsync = createAsyncThunk(
  "user/editUserAddress",
  async (address) => {
    const response = await editUserAddress(address)
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

      //userInfo post

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
      //userInfo post

      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo = action.payload
      })
      .addCase(fetchUserInfoAsync.rejected, (state) => {
        state.status = "failed"
      })


      //post adddress

      .addCase(fetchUserAddressesAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserAddressesAsync.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(fetchUserAddressesAsync.rejected, (state) => {
        state.status = "failed"
      })

      //fetch all adddress

      .addCase(fetchUserAllAddressesAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserAllAddressesAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userAddress = action.payload;
      })
      .addCase(fetchUserAllAddressesAsync.rejected, (state) => {
        state.status = "failed"
      })

      //edit address
      .addCase(editUserAddressAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(editUserAddressAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userAddress = action.payload;
      })
      .addCase(editUserAddressAsync.rejected, (state) => {
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
export const selectUserAddresses = (state) => state.userAddress.userAddress;


export default counterSlice.reducer;
