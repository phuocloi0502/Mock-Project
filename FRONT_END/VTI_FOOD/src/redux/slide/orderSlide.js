import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";
//createOrder
export const createOrder = createAsyncThunk(
  "createOrder",
  async (body, thunkAPI) => {
    try {
      const data = (await orderService.create(body)).data;
      console.log(data, "created order");
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//getAllOrder
export const getAllOrder = createAsyncThunk("getAllOrder", async (thunkAPI) => {
  try {
    const data = (await orderService.getAll()).data;

    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
//getOrderByUserId
export const getOrderByUserId = createAsyncThunk(
  "getOrderByUserId",
  async (id, thunkAPI) => {
    try {
      const data = (await orderService.getOrderByUserId(id)).data;
      console.log(data, "getOrderByUserId");
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//getOrderById
export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (id, thunkAPI) => {
    try {
      const data = (await orderService.getById(id)).data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//getOrderDetailByOrderId
export const getOrderDetailByOrderId = createAsyncThunk(
  "getOrderById",
  async (id, thunkAPI) => {
    try {
      const data = (await orderService.getOrderDetailByOrderId(id)).data;
      //  console.log(data, "getOrderDetailByOrderId");
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//updateOrder
export const updateOrder = createAsyncThunk(
  "updateOrder",
  async ({ id, body }, thunkAPI) => {
    try {
      const data = (await orderService.update(id, body)).data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const orderSlide = createSlice({
  name: "orderSlide",
  initialState: {
    loading: false,
    listOrder: [],
    listOrderByUserId: [],
    listOrderDetailByOderId: [],
    dataOrderById: {},
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
    // createOrder
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      //state.listOrder = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
    });

    // get all order
    builder.addCase(getAllOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.listOrder = action.payload;
    });
    builder.addCase(getAllOrder.rejected, (state, action) => {
      state.loading = false;
    });
    // get order by User id
    builder.addCase(getOrderByUserId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.listOrderByUserId = action.payload;
    });
    builder.addCase(getOrderByUserId.rejected, (state, action) => {
      state.loading = false;
    });

    // get order detail by order id
    builder.addCase(getOrderDetailByOrderId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetailByOrderId.fulfilled, (state, action) => {
      state.loading = false;
      state.listOrderDetailByOderId = action.payload;
    });
    builder.addCase(getOrderDetailByOrderId.rejected, (state, action) => {
      state.loading = false;
    });

    // get order by id
    // builder.addCase(getOrderById.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(getOrderById.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.dataOrderById = action.payload;
    // });
    // builder.addCase(getOrderById.rejected, (state, action) => {
    //   state.loading = false;
    // });
  },
});
export const {} = orderSlide.actions;
export default orderSlide.reducer;
