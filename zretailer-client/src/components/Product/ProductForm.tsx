import { FC, ChangeEvent, useEffect, useReducer } from "react";
import { Form } from "react-router-dom";

import { Categories } from "../../data/categories";

// Validation Reducer Setup
enum ValidationActions {
    VALIDATE_NAME = "VALIDATE_NAME",
    VALIDATE_CATEGORY = "VALIDATE_CATEGORY",
    TOUCH_NAME = "TOUCH_NAME",
    TOUCH_CATEGORY = "TOUCH_CATEGORY",
    VALIDATE_FROM = "VALIDATE_FROM",
}

type ValidationAction =
    | { type: ValidationActions.VALIDATE_FROM }
    | { type: ValidationActions.VALIDATE_NAME; payload: boolean | null }
    | { type: ValidationActions.VALIDATE_CATEGORY; payload: boolean | null }
    | { type: ValidationActions.TOUCH_NAME; payload: boolean }
    | { type: ValidationActions.TOUCH_CATEGORY; payload: boolean };

interface ValidationState {
    nameIsValid: boolean | null;
    nameIsTouched: boolean;
    categoryIsValid: boolean | null;
    categoryIsTouched: boolean;
    formIsValid: boolean;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function validationReducer(
    state: ValidationState | any,
    action: ValidationAction
) {
    switch (action.type) {
        case ValidationActions.VALIDATE_NAME: {
            return {
                ...state,
                nameIsValid: action.payload,
            };
        }

        case ValidationActions.VALIDATE_CATEGORY: {
            return {
                ...state,
                categoryIsValid: action.payload,
            };
        }

        case ValidationActions.TOUCH_NAME: {
            return {
                ...state,
                nameIsTouched: action.payload,
            };
        }

        case ValidationActions.TOUCH_CATEGORY: {
            return {
                ...state,
                categoryIsTouched: action.payload,
            };
        }

        case ValidationActions.VALIDATE_FROM: {
            const isValid = state.nameIsValid && state.categoryIsValid;
            return {
                ...state,
                formIsValid: isValid,
            };
        }

        default:
            return state;
    }
}

const initialState: ValidationState = {
    nameIsValid: null,
    nameIsTouched: false,
    categoryIsValid: null,
    categoryIsTouched: false,
    formIsValid: false,
};

const ProductForm: FC = () => {
    const [validationState, dispatchValidation] = useReducer(
        validationReducer,
        initialState
    );

    const validateNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        dispatchValidation({
            type: ValidationActions.VALIDATE_NAME,
            payload: name.length > 3,
        });
    };

    const validateCategoryHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        dispatchValidation({
            type: ValidationActions.VALIDATE_CATEGORY,
            payload: category.length > 4,
        });
    };

    const {
        formIsValid,
        nameIsValid,
        nameIsTouched,
        categoryIsValid,
        categoryIsTouched,
    } = validationState;

    useEffect(() => {
        dispatchValidation({ type: ValidationActions.VALIDATE_FROM });
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
                    dispatchValidation({
                        type: ValidationActions.TOUCH_NAME,
                        payload: true,
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
                    dispatchValidation({
                        type: ValidationActions.TOUCH_CATEGORY,
                        payload: true,
                    })
                }
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
};

export default ProductForm;
