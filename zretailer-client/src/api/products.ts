import Product from "../interfaces/Product";

const { REACT_APP_API_URL: apiUrl } = process.env;

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${apiUrl}/products`);

    if (!response.ok) throw new Error("Failed to get products!");
    return response.json();
}

export async function addProduct(product: Product) {
    const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) throw new Error("Failed to add product");
    return response.json();
}
