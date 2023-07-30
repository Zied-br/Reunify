import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { registerRequest, registerSuccess, registerFailure } =
  registerSlice.actions;

export default registerSlice.reducer;
