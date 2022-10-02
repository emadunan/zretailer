import { useLoaderData } from "react-router-dom";

import { getProducts } from "../api/products";
import Product from "../interfaces/Product";
import ProductsTbl from "../components/Product/ProductsTbl";
import ProductForm from "../components/Product/ProductForm";

function AdminProducts() {
    const loaderData = useLoaderData() as Product[];

    return (
        <div>
            <h1 className="text-lg font-bold">Products</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <ProductForm />
            <ProductsTbl products={loaderData}/>
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
