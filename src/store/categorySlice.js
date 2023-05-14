import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    add: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { add } = categorySlice.actions;

export default categorySlice.reducer;
