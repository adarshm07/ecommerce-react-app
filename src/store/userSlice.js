import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  token: "",
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
    },
    logout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.token = "";
      state.loggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
