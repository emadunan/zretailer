import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Product from "../interfaces/Product";

export interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            console.log(action);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            console.log(action);
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            console.log(action);
        },
        showProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, editProduct, showProducts } =
    productSlice.actions;

export default productSlice.reducer;
