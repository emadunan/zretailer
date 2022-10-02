import PropTypes, { InferProps } from "prop-types";

function ProductRow(props: InferProps<typeof ProductRow.propTypes>) {
    return (
        <tr>
            <th>1</th>
            <td>{props.name}</td>
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
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    desc: PropTypes.string,
    pkgCap: PropTypes.string.isRequired,
    pkgPriceBuy: PropTypes.string.isRequired,
    pkgPriceSell: PropTypes.string.isRequired,
    unitPrice: PropTypes.string.isRequired,
};

export default ProductRow;
