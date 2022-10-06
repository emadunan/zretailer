import { useEffect, useReducer } from "react";
import { Form } from "react-router-dom";

const validationReducer = (state: any, action: any) => {
    switch (action.type) {
        case "VALIDATE_NAME": {
            return {
                ...state,
                nameIsValid: action.payload.name.length > 3,
            };
        }

        case "VALIDATE_CATEGORY": {
            return {
                ...state,
                categoryIsValid: action.payload.category.length > 4,
            };
        }

        case "TOUCH_NAME": {
            return {
                ...state,
                nameIsTouched: action.payload.nameIsTouched,
            };
        }

        case "TOUCH_CATEGORY": {
            return {
                ...state,
                categoryIsTouched: action.payload.categoryIsTouched,
            };
        }

        case "VALIDATE_FROM": {
            const isValid = state.nameIsValid && state.categoryIsValid;
            return {
                ...state,
                formIsValid: isValid,
            };
        }

        default:
            return state;
    }
};

const initialState = {
    nameIsValid: null,
    nameIsTouched: false,
    categoryIsValid: null,
    categoryIsTouched: false,
    formIsValid: false,
};

function ProductForm() {
    const [state, dispatcher] = useReducer(validationReducer, initialState);

    const validateNameHandler = (event: any) => {
        const name = event.target.value;
        dispatcher({ type: "VALIDATE_NAME", payload: { name } });
    };

    const validateCategoryHandler = (event: any) => {
        const category = event.target.value;
        dispatcher({ type: "VALIDATE_CATEGORY", payload: { category } });
    };

    const {
        formIsValid,
        nameIsValid,
        nameIsTouched,
        categoryIsValid,
        categoryIsTouched,
    } = state;

    useEffect(() => {
        dispatcher({ type: "VALIDATE_FROM" });
    }, [nameIsValid, categoryIsValid]);

    return (
        <Form className="flex flex-wrap" method="post" action="/admin/products">
            <input
                type="text"
                placeholder="name"
                className={
                    "input input-sm input-bordered w-full max-w-xs m-2 " +
                    (!nameIsValid && nameIsTouched
                        ? "border-2 border-rose-600"
                        : "")
                }
                name="name"
                onChange={validateNameHandler}
                onFocus={() =>
                    dispatcher({
                        type: "TOUCH_NAME",
                        payload: { nameIsTouched: true },
                    })
                }
            />
            <select
                className={
                    "select select-sm select-bordered w-full max-w-xs m-2 " +
                    (!categoryIsValid && categoryIsTouched
                        ? "border-2 border-rose-600"
                        : "")
                }
                name="category"
                defaultValue="category"
                onChange={validateCategoryHandler}
                onFocus={() =>
                    dispatcher({
                        type: "TOUCH_CATEGORY",
                        payload: { categoryIsTouched: true },
                    })
                }
            >
                <option disabled value="category">
                    Category
                </option>
                <option value="meat and fish">Meat and Fish</option>
                <option value="dairy">Dairy</option>
                <option value="vegetables and fruit">
                    Vegetables and fruit
                </option>
                <option value="freezer">Freezer</option>
                <option value="bread and bread spreads">
                    Bread and bread spreads
                </option>
                <option value="dried goods">Dried Goods</option>
                <option value="snacks">Snacks</option>
                <option value="care products">Care Products</option>
            </select>
            <textarea
                className="textarea textarea-bordered w-full m-2"
                placeholder="description"
                name="desc"
            ></textarea>
            <input
                type="number"
                placeholder="package capacity"
                className="input input-sm input-bordered w-48 max-w-xs m-2"
                name="pkg-cap"
            />
            <input
                type="number"
                placeholder="package buy price"
                className="input input-sm input-bordered w-48 max-w-xs m-2"
                name="pkg-price-buy"
            />
            <input
                type="number"
                placeholder="package sell price"
                className="input input-sm input-bordered w-48 max-w-xs m-2"
                name="pkg-price-sell"
            />
            <input
                type="number"
                placeholder="unit price"
                className="input input-sm input-bordered w-48 max-w-xs m-2"
                name="unit-price"
            />
            <button className="btn btn-sm m-2" disabled={!formIsValid}>
                Add Product
            </button>
        </Form>
    );
}

export default ProductForm;
