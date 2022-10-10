import { Offer } from "../interfaces/Offer";

const { REACT_APP_API_URL: apiUrl } = process.env;

export async function getAllOffers() {
    const response = await fetch(`${apiUrl}/offers`);

    if (!response.ok) throw new Error("Failed to get offers!");
    return await response.json();
}

export async function addOffer(offer: Partial<Offer>): Promise<Offer> {
    const response = await fetch(`${apiUrl}/offers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(offer),
    });

    if (!response.ok) throw new Error("Failed to add offer!");
    return await response.json();
}
