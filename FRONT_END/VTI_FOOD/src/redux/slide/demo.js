// file demo, không dùng
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/demoService';


// get all
export const getAll = createAsyncThunk('get', async () => {
    const data = (await userService.getAll()).data;
    return data;
});
//get by Id
export const getById = createAsyncThunk('getById', async (id) => {
    const data = (await userService.getById(id)).data;
    return data;
});

// create
export const createUser = createAsyncThunk('create', async (body, thunkAPI) => {

    const data = (await axios.post(urlApi, body)).data;
    console.log(data.id, 'created data')
    thunkAPI.dispatch(getAll());
    return data;

});

// update
export const updateUser = createAsyncThunk('update', async (body, thunkAPI) => {
    const data = (await userService.update(body.id, body)).data;
     thunkAPI.dispatch(getAll());
     return data;
});

// delete
export const deleteById = createAsyncThunk('delete', async (id, thunkAPI) => {
    const dataDelete = (await userService.delete(id)).data;
    thunkAPI.dispatch(getAll());
    return dataDelete;
});



export const demoSlide = createSlice({
    name: 'demoSlide',
    initialState: {
        demo: true,
        
    },
    reducers: {
        changeValueDemo: (state, action) => {
            state.demo = action.payload;

        },
      
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.dataApi = action.payload;
        });
    

        // create
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            //state: thuộc tính của slide
            // action.payload: data trả về
            

        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
        });
        // create ---

    },
});

export const { changeValueDemo,  } = demoSlide.actions;
export default demoSlide.reducer;
