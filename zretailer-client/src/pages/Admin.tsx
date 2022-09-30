import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

function Admin() {
    return (
        <Fragment>
            <main className="flex flex-col justify-center items-center">
                <h1>Main Admin Page!</h1>
                <div className="flex flex-row my-4">
                    <Link to="products" className="mx-4 link link-primary">Products Managment</Link>
                    <Link to="offers" className="mx-4 link link-primary">Offers Managment</Link>
                </div>
            </main>
            <Outlet />
        </Fragment>
    );
}

export default Admin;