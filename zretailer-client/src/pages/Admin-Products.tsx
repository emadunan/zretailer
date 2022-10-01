function AdminProducts() {
    return (
        <div>
            <h1 className="text-lg font-bold">Products</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <form className="flex flex-wrap">
                <input type="text" placeholder="name" className="input input-sm input-bordered w-full max-w-xs m-2" />
                <select className="select select-sm select-bordered w-full max-w-xs m-2">
                    <option disabled selected>Category</option>
                    <option value="meat and fish">Meat and Fish</option>
                    <option value="dairy">Dairy</option>
                    <option value="vegetables and fruit">Vegetables and fruit</option>
                    <option value="freezer">Freezer</option>
                    <option value="bread and bread spreads">Bread and bread spreads</option>
                    <option value="dried goods">Dried Goods</option>
                    <option value="snacks">Snacks</option>
                    <option value="care products">Care Products</option>
                </select>
                <textarea className="textarea textarea-bordered w-full m-2" placeholder="description"></textarea>
                <input type="number" placeholder="package capacity" className="input input-sm input-bordered w-48 max-w-xs m-2" />
                <input type="number" placeholder="package buy price" className="input input-sm input-bordered w-48 max-w-xs m-2" />
                <input type="number" placeholder="package sell price" className="input input-sm input-bordered w-48 max-w-xs m-2" />
                <input type="number" placeholder="unit sell price" className="input input-sm input-bordered w-48 max-w-xs m-2" />
                <button className="btn btn-sm m-2">Add Product</button>
            </form>
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
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                            <td>
                                <button className="btn btn-primary btn-sm m-2">Edit</button>
                                <button className="btn btn-error btn-sm m-2">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Zemlak, Daniel and Leannon</td>
                            <td>United States</td>
                            <td>12/5/2020</td>
                            <td>Purple</td>
                            <td>
                                <button className="btn btn-primary btn-sm m-2">Edit</button>
                                <button className="btn btn-error btn-sm m-2">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Carroll Group</td>
                            <td>China</td>
                            <td>8/15/2020</td>
                            <td>Red</td>
                            <td>
                                <button className="btn btn-primary btn-sm m-2">Edit</button>
                                <button className="btn btn-error btn-sm m-2">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Marjy Ferencz</td>
                            <td>Office Assistant I</td>
                            <td>Rowe-Schoen</td>
                            <td>Russia</td>
                            <td>3/25/2021</td>
                            <td>Crimson</td>
                            <td>
                                <button className="btn btn-primary btn-sm m-2">Edit</button>
                                <button className="btn btn-error btn-sm m-2">Delete</button>
                            </td>
                        </tr>
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
        </div>
    );
}

export default AdminProducts;