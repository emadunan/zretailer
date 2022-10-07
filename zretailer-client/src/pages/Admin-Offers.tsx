import { FC, ChangeEvent, useEffect, useState } from "react";

import { getProductTitles } from "../api/products";

const AdminOffers: FC = () => {
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
            <h1>Admin Offers Component</h1>
            <form className="flex flex-col">
                <div className="my-4">
                    <input
                        type="date"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs mx-2 my-1"
                    />
                    <input
                        type="date"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs mx-2 my-1"
                    />
                </div>

                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs mx-2 my-1"
                    />
                    <select
                        className="select select-bordered w-full max-w-xs mx-2 my-1"
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
                        className="btn btn-outline mx-2"
                        type="button"
                        onClick={addProductTofferHandler}
                    >
                        Button
                    </button>
                </div>

                <div className="my-4">
                    {selectedProducts.map((prod) => (
                        <button
                            type="button"
                            className="btn btn-accent mx-2 my-1"
                            key={prod.id}
                            data-product={prod.id}
                        >
                            {prod.title}
                        </button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default AdminOffers;
