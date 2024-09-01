import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    name: string | null;
    role: string | null;
    isAuthenticated: boolean | null;
  }

  const initialState: AdminState = {
    name: null,
    isAuthenticated: null,
    role: null,
  };

  const adminslice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {
      setAdmin: (state, action: PayloadAction<AdminState>) => {
        return { ...state, ...action.payload };
      },
      clearAdmin: () => initialState,
    },
  });
  
  export const { setAdmin, clearAdmin } = adminslice.actions;
  export default adminslice.reducer;
