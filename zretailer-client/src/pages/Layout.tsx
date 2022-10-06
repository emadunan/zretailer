import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout: FC = () => {
    return (
        <Fragment>
            <Navbar />
            <main className="m-6">
                <Outlet />
            </main>
        </Fragment>
    );
}

export default Layout;
