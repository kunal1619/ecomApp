import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { fetchRemovedItem, fetchUpdatedItem, fetchUserCart, fetchUserCartTotalItems } from "./CartApi"


const initialState = {
  item : [],
  status: "idle",
}


export const userCartItemAsync = createAsyncThunk(
  "cart/fetchUserCart",
  async (userCartData) => {
    const response = await fetchUserCart(userCartData)
    return response.data
  },
)

export const fetchUserCartTotalItemsAsync = createAsyncThunk(
  "cart/fetchUserCartTotalItems",
  async (userId) => {
    const response = await fetchUserCartTotalItems(userId)
    return response.data
  },
)


export const fetchUserUpdatedProductAsync = createAsyncThunk(
  "cart/fetchUpdatedItem",
  async (updateData) => {
    const response = await fetchUpdatedItem(updateData)

    return response.data
  },
)


export const fetchRemovedItemAsync = createAsyncThunk(
  "cart/fetchRemovedItem",
  async (removeId) => {
    const response = await fetchRemovedItem(removeId)
    return response.data
  },
)

export const counterSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    increment: (state) => {

      state.value += 1
    },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(userCartItemAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(userCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.item.push(action.payload)
      })
      .addCase(userCartItemAsync.rejected, (state) => {
        state.status = "failed"
      })

      //fetchUserCartTotalIttems

      .addCase(fetchUserCartTotalItemsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserCartTotalItemsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.item = action.payload
      })
      .addCase(fetchUserCartTotalItemsAsync.rejected, (state) => {
        state.status = "failed"
      })
      //update data

      .addCase(fetchUserUpdatedProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserUpdatedProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        const index = state.item.findIndex((elm)=> elm._id === action.payload._id)
        state.item[index] = action.payload

        console.log(state.item, action.payload);
      })
      .addCase(fetchUserUpdatedProductAsync.rejected, (state) => {
        state.status = "failed"
      })
      //remove data

      .addCase(fetchRemovedItemAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchRemovedItemAsync.fulfilled, (state, action) => {
        state.status = "idle"
        const index = state.item.findIndex((elm)=> elm._id === action.payload._id)
        //  state.item.splice(1, index)
        state.item[index] = action.payload
        
      })
      .addCase(fetchRemovedItemAsync.rejected, (state) => {
        state.status = "failed"
      })

  },


})

export const { increment } = counterSlice.actions

export const selectUserCartTotalItems = (state) => state.cart.item;



export default counterSlice.reducer;
