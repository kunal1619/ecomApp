import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { createProduct, fetchPaginationData, fetchProductByFilter, fetchProductItem, fetchSelectedProduct, fetchShortedProduct, updateProduct } from "./ProductListApi"


const initialState = {
  product: [],
  selectedProduct : null,
  status: "idle",
}

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchProductItem",
  async () => {
    const response = await fetchProductItem()
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)


export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async (filter) => {
    const response = await fetchProductByFilter(filter)
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data.products);
    return response.data.products
  },
)

export const fetchSortedProductAsync = createAsyncThunk(
  "product/fetchShortedProduct",
  async (sortBy)=>{
    const response = await fetchShortedProduct(sortBy)
    return response.data.products
  }
)


export const fetchPageNumberDataAsync = createAsyncThunk(
  "product/fetchPaginationData",
  async (pageData)=>{
    const response = await fetchPaginationData(pageData)
    return response.data.products
    
  }
)

export const fetchSelectedProductAsync = createAsyncThunk(
  "product/fetchSelectedProduct",
  async (id)=>{
    const response = await fetchSelectedProduct(id)
    return response.data
    
  }
)

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product)=>{
    const response = await createProduct(product)
    return response.data
    
  }
)

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product)=>{
    const response = await updateProduct(product)
    return response.data
    
  }
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
    //for main products
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.product = action.payload
      })
      .addCase(fetchAllProductsAsync.rejected, (state) => {
        state.status = "failed"
      })

       //for filterd products
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.product = action.payload
      })
      .addCase(fetchProductByFilterAsync.rejected, (state) => {
        state.status = "failed"
      })

      //for sorted products
      .addCase(fetchSortedProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchSortedProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.product = action.payload
      })
      .addCase(fetchSortedProductAsync.rejected, (state) => {
        state.status = "failed"
      })

      //for pagination
      .addCase(fetchPageNumberDataAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPageNumberDataAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.product = action.payload
      })
      .addCase(fetchPageNumberDataAsync.rejected, (state) => {
        state.status = "failed"
      })

      //for Selectd product
      .addCase(fetchSelectedProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchSelectedProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.selectedProduct = action.payload
      })
      .addCase(fetchSelectedProductAsync.rejected, (state) => {
        state.status = "failed"
      })

      //add product
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.product.push(action.payload)
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.status = "failed"
      })

      //add product
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.product.findIndex((elm)=> elm.id === action.payload.id)
        state.product[index] = action.payload
      })
      .addCase(updateProductAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.product;
export const selectedProductById = (state) => state.product.selectedProduct;



export default productSlice.reducer;
