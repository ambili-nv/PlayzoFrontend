// import { combineReducers } from "redux";
// import userSlice from "../slice/userSlice";
// import ownerSlice from "../slice/ownerSlice";
// import adminSlice from "../slice/adminSlice";
// export const rootReducer = combineReducers({
//     userSlice,
//     ownerSlice,
//     adminSlice
// })

// export type RootState = ReturnType<typeof rootReducer>;



import { combineReducers } from "redux";
import userSlice from "../slice/userSlice";
import ownerSlice from "../slice/ownerSlice";
import adminSlice from "../slice/adminSlice";

export const rootReducer = combineReducers({
  userSlice,
  ownerSlice,
  adminSlice
});

export type RootState = ReturnType<typeof rootReducer>; 