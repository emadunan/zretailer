import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Product from "../interfaces/Product";

export interface ProductState {
    products: Product[];
    pages: number;
    pageSize: number;
}

const initialState: ProductState = {
    products: [],
    pages: 0,
    pageSize: 0,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        showProducts: (
            state,
            action: PayloadAction<{
                products: Product[];
                pages: number;
                pageSize: number;
            }>
        ) => {
            state.pages = action.payload.pages;
            state.products = action.payload.products;
            state.pageSize = action.payload.pageSize;
        },
    },
});

// Action creators are generated for each case reducer function
export const { showProducts } = productSlice.actions;

export default productSlice.reducer;
