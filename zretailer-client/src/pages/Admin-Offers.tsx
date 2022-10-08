import { FC, ChangeEvent, useEffect, useState, useReducer } from "react";
import { cloneDeep } from "lodash";

import { addOffer } from "../api/offers";
import { getProductTitles } from "../api/products";
import { ProductTitle } from "../interfaces/Product";
import { Offer } from "../interfaces/Offer";

// Offer Reducer
enum OfferActions {
    GET_OFFERS = "GET_OFFERS",
    ADD_OFFER = "ADD_OFFER",
    ADD_PROD_TO_OFFER = "ADD_PROD_TO_OFFER",
    CHANGE_FROM_DATE = "CHANGE_FROM_DATE",
    CHANGE_UNTIL_DATE = "CHANGE_UNTIL_DATE",
    CHANGE_PERCENT = "CHANGE_PERCENT",
}

type OfferAction =
    | { type: OfferActions.GET_OFFERS }
    | { type: OfferActions.CHANGE_FROM_DATE; payload: Date }
    | { type: OfferActions.CHANGE_UNTIL_DATE; payload: Date }
    | { type: OfferActions.CHANGE_PERCENT; payload: number }
    | { type: OfferActions.ADD_PROD_TO_OFFER; payload: ProductTitle }
    | { type: OfferActions.ADD_OFFER; payload: Offer };
//  | { type: 'reset' };

// REFACTOR: It's recommended to separate offers from the form state for performance wise
interface OfferState {
    offers: Offer[];
    fromDateEntry: Date;
    fromDateIsValid: boolean | null;
    untilDateEntry: Date;
    untilDateIsValid: boolean | null;
    percentEntry: number;
    percentIsValid: boolean | null;
    productsEntry: ProductTitle[];
    productsIsValid: boolean | null;
    offersFormIsValid: boolean;
}

function offerReducer(state: OfferState, action: OfferAction) {
    switch (action.type) {
        case OfferActions.GET_OFFERS: {
            return state;
        }
        case OfferActions.ADD_OFFER: {
            const stateCopy = cloneDeep(state);
            stateCopy.offers.push(action.payload);

            return stateCopy;
        }

        case OfferActions.ADD_PROD_TO_OFFER: {
            const stateCopy = cloneDeep(state);
            stateCopy.productsEntry.push(action.payload);

            return stateCopy;
        }

        case OfferActions.CHANGE_FROM_DATE: {
            const stateCopy = cloneDeep(state);
            stateCopy.fromDateEntry = action.payload;

            return stateCopy;
        }

        case OfferActions.CHANGE_UNTIL_DATE: {
            const stateCopy = cloneDeep(state);
            stateCopy.untilDateEntry = action.payload;

            return stateCopy;
        }

        case OfferActions.CHANGE_PERCENT: {
            const stateCopy = cloneDeep(state);
            stateCopy.percentEntry = action.payload;

            return stateCopy;
        }

        default:
            return state;
    }
}

const inititalState: OfferState = {
    offers: [],
    fromDateEntry: new Date(),
    fromDateIsValid: null,
    untilDateEntry: new Date(),
    untilDateIsValid: null,
    percentEntry: 0,
    percentIsValid: null,
    productsEntry: [],
    productsIsValid: null,
    offersFormIsValid: false,
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

    function productSelectChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        const productId = +event.target.value;
        const productTitle = productTitles.find(
            (prod) => prod.id === productId
        )?.title;

        if (productTitle) {
            setSelectedProduct({ id: productId, title: productTitle });
        }
    }

    function addProductTofferHandler() {
        const isAlreadySelected = selectedProducts.find(
            (prod) => prod.id === selectedProduct?.id
        );

        if (isAlreadySelected || !selectedProduct) {
            return;
        }

        setSelectedProducts((prevState) => [...prevState, selectedProduct]);

        dispatchOffer({
            type: OfferActions.ADD_PROD_TO_OFFER,
            payload: selectedProduct,
        });
    }

    // Inputs change handlers
    function fromDateChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const fromDate = event.target.value;
        dispatchOffer({
            type: OfferActions.CHANGE_FROM_DATE,
            payload: new Date(fromDate),
        });
    }

    function untilDateChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const untilDate = event.target.value;
        dispatchOffer({
            type: OfferActions.CHANGE_UNTIL_DATE,
            payload: new Date(untilDate),
        });
    }

    function percentChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const percent = +event.target.value;
        dispatchOffer({ type: OfferActions.CHANGE_PERCENT, payload: percent });
    }

    async function addOfferHandler(event: any) {
        event.preventDefault();
        console.log(offerState);

        const offerToCreate: Partial<Offer> = {
            percent: offerState.percentEntry,
            fromDate: offerState.fromDateEntry,
            untilDate: offerState.untilDateEntry,
            products: offerState.productsEntry,
        };

        const offer = await addOffer(offerToCreate);

        console.log(offer);

        // Update offer state
        dispatchOffer({ type: OfferActions.ADD_OFFER, payload: offer });
    }

    return (
        <div>
            <h1 className="text-center font-bold">Add New Offer From Here!</h1>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={addOfferHandler}
            >
                <div className="my-4 flex flex-row justify-center flex-wrap">
                    <input
                        type="date"
                        placeholder="From date"
                        className="input input-bordered w-full max-w-xs min-w-min m-1"
                        onChange={fromDateChangeHandler}
                    />
                    <input
                        type="date"
                        placeholder="Until Date"
                        className="input input-bordered w-full max-w-xs min-w-min m-1"
                        onChange={untilDateChangeHandler}
                    />
                    <input
                        type="number"
                        placeholder="Offer Percent %"
                        className="input input-bordered w-full max-w-xs m-1"
                        onChange={percentChangeHandler}
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
                <button type="submit" className="btn">
                    Add Offer
                </button>
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
                                    <td>{offer.fromDate.toString()}</td>
                                    <td>{offer.untilDate.toString()}</td>
                                    <td>
                                        {offer.products
                                            .map(
                                                (prod: ProductTitle) =>
                                                    ` ${prod.title}`
                                            )
                                            .toString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOffers;
