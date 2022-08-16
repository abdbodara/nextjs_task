import { createSlice } from "@reduxjs/toolkit";
// import { getObjectValue, validateJsonObject } from '../utils/Utility'
export const testSlice = createSlice({
  name: "user",
  initialState: {
    userData: {}
  },
  reducers: {
    saveUser: (state, action) => {
      state.productInfo = action.payload;
    },
  },
  devTools: true,
});
export const { saveUser } =
  testSlice.actions;

export const userData = (state) => state.user.userData;

export default testSlice.reducer;
