import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IReducerState {
  product: {};
}

const initialState: IReducerState = {
  product: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<boolean>) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
