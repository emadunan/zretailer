import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { Product } from "../interfaces/Product";

const Home: FC = () => {
    const products = useSelector((state: RootState) => state.product.products);
    return (
        <Fragment>
            <div>This is the home page</div>
            {products.map((prod: Product) => (
                <li key={prod.id}>{prod.title}</li>
            ))}
        </Fragment>
    );
};

export default Home;
