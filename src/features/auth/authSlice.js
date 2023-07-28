import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { fetchUser } from "./authApi"


const initialState = {
  value: 0,
  status: "idle",
}


export const incrementAsync = createAsyncThunk(
  "counter/fetchUser",
  async (amount) => {
    const response = await fetchUser(amount)
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

export const { increment } = counterSlice.actions

export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
