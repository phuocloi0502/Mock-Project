import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../../services/categoryService";

// get all
export const getAll = createAsyncThunk("get", async () => {
  const data = (await categoryService.getAll()).data;
  return data.content;
});
export const getById = createAsyncThunk("getCategoryById", async (id) => {
  const data = (await categoryService.getById(id)).data.name;
  return data;
});

// create
export const createCategory = createAsyncThunk(
  "createCategory",
  async (body, thunkAPI) => {
    const data = (await categoryService.create(body)).data;
    thunkAPI.dispatch(getAll());
    return data;
  }
);

// update
export const updateCategory = createAsyncThunk(
  "update",
  async (body, thunkAPI) => {
    const data = (await categoryService.update(body.id, body)).data;
    thunkAPI.dispatch(getAll());
    return data;
  }
);

// delete
export const deleteById = createAsyncThunk("delete", async (id, thunkAPI) => {
  const dataDelete = (await categoryService.delete(id)).data;
  thunkAPI.dispatch(getAll());
  return dataDelete;
});

export const categorySlide = createSlice({
  name: "categorySlide",
  initialState: {
    listCategory: [],
    categoryName: "",
    loading: false,
  },
  reducers: {
    changeCategoryId: (state, action) => {
      // state.categoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get all category
    builder.addCase(getAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.loading = false;
      state.listCategory = action.payload;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.loading = false;
    });
    //get by id
    builder.addCase(getById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryName = action.payload;
    });
    builder.addCase(getById.rejected, (state, action) => {
      state.loading = false;
    });

    // create
    builder.addCase(createCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      //state: thuộc tính của slide
      // action.payload: data trả về
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
    });
    // create ---
  },
});

export const { changeCategoryId } = categorySlide.actions;
export default categorySlide.reducer;
