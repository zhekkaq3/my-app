import { fetchOrderData } from "@/actions/action";
import { createSlice } from "@reduxjs/toolkit";

type Error = {
  data: {
    success: null;
    error: null;
  };
  error: string | undefined;
  isLoading: boolean;
} | (() => {
  data: {
    success: null;
    error: null;
  };
  error: null;
  isLoading: boolean;
})
 
const initialState : Error = { data: { success: null, error: null }, error: '', isLoading: false }

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchOrderData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
})


export default postSlice.reducer