import { FC } from "react";
import { Link } from "react-router-dom";

interface ProductRowProps {
    id: string;
    idx: number;
    title: string;
    category: string;
    pkgCap: number;
    pkgPriceBuy: number;
    pkgPriceSell: number;
    unitPrice: number;
}

const ProductRow: FC<ProductRowProps> = (props) => {
    return (
        <tr>
            <th>{props.idx}</th>
            <td>{props.title}</td>
            <td>{props.category}</td>
            <td>{props.pkgCap}</td>
            <td>{props.pkgPriceBuy}</td>
            <td>{props.pkgPriceSell}</td>
            <td>{props.unitPrice}</td>
            <td>
                <Link
                    className="btn btn-primary btn-xs mx-1"
                    to={`${props.id}`}
                >
                    Details
                </Link>
            </td>
        </tr>
    );
};

export default ProductRow;
