import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { message } from "antd";
//get user by id
export const getUserById = createAsyncThunk(
  "getUserById",
  async (id, thunkAPI) => {
    const data = (await userService.getById(id)).data;
    // console.log(data);
    return data;
  }
);
// get all user
export const getAllUser = createAsyncThunk(
  "getAllUser",
  async ({ pageNumber }, thunkAPI) => {
    const data = (await userService.getAll(pageNumber)).data;
    console.log(data);
    return data;
  }
);
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, body }, thunkAPI) => {
    try {
      const data = (await userService.update(id, body)).data;
      thunkAPI.dispatch(getUserById(id));
      message.success("Updated");
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Ném lỗi để createAsyncThunk có thể xử lý
    }
  }
);

export const userSlide = createSlice({
  name: "userSlide",
  initialState: {
    isLogin: false,
    userName: "",
    userId: "",
    userById: {},
    listUser: [],
    role: "",
  },
  reducers: {
    changeIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },

    changeUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get user by id
    builder.addCase(getUserById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.userById = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
    });
    // get all user
    builder.addCase(getAllUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.loading = false;
      state.listUser = action.payload;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.loading = false;
    });
    // update user
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userById = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { changeIsLogin, changeUserName, setUserId, setRole } =
  userSlide.actions;
export default userSlide.reducer;
