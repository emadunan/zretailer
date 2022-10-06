import { Fragment } from "react";
import ProductRow from "./ProductRow";
import Product from "../../interfaces/Product";

import Pagination from "../UI/Pagination";

function ProductsTbl(props: any) {
    const { products, pages, pageSize, currentPage } = props;

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
                        {products.map((prod: Product, idx: number) => {
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
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                pages={pages}
                onGetPageProducts={props.onGetPageProducts}
            />
        </Fragment>
    );
}

export default ProductsTbl;
