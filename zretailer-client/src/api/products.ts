import { Product } from "../interfaces/Product";

const { REACT_APP_API_URL: apiUrl } = process.env;

export async function getProducts(
    pageNumbr = 1,
    pageSize = 4
): Promise<{ products: Product[]; pages: number; pageSize: number }> {
    const response = await fetch(
        `${apiUrl}/products?page=${pageNumbr}&size=${pageSize}`
    );

    if (!response.ok) throw new Error("Failed to get products!");
    return await response.json();
}

export async function getProductTitles(): Promise<
    { id: number; title: string }[]
> {
    const response = await fetch(`${apiUrl}/product-titles`);

    if (!response.ok) throw new Error("Failed to get products!");
    return await response.json();
}

export async function addProduct(product: Product) {
    const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Failed to add product");
    return await response.json();
}
