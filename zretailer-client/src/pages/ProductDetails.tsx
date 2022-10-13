import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct, uploadProductPhoto } from "../api/products";
import { Categories } from "../data/categories";
import { Product } from "../interfaces/Product";

// interface ProductDetailsProps {
//     id: number;
// }

const ProductDetails: FC = () => {
    const params = useParams();
    const productId = parseInt(params.productId as string);

    const [product, setProduct] = useState<Product>();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch Product details
        (async () => {
            const product = await getOneProduct(productId);
            setProduct(product);
        })();
    }, []);

    function categoryChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        console.log(event.target);
    }

    function photoChangeHandler(event: any) {
        setFiles(event.target.files);
    }

    async function upLoadHandler(event: any) {
        event.preventDefault();

        if (!files) return;

        // Call uploadFile function from API
        const product = await uploadProductPhoto(productId, files);
        setProduct(product);
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
                    PRODUCT UNIQUE NUMBER: {product?.id}
                </h1>
                <div>
                    <button className="btn btn-sm btn-accent mx-1">Edit</button>
                    <button className="btn btn-sm btn-secondary mx-1">
                        Delete
                    </button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between">
                <form className="flex flex-wrap" onSubmit={upLoadHandler}>
                    <input hidden defaultValue={productId} />
                    <input
                        type="file"
                        placeholder="name"
                        className="input input-bordered w-full max-w-xs mr-1"
                        name="name"
                        onChange={photoChangeHandler}
                    />
                    <button className="btn btn-primary" type="submit">
                        Upload
                    </button>
                </form>
                <img
                    src={
                        product?.photo
                            ? `http://localhost:5000/api/public/${product?.photo}`
                            : ""
                    }
                    className="w-36"
                    alt={product?.title}
                />
            </div>
            <div className="divider"></div>
            <form>
                <input
                    type="text"
                    placeholder="name"
                    className="input input-sm input-bordered w-full max-w-xs m-2 "
                    name="name"
                    value={product?.title}
                />
                <select
                    className="select select-sm select-bordered w-full max-w-xs m-2 "
                    name="category"
                    defaultValue="category"
                    onChange={categoryChangeHandler}
                    value={product?.category}
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
                    value={product?.desc}
                ></textarea>
                <input
                    type="number"
                    placeholder="package capacity"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                    name="pkg-cap"
                    value={product?.pkgCap}
                />
                <input
                    type="number"
                    placeholder="package buy price"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                    name="pkg-price-buy"
                    value={product?.pkgPriceBuy}
                />
                <input
                    type="number"
                    placeholder="package sell price"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                    name="pkg-price-sell"
                    value={product?.pkgPriceSell}
                />
                <input
                    type="number"
                    placeholder="unit price"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                    name="unit-price"
                    value={product?.unitPrice}
                />
                <button className="btn btn-sm m-2" disabled={true}>
                    Add Product
                </button>
            </form>
        </Fragment>
    );
};

export default ProductDetails;
