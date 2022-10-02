import { redirect, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getProducts, addProduct } from "../api/products";
import Product from "../interfaces/Product";
import ProductsTbl from "../components/Product/ProductsTbl";
import ProductForm from "../components/Product/ProductForm";
import { showProducts } from "../context/productSlice";

function AdminProducts() {
    const loaderData = useLoaderData() as Product[];
    const dispatch = useDispatch();

    dispatch(showProducts(loaderData));

    return (
        <div>
            <h1 className="text-lg font-bold">Products</h1>
            <p>React-router-dom V6.4 new features were used in fetching data by a loader function and make a post request through an action function</p>
            <ProductForm />
            <ProductsTbl />
        </div>
    );
}

export default AdminProducts;

export async function loader(): Promise<Product[]> {
    try {
        const products = getProducts();
        return products;
    } catch (err) {
        if (err instanceof Error) throw new Error(err.message);
        throw new Error("Unexpected Error!");
    }
}

export async function action({request}: any) {
    const formData = await request.formData();

    console.log(formData);
    

    const product: Product = {
        title: formData.get("name"),
        category: formData.get("category"),
        desc: formData.get("desc"),
        pkgCap: +formData.get("pkg-cap"),
        pkgPriceBuy: +formData.get("pkg-price-buy"),
        pkgPriceSell: +formData.get("pkg-price-sell"),
        unitPrice: +formData.get("unit-price"),
    }

    try {
        console.log(product);
        
        await addProduct(product)
    } catch (err) {
        if (err instanceof Error) throw new Error(err.message);
        throw new Error("Unexpected Error!");
    }

    return redirect("/admin/products");
}
