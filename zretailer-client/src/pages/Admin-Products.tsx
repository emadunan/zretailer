import { useLoaderData } from "react-router-dom";

import { getProducts, addProduct } from "../api/products";
import Product from "../interfaces/Product";
import ProductsTbl from "../components/Product/ProductsTbl";
import ProductForm from "../components/Product/ProductForm";
import { useEffect, useReducer } from "react";

// Products Reducer Setup
enum ProductActions {
    RENDER_PRODUCTS = "RENDER_PRODUCTS",
}

// Type Defintitions for state
interface ProductState {
    products: Product[];
    pages: number;
    pageSize: number;
    currentPage?: number;
}

// Type Defintitions for actions
interface RenderProductsAction {
    type: string;
    payload: ProductState;
}

// Reducer Initial State
const initialState: ProductState = {
    products: [],
    pages: 0,
    pageSize: 0,
    currentPage: 1,
};

// Products Reducer Function
function productsReducer(state: ProductState, action: RenderProductsAction) {
    switch (action.type) {
        case ProductActions.RENDER_PRODUCTS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}

function AdminProducts() {
    // Loading data at component intiation by React Router
    const loaderData = useLoaderData() as {
        products: Product[];
        pages: number;
        pageSize: number;
    };

    const [productState, productDispatch] = useReducer(
        productsReducer,
        initialState
    );

    useEffect(() => {
        productDispatch({ type: ProductActions.RENDER_PRODUCTS, payload: loaderData });
    }, [loaderData.products]);

    async function getPageProductsHandler(page = 1, size = 4) {
        // Check page number validity and return if not
        if (page < 1 || page > productState.pages) return;

        // Get products and persist it in product state
        const data = await getProducts(page, size);
        productDispatch({
            type: ProductActions.RENDER_PRODUCTS,
            payload: { ...data, currentPage: page },
        });
    }

    return (
        <div>
            <h1 className="text-lg font-bold">Products</h1>
            <p>
                React-router-dom V6.4 new features were used in fetching data by
                a loader function and make a post request through an action
                function
            </p>
            <ProductForm />
            <ProductsTbl
                products={productState.products}
                pages={productState.pages}
                pageSize={productState.pageSize}
                currentPage={productState.currentPage}
                onGetPageProducts={getPageProductsHandler}
            />
        </div>
    );
}

export default AdminProducts;

export async function loader(): Promise<{
    products: Product[];
    pages: number;
    pageSize: number;
}> {
    try {
        const data = getProducts();
        return data;
    } catch (err) {
        if (err instanceof Error) throw new Error(err.message);
        throw new Error("Unexpected Error!");
    }
}

export async function action({ request }: any) {
    const formData = await request.formData();

    const product: Product = {
        title: formData.get("name"),
        category: formData.get("category"),
        desc: formData.get("desc"),
        pkgCap: +formData.get("pkg-cap"),
        pkgPriceBuy: +formData.get("pkg-price-buy"),
        pkgPriceSell: +formData.get("pkg-price-sell"),
        unitPrice: +formData.get("unit-price"),
    };

    try {
        await addProduct(product);
    } catch (err) {
        if (err instanceof Error) throw new Error(err.message);
        throw new Error("Unexpected Error!");
    }
}
