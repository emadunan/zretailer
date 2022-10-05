import { useSelector, useDispatch } from "react-redux";

import ProductRow from "./ProductRow";
import Product from "../../interfaces/Product";
import { RootState } from "../../context/store";
import { getProducts } from "../../api/products";
import { showProducts } from "../../context/productSlice";
import { arrayFromNumbr } from "../../utils/main";
import { useState } from "react";

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
            <div className="flex items-center justify-between mt-4">
                <select
                    className="select select-bordered select-sm max-w-xs mr-4"
                    defaultValue="page size"
                    onChange={(event) =>
                        getPageProductsHandler(1, +event.target.value)
                    }
                >
                    <option disabled value="page size">
                        Page Size
                    </option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value={32}>32</option>
                </select>
                <div className="btn-group">
                    <button className="btn btn-sm" onClick={getPageProductsHandler.bind(this, currentPage - 1, pageSize)}>«</button>
                    <button className="btn btn-sm" >Page {currentPage} / {pages}</button>
                    <button className="btn btn-sm" onClick={getPageProductsHandler.bind(this, currentPage + 1, pageSize)}>»</button>
                </div>
                <select
                    className="select select-bordered select-sm max-w-xs mr-4"
                    value={currentPage}
                    onChange={(event) => getPageProductsHandler(+event.target.value, pageSize)}
                >
                    <option disabled value="page size">
                        Go To Page
                    </option>
                    {arrayFromNumbr(pages).map(page => <option key={page} value={page}>Page {page}</option>)}
                </select>
            </div>
        </div>
    );
}

export default ProductsTbl;
