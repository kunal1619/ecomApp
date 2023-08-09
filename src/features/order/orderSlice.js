import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { addOrder, fetchAllOrders, updateOrder } from "./orderAPI"


const initialState = {
  orders: [],
  allOrders: [],
  status: "idle",
  currentOrder : false
}

export const placeOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (orderData) => {
    const response = await addOrder(orderData)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async () => {
    const response = await fetchAllOrders()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const updatedOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async () => {
    const response = await updateOrder()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {

      state.value += 1
    },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.orders.push(action.payload)
        state.currentOrder = action.payload
      })
      .addCase(placeOrderAsync.rejected, (state) => {
        state.status = "failed"
      })

      //fetch all orders
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.allOrders = action.payload
      })
      .addCase(fetchAllOrdersAsync.rejected, (state) => {
        state.status = "failed"
      })


      //fetch all orders
      .addCase(updatedOrderAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updatedOrderAsync.fulfilled, (state, action) => {
        state.status = "idle"
        const index = state.orders.findIndex((elm)=> elm.id === action.payload.id)
         state.item.splice(1, index)
      })
      .addCase(updatedOrderAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { increment } = counterSlice.actions

export const selectPlacedOrders = (state) => state.order.orders;
export const selectCurentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.allOrders;


export default counterSlice.reducer;
