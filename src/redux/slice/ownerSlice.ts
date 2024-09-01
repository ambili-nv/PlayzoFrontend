// import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// interface OwnerState{
//     name:string | null,
//     isAuthenticated:boolean | null,
//     role:string|null,
//     id?:string|null
// }

// const initialState : OwnerState = {
//     name:null,
//     isAuthenticated:null,
//     role:null,
//     id:null
// }

// const ownerSlice = createSlice ({
//     name:"ownerSlice",
//     initialState,
//     reducers:{
//         setOwner:(state,action:PayloadAction<OwnerState>)=>{
//             return {...state,...action.payload}
//         },
//         clearOwner:()=>initialState
//     }
// });

// export const {setOwner,clearOwner} = ownerSlice.actions;
// export default ownerSlice.reducer



import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OwnerState {
  name: string | null;
  isAuthenticated: boolean | null;
  role: string | null;
  id?: string | null;
}

const initialState: OwnerState = {
  name: null,
  isAuthenticated: null,
  role: null,
  id: null
};

const ownerSlice = createSlice({
  name: "ownerSlice",
  initialState,
  reducers: {
    setOwner: (state, action: PayloadAction<OwnerState>) => {
      return { ...state, ...action.payload };
    },
    clearOwner: () => initialState
  }
});

export const { setOwner, clearOwner } = ownerSlice.actions;
export default ownerSlice.reducer;
