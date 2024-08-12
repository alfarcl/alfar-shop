import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IReducerState {
  product_category: {};
}

const initialState: IReducerState = {
  product_category: {},
};

export const productCategorySlice = createSlice({
  name: "product_category",
  initialState,
  reducers: {
    setProductCategory: (state, action: PayloadAction<boolean>) => {
      state.product_category = action.payload;
    },
  },
});

export const { setProductCategory } = productCategorySlice.actions;
export const productCategoryReducer = productCategorySlice.reducer;
