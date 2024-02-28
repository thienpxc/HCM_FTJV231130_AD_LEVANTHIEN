import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const staffAll = createAsyncThunk("category/jobAll", async () => {
  let res = await axios.get("http://localhost:3000/staff");
  return res.data;
});

// const editStaff = createAsyncThunk("category/editStaff", async (payload) => {
//   let res = await axios.put(
//     `http://localhost:3000/staff/${payload.id}`,
//     payload.data
//   );
//   console.log(payload.data);
//   return res.data;
// });

const deleteStaff = createAsyncThunk("category/deleteStaff", async (id) => {
  await axios.delete(`http://localhost:3000/staff/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
     
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(staffAll.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(deleteStaff.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryAction = {
  ...categorySlice.actions,
  staffAll,
  //   editStaff,
    deleteStaff,
};
