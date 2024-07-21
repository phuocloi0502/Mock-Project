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

// getCartInfoById
export const getCartInfoById = createAsyncThunk(
  "getCartInfoById",
  async (userId, thunkAPI) => {
    try {
      const data = (await cartService.getCartDetailByUserId(userId)).data;
      //  console.log(data, "data cart by user id");
      console.log("changeCartNumber", data.length);
      thunkAPI.dispatch(changeCartNumber(data.length));
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// update cart
export const updateCart = createAsyncThunk(
  "updateCart",
  async (body, thunkAPI) => {
    try {
      await cartService.updateCart(body);
      thunkAPI.dispatch(getCartInfoById(body.userId));
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// deleteProductFromCart
export const deleteProductFromCart = createAsyncThunk(
  "deleteProductFromCart",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      await cartService.deleteProductFromCart(cartId, productId);
      const state = thunkAPI.getState();
      const userId = state.cartSlide.dataCartByUserId[0].userId;
      thunkAPI.dispatch(getCartInfoById(userId));
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlide = createSlice({
  name: "cartSlide",
  initialState: {
    loading: false,
    dataCartByUserId: [],
    addedProduct: [],
    cartNumber: 0,
  },
  reducers: {
    changeCartNumber: (state, action) => {
      state.cartNumber = action.payload;
    },
    changeDataCartByUserId: (state, action) => {
      state.dataCartByUserId = action.payload;
    },
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
      state.addedProduct = action.payload;
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
      state.dataCartByUserId = action.payload;
    });
    builder.addCase(getCartInfoById.rejected, (state, action) => {
      state.loading = false;
    });

    // deleteProductFromCart
    builder.addCase(deleteProductFromCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProductFromCart.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { changeCartNumber, changeDataCartByUserId } = cartSlide.actions;
export default cartSlide.reducer;
