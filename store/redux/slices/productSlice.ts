import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import getProducts from "@/actions/get-products";
import { Product, Response } from "@/types";

interface Query {
    categoryId?:string
    brandId?:string
    isFeatured?:boolean
}
// GET
export const getProductsAsync = createAsyncThunk<Product[], Query, { rejectValue: string }>(
  "prod/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: Response = await getProducts({});
      if (!response.state) {
        return rejectWithValue('Failed to fetch products');
      }
      return response.message;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export interface ProductState {
  products: Product[] | null;
  productsToShow: Product[] | null;
  banerDescription: string;
  productDetail: Product | null;
}

const initialState: ProductState = {
  products: null,
  productsToShow: null,
  banerDescription: "Todos nuestros productos",
  productDetail: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, { payload }) => {
      state.products = payload;
      state.productsToShow = payload;
    });
    builder.addCase(getProductsAsync.rejected, (state, action) => {
      // Manejo de errores si es necesario
      console.error(action.payload);
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
