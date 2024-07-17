import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../../services/cartService";
import { message } from "antd";
import { toast } from "react-hot-toast";

//create cart
export const addProductsToCart = createAsyncThunk(
  "addProductsToCart",
  async (body, thunkAPI) => {
    try {
      const data = (await cartService.create(body)).data;
      console.log(data, "data cart added");
      toast.success("Đã thêm");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCartInfoById = createAsyncThunk(
  "getCartInfoById",
  async (id, thunkAPI) => {
    try {
      const data = (await cartService.getCartById(id)).data;
      console.log(data, "data cart by id");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const cartSlide = createSlice({
  name: "cartSlide",
  initialState: {
    loading: false,
    dataCartById: [],
  },
  reducers: {
    // changeIsLogin: (state, action) => {
    //   state.isLogin = action.payload;
    // },
    // changeUserName: (state, action) => {
    //   state.userName = action.payload;
    // },
    // setUserId: (state, action) => {
    //   state.userId = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // add product to cart
    builder.addCase(addProductsToCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProductsToCart.fulfilled, (state, action) => {
      state.loading = false;
      //state.userById = action.payload;
    });
    builder.addCase(addProductsToCart.rejected, (state, action) => {
      state.loading = false;
    });

    // get cart info by id
    builder.addCase(getCartInfoById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCartInfoById.fulfilled, (state, action) => {
      state.loading = false;
      state.dataCartById = action.payload;
    });
    builder.addCase(getCartInfoById.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const {} = cartSlide.actions;
export default cartSlide.reducer;
