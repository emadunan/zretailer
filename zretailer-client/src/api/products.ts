import Product from "../interfaces/Product";

const { REACT_APP_API_URL: apiUrl } = process.env;

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${apiUrl}/products`);

    if (!response.ok) throw new Error("Can't get products");
    return response.json();
}
