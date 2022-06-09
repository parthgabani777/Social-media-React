import "./single-user.css";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/post/post";
import { useEffect, useState } from "react";
import { CustomLoader } from "../../components/customLoader/customloader";
import { useParams, useNavigate } from "react-router-dom";
import { followUser, getUserData, unfollowUser } from "../../slices/userSlice";
import { getUserPosts } from "../../slices/userSlice";
import { toast } from "react-toastify";

export function SingleUser() {
    const { userId } = useParams();
    const { token } = useSelector((state) => state.authReducer);
    const { userData, userPosts, isLoading, loggedInUser } = useSelector(
        (state) => state.userReducer
    );
    const posts = useSelector((state) => state.postsReducer);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const [activeTab, setActiveTab] = useState("posts");

    const onTabChangeHandler = (e) => {
        setActiveTab(e.target.id);
    };

    useEffect(() => {
        if (loggedInUser?._id === parseInt(userId)) navigation("/profile");
        (async () => {
            try {
                await dispatch(getUserData({ userId })).unwrap();
            } catch (error) {
                toast.error("User does not exist.");
            }
        })();
    }, []);

    useEffect(() => {
        dispatch(getUserPosts({ userId }));
    }, [posts]);

    const tabLinks = [{ name: "Posts", id: "posts", icon: "fa-clone" }];

    const isFollowing = loggedInUser?.following.some(
        (user) => user._id === parseInt(userId)
    );

    const followUserClickHandler = async () => {
        try {
            await dispatch(
                followUser({ followUserId: userId, token })
            ).unwrap();
        } catch (error) {
            toast.error(error);
        }
    };

    const unfollowUserClickHandler = async () => {
        try {
            await dispatch(
                unfollowUser({ followUserId: userId, token })
            ).unwrap();
        } catch (error) {
            toast.error(error);
        }
    };

    if (isLoading || !userData) {
        return <CustomLoader />;
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-picture">
                    <i className="fas fa-user-circle"></i>
                    {isFollowing ? (
                        <button
                            onClick={unfollowUserClickHandler}
                            className="btn btn-primary br-3 text-s profile-edit-btn"
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            onClick={followUserClickHandler}
                            className="btn btn-primary br-3 text-s profile-edit-btn"
                        >
                            Follow
                        </button>
                    )}
                </div>
                <div className="profile-info">
                    <div className="profile-name-info">
                        <span className="profile-name fw-bold">
                            {userData.firstName} {userData.lastName}
                        </span>
                        <span className="profile-username">
                            @{userData.username}
                        </span>
                    </div>

                    <div className="profile-description">
                        {userData.bio || ""}
                    </div>
                    <div className="profile-website">
                        <a href="https://www.google.com">
                            {userData.portfolio || ""}
                        </a>
                    </div>
                    <div className="profile-stat">
                        <span className="follower">
                            <span className="fw-bold">
                                {userData.followers.length}
                            </span>{" "}
                            Followers
                        </span>
                        <span className="following">
                            <span className="fw-bold">
                                {userData.following.length}
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
                        key={id}
                        onClick={onTabChangeHandler}
                    >
                        <i className={`fas ${icon}`}></i>
                        {name}
                    </div>
                ))}
            </div>

            <div className="post-container">
                {activeTab === "posts" &&
                    userPosts?.map((post) => (
                        <Post post={post} key={post._id} />
                    ))}
            </div>
        </div>
    );
}
