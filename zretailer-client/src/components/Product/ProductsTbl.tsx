import ProductRow from "./ProductRow";
import Product from "../../interfaces/Product";

function ProductsTbl(props: any) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
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
                </thead>
                <tbody>
                    {props.products.map((prod: Product) => {
                        return (
                            <ProductRow
                                key={prod.id}
                                name={prod.name}
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
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default ProductsTbl;