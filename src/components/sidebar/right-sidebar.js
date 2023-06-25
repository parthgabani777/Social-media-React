import "./right-sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getAllUsers } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { useClickOutside } from "../../hooks/useClickOutside";

export function RightSidebar() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { isAuthorized, token } = useSelector((state) => state.authReducer);
  const { allUser, loggedInUser } = useSelector((state) => state.userReducer);
  const { following = [] } = loggedInUser;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [loggedInUser]);

  // For search query
  const [search, setSearch] = useState("");
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const debounce = (cb, delay = 200) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), delay);
    };
  };
  const debouncedOnChangeHandler = debounce(onChangeHandler, 300);

  // For filtering the products based on search query
  const SearchedUsers = allUser?.filter((user) => {
    const isCurrentUser = user._id === loggedInUser?._id;
    if (isCurrentUser) {
      return false;
    }

    const isMatchingSearch = user.username
      .toLowerCase()
      .includes(search.toLowerCase());
    return isMatchingSearch === -1 ? false : true;
  });

  // For showing search results
  const [showSearchResults, setShowSearchResults] = useState(false);
  const ref = useRef();
  const inputRef = useRef();
  useClickOutside(ref, () => {
    setShowSearchResults(false);
  });

  const searchBar = (
    <div className="searchbar" ref={ref}>
      <input
        ref={inputRef}
        type="text"
        className="search-box text-s"
        placeholder="Search user"
        onChange={debouncedOnChangeHandler}
        onClick={() => setShowSearchResults(true)}
      />
      {showSearchResults && search !== "" && (
        <div
          className="search-suggestion"
          onClick={() => {
            setShowSearchResults(false);
            inputRef.current.value = "";
          }}
        >
          {SearchedUsers.length !== 0 ? (
            SearchedUsers.map((user) => (
              <Link
                to={`/user/${user._id}`}
                className="user-info"
                key={user._id}
              >
                <div className="user-picture">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="profile picture"
                      className="profile-picture"
                    />
                  ) : (
                    <i className="fas fa-user-circle"></i>
                  )}
                </div>
                <div className="profile-info">
                  <p className="profile-name">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="profile-username">@{user.username}</p>
                </div>
              </Link>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </div>
  );

  if (!isAuthorized)
    return <div className="right-sidebar text-s">{searchBar}</div>;

  const filteredUsers = allUser?.filter(
    (currentUser) =>
      loggedInUser._id !== currentUser._id &&
      !following?.some((user1) => user1._id === currentUser._id)
  );

  const followUserClickHandler = async (userId) => {
    try {
      await dispatch(followUser({ followUserId: userId, token })).unwrap();
    } catch (error) {
      toast.error(error);
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
                ({ _id, username, firstName, lastName, picture }, index) =>
                  index < 5 && (
                    <div
                      className="user"
                      key={_id}
                      onClick={() => {
                        navigation(`/user/${_id}`);
                      }}
                    >
                      <div className="user-info">
                        <div className="user-picture">
                          {picture ? (
                            <img
                              src={picture}
                              alt="profile picture"
                              className="profile-picture"
                            />
                          ) : (
                            <i className="fas fa-user-circle"></i>
                          )}
                        </div>
                        <div className="profile-info">
                          <p className="profile-name">{`${firstName} ${lastName}`}</p>
                          <p className="profile-username">@{username}</p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          followUserClickHandler(_id);
                        }}
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
