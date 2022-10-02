import PropTypes, { InferProps } from "prop-types";

function ProductRow(props: InferProps<typeof ProductRow.propTypes>) {
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
                <button className="btn btn-primary btn-sm m-2">Edit</button>
                <button className="btn btn-error btn-sm m-2">Delete</button>
            </td>
        </tr>
    );
}

ProductRow.propTypes = {
    idx: PropTypes.number,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    desc: PropTypes.string,
    pkgCap: PropTypes.number.isRequired,
    pkgPriceBuy: PropTypes.number.isRequired,
    pkgPriceSell: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired,
};

export default ProductRow;
