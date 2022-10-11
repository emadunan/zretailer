import { FC, Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct } from "../api/products";
import { Product } from "../interfaces/Product";

// interface ProductDetailsProps {
//     id: number;
// }

const ProductDetails: FC = () => {
    const params = useParams();
    const productId = parseInt(params.productId as string);

    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        // Fetch Product details
        (async () => {
            const product = await getOneProduct(productId);
            setProduct(product);
        })()
    }, []);

    return (
        <Fragment>
            <h1 className="text-lg font-bold">{product?.title}</h1>
            <p>{product?.category}</p>
            <Link to={".."}>Back</Link>

        </Fragment>
    );
}

export default ProductDetails;