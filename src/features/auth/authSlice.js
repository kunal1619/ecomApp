import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {  createNewUser, fetchLoginUser, logOutUser } from "./authApi"


const initialState = {
  status: "idle",
  logedInUserData : null,
  loginData : null
}


export const signUpUserInfoAsync = createAsyncThunk(
  "user/createNewUser",
  async (userInfo) => {
    const response = await createNewUser(userInfo)
    return response.data
  },
)

export const loginUserAsync = createAsyncThunk(
  "user/fetchLoginUser",
  async (userInfo) => {
    const response = await fetchLoginUser(userInfo)
    return response.data
  },
)

export const logOutUserAsync = createAsyncThunk(
  "user/logOutUser",
  async (userId) => {
    const response = await logOutUser(userId)
    return response.data
  },
)



export const counterSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    increment: (state) => {

      state.value += 1
    },
   
  },

  extraReducers: (builder) => {
    builder
    //sign up
      .addCase(signUpUserInfoAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(signUpUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.logedInUserData = action.payload
      })
      .addCase(signUpUserInfoAsync.rejected, (state) => {
        state.status = "failed"
      })

      //login
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loginData = action.payload
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "failed"
      })


      //logout
      .addCase(logOutUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(logOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loginData = null
      })
      .addCase(logOutUserAsync.rejected, (state) => {
        state.status = "failed"
      })

      
  },
})

export const { increment } = counterSlice.actions

export const selectCreatedUser = (state) => state.auth.logedInUserData;
                                                  //auth sotore se aa rha hai
export const selectLogedInUser = (state) => state.auth.loginData
export const loader = (state) => state.auth.status

export default counterSlice.reducer;
