import { FC } from "react";

const AdminOffers: FC = () => {
    return (
        <div>
            <h1>Admin Offers Component</h1>
            <form className="flex flex-col">
                <div className="my-4">
                    <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs mx-2" />
                    <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs mx-2" />
                </div>

                <div className="my-4">
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mx-2" />
                    <select className="select select-bordered w-full max-w-xs mx-2">
                        <option disabled selected>Products</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <button className="btn btn-outline mx-2">Button</button>
                </div>

                <div className="my-4">
                    <button type="button" className="btn btn-accent mx-2">Button</button>
                    <button type="button" className="btn btn-accent mx-2">Button</button>
                    <button type="button" className="btn btn-accent mx-2">Button</button>
                    <button type="button" className="btn btn-accent mx-2">Button</button>
                    <button type="button" className="btn btn-accent mx-2">Button</button>
                    <button type="button" className="btn btn-accent mx-2">Button</button>
                </div>

            </form>
        </div>
    );
}

export default AdminOffers;
