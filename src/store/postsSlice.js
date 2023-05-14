import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  singlePost: {
    title: "",
    description: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addPost is a reducer function that takes in the state and action arguments. It updates the singlePost property of the state with the payload of the action.
    addPost: (state, action) => {
      state.singlePost = action.payload;
    },
    // allPosts is a reducer function that takes in the state and action arguments. It updates the allPosts property of the state with the payload of the action.
    allPosts: (state, action) => {
      state.allPosts = action.payload;
    },
  },
});

export const { addPost, allPosts } = postsSlice.actions;

export default postsSlice.reducer;
