import { FC, ChangeEvent, useEffect, useState, useReducer } from "react";

import { addOffer } from "../api/offers";
import { getProductTitles } from "../api/products";
import { Product } from "../interfaces/Product";
import { Offer } from "../interfaces/Offer";

// Offer Reducer
enum OfferActions {
    ADD_OFFER = "ADD_OFFER",
}

interface OfferState {
    offers: [
        {
            id: number;
            fromDate: Date;
            untilDate: Date;
            percent: number;
            products: Product[];
        }
    ];
}

function offerReducer(state: any, action: any) {
    const { type, payload } = action;

    switch (type) {
        case OfferActions.ADD_OFFER: {
            return state;
        }

        default:
            return state;
    }
}

const inititalState = {
    offers: [
        {
            id: 1,
            fromDate: new Date("2022-10-7"),
            untilDate: new Date("2022-10-9"),
            percent: 12,
            products: [],
        }
    ]
};

const AdminOffers: FC = () => {
    const [offerState, dispatchOffer] = useReducer(offerReducer, inititalState);

    const [productTitles, setProductTitles] = useState<
        { id: number; title: string }[]
    >([]);

    const [selectedProduct, setSelectedProduct] = useState<{
        id: number;
        title: string;
    }>();

    const [selectedProducts, setSelectedProducts] = useState<
        { id: number; title: string }[]
    >([]);

    useEffect(() => {
        (async () => {
            const productTitlesData = await getProductTitles();
            setProductTitles(productTitlesData);
        })();
    }, []);

    function addProductTofferHandler() {
        setSelectedProducts((prevState) => {
            const isAlreadySelected = selectedProducts.find(
                (prod) => prod.id === selectedProduct?.id
            );

            if (!isAlreadySelected && selectedProduct) {
                return [...prevState, selectedProduct];
            }

            return prevState;
        });
    }

    function productSelectChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        const productId = +event.target.value;
        const productTitle = productTitles.find(
            (prod) => prod.id === productId
        )?.title;

        if (productTitle) {
            setSelectedProduct({ id: productId, title: productTitle });
        }
    }

    return (
        <div>
            <h1 className="text-center font-bold">Add New Offer From Here!</h1>
            <form className="flex flex-col justify-center items-center">
                <div className="my-4 flex flex-row justify-center flex-wrap">
                    <input
                        type="date"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs min-w-min m-1"
                    />
                    <input
                        type="date"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs min-w-min m-1"
                    />
                    <input
                        type="number"
                        placeholder="Offer Percent %"
                        className="input input-bordered w-full max-w-xs m-1"
                    />
                    <select
                        className="select select-bordered w-full max-w-xs m-1"
                        defaultValue="products"
                        onChange={productSelectChangeHandler}
                    >
                        <option disabled value="products">
                            Products
                        </option>
                        {productTitles.map((prod) => (
                            <option
                                value={prod.id}
                                key={prod.id}
                                data-title={prod.title}
                            >
                                {prod.title}
                            </option>
                        ))}
                    </select>

                    <button
                        className="btn btn-outline m-1"
                        type="button"
                        onClick={addProductTofferHandler}
                    >
                        Add Product To The Offer
                    </button>
                </div>

                <div className="my-4 flex items-start justify-start"></div>
                <div className="mt-4">
                    {selectedProducts.map((prod) => (
                        <button
                            type="button"
                            className="btn btn-accent"
                            key={prod.id}
                            data-product={prod.id}
                        >
                            {prod.title}
                        </button>
                    ))}
                </div>
                <button className="btn">Add Offer</button>
            </form>
            <div className="overflow-x-auto mt-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Percent</th>
                            <th>From</th>
                            <th>Until</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offerState.offers.map((offer: Offer) => {
                            return (
                                <tr key={offer.id}>
                                    <th>1</th>
                                    <td>{offer.percent} %</td>
                                    <td>{offer.fromDate.toISOString()}</td>
                                    <td>{offer.untilDate.toISOString()}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOffers;
