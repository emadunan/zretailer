import { Link } from "react-router-dom";

import UserDropdown from "../components/User/UserDropdown";

function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-32"
                    >
                        <li>
                            <Link to={"home"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"about"}>About</Link>
                        </li>
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Admin
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </a>
                            <ul className="p-2 bg-white">
                                <li>
                                    <Link to={"admin/products"}>
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"admin/offers"}>
                                        Orders
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl" to="/">
                    Thrifty Retail
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link to="home">Home</Link>
                    </li>
                    <li tabIndex={0}>
                        <a>
                            Admin
                            <svg
                                className="fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                        </a>
                        <ul className="p-2 bg-white shadow-lg">
                            <li>
                                <Link to={"admin/products"}>
                                    Products Managmaent
                                </Link>
                            </li>
                            <li>
                                <Link to={"admin/offers"}>
                                    Orders Managmaent
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="about">About</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-sm btn-outline">Login</button>
                {false && <UserDropdown />}
            </div>
        </div>
    );
}

export default Navbar;
