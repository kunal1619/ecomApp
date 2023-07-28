import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { fetchProductItem } from "./ProductListApi"


const initialState = {
  value: 0,
  status: "idle",
}

export const incrementAsync = createAsyncThunk(
  "counter/fetchProductItem",
  async (amount) => {
    const response = await fetchProductItem(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.value += action.payload
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { increment } = productSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;


export default productSlice
