import "./right-sidebar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getAllUsers } from "../../slices/userSlice";

export function RightSidebar() {
    const dispatch = useDispatch();
    const { isAuthorized, token } = useSelector((state) => state.authReducer);
    const { allUser, loggedInUser } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

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

    const filteredUsers = allUser?.filter(
        (currentUser) =>
            loggedInUser._id != currentUser._id &&
            !loggedInUser.following.some(
                (user1) => user1._id == currentUser._id
            )
    );

    const followUserClickHandler = async (userId) => {
        try {
            await dispatch(
                followUser({ followUserId: userId, token })
            ).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="right-sidebar text-s">
            {searchBar}
            <div className="follow-suggestion">
                <h1 className="follow-suggestion-header">Who to Follow</h1>
                <div className="user-list">
                    {filteredUsers.length === 0
                        ? "No user found."
                        : filteredUsers?.map(
                              ({ _id, username, firstName, lastName }) => (
                                  <div className="user" key={_id}>
                                      <div className="user-info">
                                          <Link to="/" className="user-picture">
                                              <i className="fas fa-user-circle"></i>
                                          </Link>
                                          <div className="profile-info">
                                              <p className="profile-name">{`${firstName} ${lastName}`}</p>
                                              <p className="profile-username">
                                                  @{username}
                                              </p>
                                          </div>
                                      </div>

                                      <button
                                          onClick={() =>
                                              followUserClickHandler(_id)
                                          }
                                          className="btn btn-white follow-btn"
                                      >
                                          Follow
                                      </button>
                                  </div>
                              )
                          )}
                </div>
            </div>
        </div>
    );
}
