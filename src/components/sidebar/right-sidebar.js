import "./right-sidebar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function RightSidebar() {
    const dispatch = useDispatch();
    const { isAuthorized, token } = useSelector((state) => state.authReducer);

    useEffect(() => {}, []);

    const searchBar = (
        <div className="searchbar">
            <input
                type="text"
                className="search-box text-s"
                placeholder="Search user"
            />
        </div>
    );

    if (!isAuthorized)
        return <div className="right-sidebar text-s">{searchBar}</div>;

    return (
        <div className="right-sidebar text-s">
            {searchBar}
            <div className="follow-suggestion">
                <h1 className="follow-suggestion-header">Who to Follow</h1>
                <div className="user-list"></div>
            </div>
        </div>
    );
}
