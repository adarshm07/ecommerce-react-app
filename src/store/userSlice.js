import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  id: "",
  email: "",
  password: "",
  token: "",
  loggedIn: false,
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.id = "";
      state.email = "";
      state.token = "";
      state.loggedIn = false;
      state.role = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
