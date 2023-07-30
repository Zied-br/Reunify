import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("/users/signin", formValue);
      toast.success("Login Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      console.log("13", err);
      return rejectWithValue(err.response.data);
    }
  }
);
