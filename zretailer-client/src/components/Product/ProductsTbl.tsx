import { useSelector, useDispatch } from "react-redux";

import ProductRow from "./ProductRow";
import Product from "../../interfaces/Product";
import { RootState } from "../../context/store";
import { arrayFromNumbr } from "../../utils/main";
import { getProducts } from "../../api/products";
import { showProducts } from "../../context/productSlice";

function ProductsTbl() {
    const dispatch = useDispatch();
    const { products, pages, pageSize } = useSelector(
        (state: RootState) => state.product
    );
    

    async function getPageProductsHandler(page = 1, size = 4) {        
        const data = await getProducts(page, size);
        dispatch(showProducts(data));
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
            <select
                className="select select-bordered select-sm max-w-xs mr-1"
                defaultValue="page size"
                onChange={(event) => getPageProductsHandler(1, +event.target.value)}
            >
                <option disabled value="page size">
                    Page Size
                </option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
            </select>
            <div className="btn-group mt-6">
                {arrayFromNumbr(pages).map((n) => (
                    <button
                        className="btn btn-sm"
                        key={n}
                        onClick={getPageProductsHandler.bind(this, n, pageSize)}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductsTbl;
