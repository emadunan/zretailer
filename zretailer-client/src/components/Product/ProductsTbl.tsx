import { useSelector, useDispatch } from "react-redux";

import ProductRow from "./ProductRow";
import Product from "../../interfaces/Product";
import { RootState } from "../../context/store";
import { getProducts } from "../../api/products";
import { showProducts } from "../../context/productSlice";
import { Fragment, useState } from "react";

import Pagination from "../UI/Pagination";

function ProductsTbl() {
    const dispatch = useDispatch();
    const { products, pages, pageSize } = useSelector(
        (state: RootState) => state.product
    );

    const [currentPage, setCurrentPage] = useState(1);

    async function getPageProductsHandler(page = 1, size = 4) {
        // Check page number validity and return if not
        if (page < 1 || page > pages) return;

        // Get products and persist it in the state
        const data = await getProducts(page, size);
        dispatch(showProducts(data));

        setCurrentPage(page);
    }

    return (
        <Fragment>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Pkg Capacity</th>
                            <th>Pkg Buy Price</th>
                            <th>Pkg Sell Price</th>
                            <th>Unit Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod: Product, idx) => {
                            return (
                                <ProductRow
                                    key={prod.id}
                                    idx={++idx}
                                    title={prod.title}
                                    category={prod.category}
                                    pkgCap={prod.pkgCap}
                                    pkgPriceBuy={prod.pkgPriceBuy}
                                    pkgPriceSell={prod.pkgPriceSell}
                                    unitPrice={prod.unitPrice}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} pageSize={pageSize} pages={pages} onGetPageProducts={getPageProductsHandler} />
        </Fragment>
    );
}

export default ProductsTbl;
