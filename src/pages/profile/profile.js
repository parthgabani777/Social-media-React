import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/post/post";
import { useEffect, useState } from "react";
import { CustomLoader } from "../../components/customLoader/customloader";
import { Link } from "react-router-dom";
import { getUserPosts } from "../../slices/userSlice";
import { getAllPosts } from "../../slices/postSlice";

function Profile() {
    const { isLoading, loggedInUser, userPosts } = useSelector(
        (state) => state.userReducer
    );
    const { _id: userId } = loggedInUser;
    const { posts } = useSelector((state) => state.postsReducer);
    const dispatch = useDispatch();

    const [localLoader, setLocalLoader] = useState(true);

    useEffect(() => {
        setLocalLoader(false);
        dispatch(getAllPosts());
    }, []);

    useEffect(() => {
        dispatch(getUserPosts({ userId }));
    }, [posts]);

    const getBookmarkedPost = posts.filter((post) =>
        loggedInUser.bookmarks.some((userPost) => userPost._id === post._id)
    );

    const getLikedPost = posts.filter((post) =>
        post.likes.likedBy.some((likeUserId) => likeUserId === userId)
    );

    const tabLinks = [
        { name: "Posts", id: "posts", icon: "fa-clone" },
        { name: "Liked", id: "liked", icon: "fa-heart" },
        { name: "Bookmarked", id: "bookmarked", icon: "fa-bookmark" },
    ];

    const [activeTab, setActiveTab] = useState("posts");

    const onTabChangeHandler = (e) => {
        setActiveTab(e.currentTarget.id);
    };

    const tabContent = () => {
        switch (activeTab) {
            case "posts":
                const userPostsSortByLatest = userPosts
                    ?.slice()
                    .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );

                return (
                    <>
                        {userPosts?.length === 0
                            ? "No post created"
                            : userPostsSortByLatest?.map((post) => (
                                  <Post post={post} key={post._id} />
                              ))}
                    </>
                );
            case "liked":
                return (
                    <>
                        {getLikedPost.length === 0
                            ? "No post liked."
                            : getLikedPost.map((post) => (
                                  <Post post={post} key={post._id} />
                              ))}
                    </>
                );
            case "bookmarked":
                return (
                    <>
                        {getBookmarkedPost.length === 0
                            ? "No post bookmarked"
                            : getBookmarkedPost.map((post) => (
                                  <Post post={post} key={post._id} />
                              ))}
                    </>
                );
            default:
                return;
        }
    };

    if (isLoading && localLoader) return <CustomLoader />;

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-picture">
                    {loggedInUser.picture ? (
                        <img
                            src={loggedInUser.picture}
                            alt="profile picture"
                            className="profile-picture"
                        />
                    ) : (
                        <i className="fas fa-user-circle"></i>
                    )}
                    <Link
                        to="/setting"
                        className="btn btn-primary br-3 text-s profile-edit-btn"
                    >
                        Edit Profile
                    </Link>
                </div>
                <div className="profile-info">
                    <div className="profile-name-info">
                        <span className="profile-name fw-bold">
                            {loggedInUser.firstName} {loggedInUser.lastName}
                        </span>
                        <span className="profile-username">
                            @{loggedInUser.username}
                        </span>
                    </div>

                    <div className="profile-description">
                        {loggedInUser.bio || ""}
                    </div>
                    <div className="profile-website">
                        <a
                            href={`https://${loggedInUser.portfolio}`}
                            target="_blank"
                        >
                            {loggedInUser.portfolio || ""}
                        </a>
                    </div>
                    <div className="profile-stat">
                        <span className="follower">
                            <span className="fw-bold">
                                {loggedInUser.followers.length}
                            </span>{" "}
                            Followers
                        </span>
                        <span className="following">
                            <span className="fw-bold">
                                {loggedInUser.followings.length}
                            </span>{" "}
                            Following
                        </span>
                    </div>
                </div>
            </div>

            <div className="profile-navlinks-container">
                {tabLinks.map(({ name, id, icon }) => (
                    <div
                        className={`profile-navlink ${
                            activeTab === id && "active"
                        }`}
                        id={id}
                        onClick={onTabChangeHandler}
                        key={id}
                    >
                        <i className={`fas ${icon}`}></i>
                        {name}
                    </div>
                ))}
            </div>

            <div className="post-container">{tabContent()}</div>
        </div>
    );
}

export { Profile };
