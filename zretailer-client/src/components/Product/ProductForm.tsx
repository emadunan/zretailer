function ProductForm() {
    return (
        <form className="flex flex-wrap">
                <input
                    type="text"
                    placeholder="name"
                    className="input input-sm input-bordered w-full max-w-xs m-2"
                />
                <select className="select select-sm select-bordered w-full max-w-xs m-2">
                    <option disabled selected>
                        Category
                    </option>
                    <option value="meat and fish">Meat and Fish</option>
                    <option value="dairy">Dairy</option>
                    <option value="vegetables and fruit">
                        Vegetables and fruit
                    </option>
                    <option value="freezer">Freezer</option>
                    <option value="bread and bread spreads">
                        Bread and bread spreads
                    </option>
                    <option value="dried goods">Dried Goods</option>
                    <option value="snacks">Snacks</option>
                    <option value="care products">Care Products</option>
                </select>
                <textarea
                    className="textarea textarea-bordered w-full m-2"
                    placeholder="description"
                ></textarea>
                <input
                    type="number"
                    placeholder="package capacity"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                />
                <input
                    type="number"
                    placeholder="package buy price"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                />
                <input
                    type="number"
                    placeholder="package sell price"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                />
                <input
                    type="number"
                    placeholder="unit sell price"
                    className="input input-sm input-bordered w-48 max-w-xs m-2"
                />
                <button className="btn btn-sm m-2">Add Product</button>
            </form>
    );
}

export default ProductForm;