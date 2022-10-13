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

export async function getOneProduct(productId: number) {
    const response = await fetch(`${apiUrl}/products/${productId}`);

    if (!response.ok) throw new Error("Failed to get Product!");
    return await response.json();
}

export async function getProductTitles(): Promise<
    { id: number; title: string }[]
> {
    const response = await fetch(`${apiUrl}/product-titles`);

    if (!response.ok) throw new Error("Failed to get products!");
    return await response.json();
}

export async function addProduct(product: any) {
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

export async function uploadProductPhoto(productId: number, file: any) {
    const formData = new FormData();

    formData.append("productId", productId as unknown as string);
    formData.append("file", file[0]);

    console.log(formData.get("file"));
    console.log(formData.get("productId"));

    const response = await fetch(`${apiUrl}/products/upload/product-photo`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Failed to upload product's photo!");
    return await response.json();
}
