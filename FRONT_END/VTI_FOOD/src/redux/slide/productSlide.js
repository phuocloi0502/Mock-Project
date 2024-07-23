// file demo, không dùng
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import productService from "../../services/productService";
import { toast } from "react-hot-toast";
// get all
export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ pageNumber, search }, thunkAPI) => {
    const data = (await productService.getAll(pageNumber, search)).data;
    thunkAPI.dispatch(changeTotalElements(data.totalElements));
    return data.content;
  }
);

//get by Id
export const getById = createAsyncThunk("getProductById", async (id) => {
  const data = (await productService.getById(id)).data;

  return data;
});
//get by Category Id
export const getByCategoryId = createAsyncThunk(
  "getByCategoryId",
  async ({ id, pageNumber }, thunkAPI) => {
    const data = (await productService.getByCategoryId(id, pageNumber)).data;
    thunkAPI.dispatch(changeTotalElements(data.page.totalElements));
    return data._embedded.productDTOList;
  }
);

// upload Product Image
export const upLoadProductImage = createAsyncThunk(
  "upLoadProductImage",
  async ({ productId, formData }, thunkAPI) => {
    try {
      const data = (
        await productService.uploadProductImage(productId, formData)
      ).data;
      console.log(data);
      const state = thunkAPI.getState();
      const totalElements = state.productSlide.totalElements;
      console.log(totalElements, "totalElements");
      if (totalElements % 8 == 0) {
        thunkAPI.dispatch(changePageCurrent(Math.floor(totalElements / 8)));
      } else {
        const page = Math.floor(totalElements / 8) + 1;
        thunkAPI.dispatch(changePageCurrent(page));
      }
      const page = Math.floor(totalElements / 8) + 1;
      thunkAPI.dispatch(changePageCurrent(page));
      thunkAPI.dispatch(getAllProducts({ pageNumber: page, search: "" }));
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// create product
export const createProduct = createAsyncThunk(
  "createProduct",
  async (body, thunkAPI) => {
    try {
      const data = (await productService.create(body)).data;
      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, body }, thunkAPI) => {
    try {
      const data = (await productService.update(id, body)).data;
      thunkAPI.dispatch(getById(id));

      return data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete product
export const deleteProductById = createAsyncThunk(
  "deleteProductById",
  async (id, thunkAPI) => {
    try {
      const dataDelete = (await productService.delete(id)).data;
      const state = thunkAPI.getState();
      let pageCurrent = state.productSlide.pageCurrent;

      thunkAPI.dispatch(
        getAllProducts({ pageNumber: pageCurrent, search: "" })
      );
      const listProduct = state.productSlide.listProduct;
      console.log(listProduct, "listProduct");
      if (listProduct.length == 1) {
        pageCurrent = pageCurrent - 1;
        thunkAPI.dispatch(
          getAllProducts({ pageNumber: pageCurrent, search: "" })
        );
      }

      thunkAPI.dispatch(
        getAllProducts({ pageNumber: pageCurrent, search: "" })
      );
      return dataDelete;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const productSlide = createSlice({
  name: "productSlide",
  initialState: {
    listProduct: [],
    listProductByCategoryId: [],
    productById: {},
    totalElements: 0,
    pageCurrent: 1,
    loading: false,
    createdData: [],
    resultData: [],
  },
  reducers: {
    changeCategoryId: (state, action) => {
      // state.categoryId = action.payload;
    },
    changeTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    changePageCurrent: (state, action) => {
      state.pageCurrent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get all product
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.listProduct = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
    });
    // get product by id
    builder.addCase(getById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.loading = false;
      state.productById = action.payload;
    });
    builder.addCase(getById.rejected, (state, action) => {
      state.loading = false;
    });

    // get  product by category id
    builder.addCase(getByCategoryId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getByCategoryId.fulfilled, (state, action) => {
      state.loading = false;
      state.listProductByCategoryId = action.payload;
    });
    builder.addCase(getByCategoryId.rejected, (state, action) => {
      state.loading = false;
      console.log("rejected");
      state.listProductByCategoryId = [];
    });

    //delete  product by category id
    builder.addCase(deleteProductById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProductById.rejected, (state, action) => {
      state.loading = false;
      console.log("rejected");
    });

    // create product
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.createdData = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
    });

    // update product
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      //state.createdData = action;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { changePageCurrent, changeCategoryId, changeTotalElements } =
  productSlide.actions;
export default productSlide.reducer;
