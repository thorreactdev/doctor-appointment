import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, signal }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => {
      controller.abort();
    });
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to Login");
      }
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        return rejectWithValue("Request was cancelled");
      }
      // Reject with the error message
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    googleLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    googleLoginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    googleLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    googleCheckAlreadyUserStart: (stata) => {
      stata.loading = true;
      stata.error = null;
    },

    googleCheckAlreadyUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    googleCheckAlreadyUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    signOutSucess : (state)=>{
      state.loading=false;
      state.currentUser=null;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { googleLoginStart, googleLoginSuccess, googleLoginFailure , googleCheckAlreadyUserStart , googleCheckAlreadyUserSuccess , googleCheckAlreadyUserFailure , signOutSucess} =
  userSlice.actions;
export default userSlice.reducer;
