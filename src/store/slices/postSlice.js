import { fetchOrderData } from "@/actions/action";
import { createSlice } from "@reduxjs/toolkit";

// export type PostTypeStore = {
//   message:string
// }

const postSlice = createSlice({
  name: 'post',
  initialState: { data: {success : null, error : null}, error: '',isLoading: false },
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