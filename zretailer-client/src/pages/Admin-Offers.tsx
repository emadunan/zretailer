import { FC, ChangeEvent, useEffect, useState, useReducer } from "react";
import { cloneDeep } from "lodash";

import { addOffer, getAllOffers } from "../api/offers";
import { getProductTitles } from "../api/products";
import { ProductTitle } from "../interfaces/Product";
import { Offer } from "../interfaces/Offer";

// Offer Reducer
enum OfferActions {
    ADD_PROD_TO_OFFER = "ADD_PROD_TO_OFFER",
    CHANGE_FROM_DATE = "CHANGE_FROM_DATE",
    FOCUS_FROM_DATE = "FOCUS_FROM_DATE",
    CHANGE_UNTIL_DATE = "CHANGE_UNTIL_DATE",
    CHANGE_PERCENT = "CHANGE_PERCENT",
    FOCUS_PERCENT = "FOCUS_PERCENT",
}

type OfferAction =
    | { type: OfferActions.FOCUS_FROM_DATE }
    | { type: OfferActions.FOCUS_PERCENT }
    | { type: OfferActions.CHANGE_FROM_DATE; payload: string }
    | { type: OfferActions.CHANGE_UNTIL_DATE; payload: string }
    | { type: OfferActions.CHANGE_PERCENT; payload: number }
    | { type: OfferActions.ADD_PROD_TO_OFFER; payload: ProductTitle };

// REFACTOR: It's recommended to separate offers from the form state for performance wise
interface OfferState {
    fromDateEntry: string;
    fromDateIsValid: boolean | null;
    fromDataIsTouched: boolean;
    untilDateEntry: string;
    untilDateIsValid: boolean | null;
    percentEntry: number;
    percentIsValid: boolean | null;
    percentIsTouched: boolean;
    productsEntry: ProductTitle[];
    productsIsValid: boolean | null;
    offersFormIsValid: boolean;
}

function offerReducer(state: OfferState, action: OfferAction) {
    switch (action.type) {
        case OfferActions.ADD_PROD_TO_OFFER: {
            const stateCopy = cloneDeep(state);
            stateCopy.productsEntry.push(action.payload);

            return stateCopy;
        }

        case OfferActions.FOCUS_FROM_DATE: {
            const stateCopy = cloneDeep(state);
            stateCopy.fromDataIsTouched = true;

            return stateCopy;
        }

        case OfferActions.CHANGE_FROM_DATE: {
            const offerStartDate = new Date(action.payload);
            const nowDate = new Date();

            const isInCurrentYear =
                offerStartDate.getFullYear() === nowDate.getFullYear();
            const isAfterToday = offerStartDate > nowDate;

            const stateCopy = cloneDeep(state);

            stateCopy.fromDateEntry = action.payload;
            stateCopy.fromDateIsValid = isInCurrentYear && isAfterToday;

            return stateCopy;
        }

        case OfferActions.CHANGE_UNTIL_DATE: {
            const offerStartDate = new Date(action.payload);
            const nowDate = new Date(state.fromDateEntry);

            const isInCurrentYear =
                offerStartDate.getFullYear() === nowDate.getFullYear();
            const isAfterToday = offerStartDate > nowDate;

            const stateCopy = cloneDeep(state);
            stateCopy.untilDateEntry = action.payload;
            stateCopy.untilDateIsValid = isInCurrentYear && isAfterToday;

            return stateCopy;
        }

        case OfferActions.FOCUS_PERCENT: {
            const stateCopy = cloneDeep(state);
            stateCopy.percentIsTouched = true;

            return stateCopy;
        }

        case OfferActions.CHANGE_PERCENT: {
            const percent = action.payload;
            const isBetween1and90 = percent >= 1 && percent <= 90;

            const stateCopy = cloneDeep(state);
            stateCopy.percentEntry = action.payload;
            stateCopy.percentIsValid = isBetween1and90;

            return stateCopy;
        }

        default:
            return state;
    }
}

const inititalState: OfferState = {
    fromDateEntry: "",
    fromDateIsValid: null,
    fromDataIsTouched: false,
    untilDateEntry: "",
    untilDateIsValid: null,
    percentEntry: 0,
    percentIsValid: null,
    percentIsTouched: false,
    productsEntry: [],
    productsIsValid: null,
    offersFormIsValid: false,
};

const AdminOffers: FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [offerState, dispatchOffer] = useReducer(offerReducer, inititalState);

    const [productTitles, setProductTitles] = useState<ProductTitle[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductTitle[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductTitle>();

    useEffect(() => {
        (async () => {
            const productTitlesData = await getProductTitles();
            setProductTitles(productTitlesData);
        })();

        (async () => {
            const offersData = await getAllOffers();
            setOffers(offersData);
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
    function fromDateFocusHandler() {
        dispatchOffer({ type: OfferActions.FOCUS_FROM_DATE });
    }

    function fromDateChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const fromDate = event.target.value;
        dispatchOffer({
            type: OfferActions.CHANGE_FROM_DATE,
            payload: fromDate,
        });
    }

    function untilDateChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const untilDate = event.target.value;
        dispatchOffer({
            type: OfferActions.CHANGE_UNTIL_DATE,
            payload: untilDate,
        });
    }

    function percentFocusHandler() {
        dispatchOffer({ type: OfferActions.FOCUS_PERCENT });
    }

    function percentChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const percent = +event.target.value;
        dispatchOffer({ type: OfferActions.CHANGE_PERCENT, payload: percent });
    }

    async function addOfferHandler(event: any) {
        event.preventDefault();

        const offerToCreate: any = {
            percent: offerState.percentEntry,
            fromDate: offerState.fromDateEntry,
            untilDate: offerState.untilDateEntry,
            products: offerState.productsEntry,
        };

        const offer = await addOffer(offerToCreate);

        // Update offer state
        setOffers((prevState) => {
            const stateCopy = cloneDeep(prevState);
            stateCopy.push(offer);
            return stateCopy;
        });

        // Clear
        dispatchOffer({ type: OfferActions.CHANGE_FROM_DATE, payload: "" });
        dispatchOffer({ type: OfferActions.CHANGE_UNTIL_DATE, payload: "" });
        dispatchOffer({ type: OfferActions.CHANGE_PERCENT, payload: 0 });
        setSelectedProducts([]);
        setSelectedProduct({ id: -1, title: "products" });
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
                        className={
                            "input input-bordered w-full max-w-xs min-w-min m-1 " +
                            (!offerState.fromDateIsValid &&
                            offerState.fromDataIsTouched
                                ? "border-rose-600 border-2"
                                : "")
                        }
                        onFocus={fromDateFocusHandler}
                        onChange={fromDateChangeHandler}
                        value={offerState.fromDateEntry}
                    />
                    <input
                        type="date"
                        placeholder="Until Date"
                        className={
                            "input input-bordered w-full max-w-xs min-w-min m-1 " +
                            (!offerState.untilDateIsValid
                                ? "border-rose-600 border-2"
                                : "")
                        }
                        onChange={untilDateChangeHandler}
                        value={offerState.untilDateEntry}
                        disabled={!offerState.fromDateIsValid}
                    />
                    <input
                        type="number"
                        placeholder="Offer Percent %"
                        className={
                            "input input-bordered w-full max-w-xs m-1 " +
                            (!offerState.percentIsValid &&
                            offerState.percentIsTouched
                                ? "border-rose-600 border-2"
                                : "")
                        }
                        onFocus={percentFocusHandler}
                        onChange={percentChangeHandler}
                        value={offerState.percentEntry}
                    />
                    <select
                        className={"select select-bordered w-full max-w-xs m-1"}
                        defaultValue="products"
                        onChange={productSelectChangeHandler}
                        value={selectedProduct?.id}
                    >
                        <option disabled value={"-1"}>
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

                <div className="mt-2">
                    {selectedProducts.map((prod) => (
                        <button
                            type="button"
                            className="btn btn-accent m-1"
                            key={prod.id}
                            data-product={prod.id}
                        >
                            {prod.title}
                        </button>
                    ))}
                </div>
                <div className="divider"></div>
                <button
                    type="submit"
                    className="btn mt-4"
                    disabled={!offerState.offersFormIsValid}
                >
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
                        {offers.map((offer: Offer) => {
                            return (
                                <tr key={offer.id}>
                                    <th>1</th>
                                    <td>{offer.percent} %</td>
                                    <td>
                                        {offer.fromDate
                                            .toString()
                                            .substring(0, 10)}
                                    </td>
                                    <td>
                                        {offer.untilDate
                                            .toString()
                                            .substring(0, 10)}
                                    </td>
                                    <td className="flex flex-row flex-wrap">
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
