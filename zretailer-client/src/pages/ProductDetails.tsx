import {
    ChangeEvent,
    FC,
    Fragment,
    useEffect,
    useReducer,
    useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct, uploadProductPhoto } from "../api/products";
import { Categories } from "../data/categories";
import { Product } from "../interfaces/Product";

interface ProductState {
    id: number;
    photo: string;
    photoIsValid: boolean;
    titleEntry: string;
    titleIsValid: boolean;
    categoryEntry: string;
    descEntry: string;
    pkgCapEntry: number;
    pkgCapIsValid: boolean;
    pkgPriceBuyEntry: number;
    pkgPriceBuyIsValid: boolean;
    pkgPriceSellEntry: number;
    pkgPriceSellIsValid: boolean;
    unitPriceEntry: number;
    unitPriceIsValid: boolean;
    editFormIsValid: boolean;
}

const productInitialState: ProductState = {
    id: -1,
    photo: "",
    photoIsValid: false,
    titleEntry: "",
    titleIsValid: true,
    categoryEntry: "",
    descEntry: "",
    pkgCapEntry: 0,
    pkgCapIsValid: true,
    pkgPriceBuyEntry: 0,
    pkgPriceBuyIsValid: true,
    pkgPriceSellEntry: 0,
    pkgPriceSellIsValid: true,
    unitPriceEntry: 0,
    unitPriceIsValid: true,
    editFormIsValid: true,
};

enum ProductActions {
    LOAD_PRODUCT = "LOAD_PRODUCT",
    LOAD_PHOTO = "LOAD_PHOTO",
    VALIDATE_PHOTO = "VALIDATE_PHOTO",
    // VALIDATE_TITLE = "VALIDATE_TITLE",

    // VALIDATE_PKG_CAP = "VALIDATE_PKG_CAP",
    // VALIDATE_PKG_PRICE_BUY = "VALIDATE_PKG_PRICE_BUY",
    // VALIDATE_PKG_PRICE_SELL = "VALIDATE_PKG_PRICE_SELL",
    // VALIDATE_UNIT_PRICE = "VALIDATE_UNIT_PRICE",

    // VALIDATE_EDIT_FROM = "VALIDATE_EDIT_FROM",
}

type ProductAction =
    | { type: ProductActions.VALIDATE_PHOTO; payload: boolean }
    | { type: ProductActions.LOAD_PHOTO; payload: string }
    | {
        type: ProductActions.LOAD_PRODUCT;
        payload: {
            id: number;
            photo: string;
            title: string;
            category: string;
            desc: string;
            pkgCap: number;
            pkgPriceBuy: number;
            pkgPriceSell: number;
            unitPrice: number;
        };
    };

function productReducer(state: ProductState, action: ProductAction) {
    const { type, payload } = action;

    switch (type) {

        case ProductActions.VALIDATE_PHOTO: {
            return { ...state, photoIsValid: payload };
        }

        case ProductActions.LOAD_PHOTO: {
            return { ...state, photo: payload }
        }

        case ProductActions.LOAD_PRODUCT: {
            return {
                ...state,
                id: payload.id,
                photo: payload.photo,
                titleEntry: payload.title,
                categoryEntry: payload.category,
                descEntry: payload.desc,
                pkgCapEntry: payload.pkgCap,
                pkgPriceBuyEntry: payload.pkgPriceBuy,
                pkgPriceSellEntry: payload.pkgPriceSell,
                unitPriceEntry: payload.unitPrice,
            };

            // id: -1,
            // titleEntry: "",
            // categoryEntry: "",
            // descEntry: "",
            // pkgCapEntry: "",
            // pkgPriceBuyEntry: "",
            // pkgPriceSellEntry: "",
            // unitPriceEntry: "",
        }

        // case ProductActions.VALIDATE_TITLE: {
        //     return { ...state, titleIsValid: payload }
        // }

        // case ProductActions.VALIDATE_PKG_CAP: {
        //     return { ...state, pkgCapIsValid: payload }
        // }

        // case ProductActions.VALIDATE_PKG_PRICE_BUY: {
        //     return { ...state, pkgPriceBuyIsValid: payload }
        // }

        // case ProductActions.VALIDATE_PKG_PRICE_SELL: {
        //     return { ...state, pkgPriceSellIsValid: payload }
        // }

        // case ProductActions.VALIDATE_UNIT_PRICE: {
        //     return { ...state, unitPriceIsValid: payload }
        // }

        default:
            return state;
    }
}

// interface ProductDetailsProps {
//     id: number;
// }

const ProductDetails: FC = () => {
    const params = useParams();
    const productId = parseInt(params.productId as string);

    // const [product, setProduct] = useState<Product>(productInitialState);
    const [files, setFiles] = useState([]);

    const [editMood, setEditMood] = useState(false);

    // Validation State
    const [productState, dispatchProduct] = useReducer(productReducer, productInitialState);

    useEffect(() => {
        dispatchProduct({
            type: ProductActions.VALIDATE_PHOTO,
            payload: files.length > 0,
        });
    }, [files]);

    useEffect(() => {
        // Fetch Product details
        (async () => {
            const productData: Product = await getOneProduct(productId);
            dispatchProduct({
                type: ProductActions.LOAD_PRODUCT, payload: {
                    id: productId,
                    photo: productData.photo as string,
                    title: productData.title,
                    category: productData.category,
                    desc: productData.desc as string,
                    pkgCap: productData.pkgCap,
                    pkgPriceBuy: productData.pkgPriceBuy,
                    pkgPriceSell: productData.pkgPriceSell,
                    unitPrice: productData.unitPrice
                }
            })
        })();
    }, []);

    function titleChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        console.log("hi");

    }

    function categoryChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        console.log("hi");

    }

    function descChangeHandler(event: ChangeEvent<HTMLTextAreaElement>) {
        console.log("hi");

    }

    function pkgCapChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        console.log("hi");

    }

    function pkgPriceBuyChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        console.log("hi");

    }

    function pkgPriceSellChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        console.log("hi");

    }

    function unitPriceChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        console.log("hi");

    }

    function photoChangeHandler(event: any) {
        setFiles(event.target.files);
    }

    async function upLoadHandler(event: any) {
        event.preventDefault();

        if (!files) return;

        // Call uploadFile function from API
        const product: Product = await uploadProductPhoto(productId, files);
        dispatchProduct({type: ProductActions.LOAD_PHOTO, payload: product.photo!})
    }

    function editClickHandler() {
        setEditMood((prevState) => !prevState);
    }

    return (
        <Fragment>
            <div className="flex justify-between mx-2 mt-8 mb-2">
                <Link
                    to={".."}
                    className="text-blue-900 hover:text-blue-400 font-bold underline"
                >
                    Back
                </Link>
                <h1 className="text-lg text-blue-900 font-bold">
                    PRODUCT UNIQUE NUMBER: {productState.id}
                </h1>
                <div>
                    <button
                        className="btn btn-sm btn-accent mx-1"
                        onClick={editClickHandler}
                    >
                        {editMood ? "Done" : "Edit"}
                    </button>
                    <button className="btn btn-sm btn-secondary mx-1">
                        Delete
                    </button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-row justify-between">
                <form className="flex flex-wrap" onSubmit={upLoadHandler}>
                    <input hidden defaultValue={productId} />
                    <input
                        type="file"
                        placeholder="name"
                        className="input input-bordered max-w-xs mr-1"
                        disabled={!editMood}
                        onChange={photoChangeHandler}
                    />
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!editMood || !productState.photoIsValid}
                    >
                        Upload
                    </button>
                </form>
                <img
                    src={
                        productState.photo
                            ? `http://localhost:5000/api/public/${productState.photo}`
                            : ""
                    }
                    className="w-36"
                    alt={productState.titleEntry}
                />
            </div>
            <div className="divider"></div>
            <form>
                <input
                    type="text"
                    placeholder="title"
                    className={
                        "input input-bordered w-full max-w-xs m-2 " +
                        (!productState.titleIsValid
                            ? "border-rose-600 border-2"
                            : "")
                    }
                    disabled={!editMood}
                    value={productState.titleEntry}
                    onChange={titleChangeHandler}
                />
                <select
                    className={"select select-bordered w-full max-w-xs m-2"}
                    disabled={!editMood}
                    onChange={categoryChangeHandler}
                    value={productState.categoryEntry}
                >
                    <option disabled value="category">
                        Category
                    </option>
                    {Categories.map((cat: string, idx: number) => (
                        <option key={idx} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <textarea
                    className="textarea textarea-bordered w-full m-2"
                    disabled={!editMood}
                    placeholder="description"
                    value={productState.descEntry}
                    onChange={descChangeHandler}
                ></textarea>
                <input
                    type="number"
                    placeholder="package capacity"
                    className={
                        "input input-bordered w-48 max-w-xs m-2 " +
                        (!productState.pkgCapIsValid
                            ? "border-rose-600 border-2"
                            : "")
                    }
                    disabled={!editMood}
                    value={productState.pkgCapEntry}
                    onChange={pkgCapChangeHandler}
                />
                <input
                    type="number"
                    placeholder="package buy price"
                    className={
                        "input input-bordered w-48 max-w-xs m-2 " +
                        (!productState.pkgPriceBuyIsValid
                            ? "border-rose-600 border-2"
                            : "")
                    }
                    disabled={!editMood}
                    value={productState.pkgPriceBuyEntry}
                    onChange={pkgPriceBuyChangeHandler}
                />
                <input
                    type="number"
                    placeholder="package sell price"
                    className={
                        "input input-bordered w-48 max-w-xs m-2 " +
                        (!productState.pkgPriceSellIsValid
                            ? "border-rose-600 border-2"
                            : "")
                    }
                    disabled={!editMood}
                    value={productState.pkgPriceSellEntry}
                    onChange={pkgPriceSellChangeHandler}
                />
                <input
                    type="number"
                    placeholder="unit price"
                    className="input input-bordered w-48 max-w-xs m-2"
                    disabled={!editMood}
                    value={productState.unitPriceEntry}
                    onChange={unitPriceChangeHandler}
                />
                <button className="btn m-2" disabled>
                    Submit
                </button>
            </form>
        </Fragment>
    );
};

export default ProductDetails;
