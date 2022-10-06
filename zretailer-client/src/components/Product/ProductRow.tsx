import { FC } from "react";

const ProductRow: FC<{
    idx: number;
    title: string;
    category: string;
    pkgCap: number;
    pkgPriceBuy: number;
    pkgPriceSell: number;
    unitPrice: number;
}> = (props) => {
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
                <button className="btn btn-primary btn-xs mx-1">Edit</button>
                <button className="btn btn-error btn-xs mx-1">Delete</button>
            </td>
        </tr>
    );
};

export default ProductRow;
