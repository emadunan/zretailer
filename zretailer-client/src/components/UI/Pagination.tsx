import { arrayFromNumbr } from "../../utils/main";

function Pagination(props: any) {
    return (
        <div className="flex items-center justify-between mt-4">
            <select
                className="select select-bordered select-sm max-w-xs mr-4"
                defaultValue="page size"
                onChange={(event) =>
                    props.onGetPageProducts(1, +event.target.value)
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
                <button
                    className="btn btn-sm"
                    onClick={props.onGetPageProducts.bind(
                        this,
                        props.currentPage - 1,
                        props.pageSize
                    )}
                >
                    «
                </button>
                <button className="btn btn-sm">
                    Page {props.currentPage} / {props.pages}
                </button>
                <button
                    className="btn btn-sm"
                    onClick={props.onGetPageProducts.bind(
                        this,
                        props.currentPage + 1,
                        props.pageSize
                    )}
                >
                    »
                </button>
            </div>
            <select
                className="select select-bordered select-sm max-w-xs mr-4"
                value={props.currentPage}
                onChange={(event) =>
                    props.onGetPageProducts(+event.target.value, props.pageSize)
                }
            >
                <option disabled value="page size">
                    Go To Page
                </option>
                {arrayFromNumbr(props.pages).map((page) => (
                    <option key={page} value={page}>
                        Page {page}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Pagination;
