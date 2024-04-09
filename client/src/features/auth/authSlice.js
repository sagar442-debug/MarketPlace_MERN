import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticate: false,
  token: null,
  data: [],
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      state.isAuthenticate = true;
    },
    logoutUser(state, action) {
      state.user = null;
      state.isAuthenticate = false;
    },
    setloading(state, action) {
      state.isLoading = true;
    },
    setNotLoading(state, action) {
      state.isLoading = false;
    },
  },
});

export const { loginUser, logoutUser, checkToken, setloading, setNotLoading } =
  authSlice.actions;
export default authSlice.reducer;
