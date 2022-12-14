function UserDropdown() {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-32"
            >
                <li>
                    <a>Profile</a>
                </li>
                <li>
                    <a>Settings</a>
                </li>
                <li>
                    <a>Logout</a>
                </li>
            </ul>
        </div>
    );
}

export default UserDropdown;
