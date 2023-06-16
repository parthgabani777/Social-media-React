import "./left-sidebar.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { signout } from "../../slices/authSlice";
import { AddPostModal } from "../add-post-modal/add-post-modal";
import { addPost } from "../../slices/postSlice";
import { toast } from "react-toastify";

export function LeftSidebar() {
  const { isAuthorized, token } = useSelector((state) => state.authReducer);
  const { loggedInUser } = useSelector((state) => state.userReducer);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const signoutClickHandler = () => {
    dispatch(signout());
  };

  const navItems = [
    { url: "/", name: "Home", icon: "fa-home" },
    { url: "/explore", name: "Explore", icon: "fa-compass" },
    { url: "/profile", name: "Profile", icon: "fa-user-circle" },
    { url: "/setting", name: "Setting", icon: "fa-cog" },
  ];

  // Add post modal toggler
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const showAddPostModalClickHandler = () => {
    if (isAuthorized) {
      return setShowAddPostModal(true);
    }
    toast.error("You must be logged in to add a post");
    navigation("/login");
  };

  return (
    <aside className="sidebar text-s">
      <Link to="/" className="sidebar-logo">
        Socialize
      </Link>

      {navItems.map(({ url, name, icon }) => (
        <NavLink to={url} activeclassname="active" className="btn" key={name}>
          <i className={`fas ${icon}`}></i>
          {name}
        </NavLink>
      ))}
      <button
        className="btn btn-primary br-2 create-post-btn"
        onClick={showAddPostModalClickHandler}
      >
        <i className="fas fa-plus-circle"></i>
        Create Post
      </button>
      <AddPostModal
        show={showAddPostModal}
        onClose={() => setShowAddPostModal(false)}
        onSubmit={async (postData) => {
          try {
            await dispatch(addPost({ postData, token })).unwrap();
            setShowAddPostModal(false);
            toast.success("Post Created");
          } catch (error) {
            toast.error("Post can't be created");
          }
        }}
      />

      <div className="sidebar-footer">
        {isAuthorized ? (
          <div>
            <div className="sidebar-profile">
              <Link to="/profile" className="profile-picture">
                {loggedInUser.picture ? (
                  <img
                    src={loggedInUser.picture}
                    alt="profile picture"
                    className="profile-picture"
                  />
                ) : (
                  <i className="fas fa-user-circle"></i>
                )}
              </Link>
              <div className="sidebar-profile-info">
                <p className="sidebar-profile-name">
                  {loggedInUser.firstName} {loggedInUser.lastName}
                </p>
                <p className="sidebar-profile-username">
                  @{loggedInUser.username}
                </p>
              </div>
            </div>
            <button
              className="btn auth-btn text-s"
              onClick={signoutClickHandler}
            >
              Signout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn auth-btn">
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}
