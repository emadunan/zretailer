import { useSelector } from "react-redux";

import ProductRow from "./ProductRow";
import Product from "../../interfaces/Product";
import { RootState } from "../../context/store";

function ProductsTbl() {
    const products = useSelector((state: RootState) => state.product.products);

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
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Pkg Capacity</th>
                        <th>Pkg Buy Price</th>
                        <th>Pkg Sell Price</th>
                        <th>Unit Price</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default ProductsTbl;
