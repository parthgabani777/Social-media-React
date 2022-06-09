import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./post.css";
import {
    deletePost,
    dislikePost,
    editPost,
    likePost,
} from "../../slices/postSlice";
import { addBookmark, removeBookmark } from "../../slices/userSlice";
import { AddPostModal } from "../add-post-modal/add-post-modal";
import { toast } from "react-toastify";

function Post({ post }) {
    const dispatch = useDispatch();
    const {
        _id: postId,
        content,
        likes: { likeCount, likedBy },
        username,
        createdAt,
        postCreatedBy,
    } = post;
    const { picture } = postCreatedBy;

    const { token } = useSelector((state) => state.authReducer);

    const { loggedInUser } = useSelector((state) => state.userReducer);
    const { _id: userId, bookmarks } = loggedInUser;

    // Post belongs to logged in user
    const isLoggedInUserPost = post.userId === userId;

    // Liked post features
    const isPostLiked = likedBy?.some((user) => user._id === userId);
    const likeClickHandler = () => {
        dispatch(likePost({ postId, token }));
    };
    const dislikeClickHandler = () => {
        dispatch(dislikePost({ postId, token }));
    };

    // Bookmark post features
    const isPostBookmarked = bookmarks?.some((post) => post._id === postId);
    const addBookmarkClickHandler = () => {
        dispatch(addBookmark({ postId, token }));
    };
    const removeBookmarkClickHandler = () => {
        dispatch(removeBookmark({ postId, token }));
    };

    // Submenu to edit/delete post
    const [showSubMenu, setShowSubMenu] = useState(false);
    const toggleShowSubMenu = () => {
        setShowSubMenu((showSubMenu) => !showSubMenu);
    };

    // edit/delete post modal
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const editPostClickHandler = () => {
        setShowAddPostModal(true);
    };
    const deletePostClickHandler = async () => {
        try {
            await dispatch(deletePost({ postId, token })).unwrap();
            toast.success("Post deleted");
        } catch (error) {
            toast.error("Post can't be deleted");
        }
    };

    // post create date formatting
    const createdDate = new Date(createdAt);
    const formattedCreateDate = createdDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="post-modal">
            {isLoggedInUserPost && (
                <div className="options-container" onClick={toggleShowSubMenu}>
                    <i className="fas fa-ellipsis-v option-icon"></i>
                    {showSubMenu && (
                        <div className="option-list list-group">
                            <li
                                className="option list-item"
                                onClick={editPostClickHandler}
                            >
                                Edit
                            </li>
                            <li
                                className="option list-item"
                                onClick={deletePostClickHandler}
                            >
                                Delete
                            </li>
                        </div>
                    )}
                </div>
            )}

            <AddPostModal
                show={showAddPostModal}
                onClose={() => setShowAddPostModal(false)}
                onSubmit={async (postData) => {
                    try {
                        dispatch(editPost({ postId, postData, token }));
                        setShowAddPostModal(false);
                        toast.success("Post updated");
                    } catch (error) {
                        toast.error("Post can't be updated");
                    }
                }}
                content={content}
            />

            <Link to={`/user/${post.userId}`} className="post-profile-picture">
                {picture ? (
                    <img
                        src={picture}
                        alt="profile picture"
                        className="profile-picture"
                    />
                ) : (
                    <i className="fas fa-user-circle"></i>
                )}
            </Link>
            <div className="post-info">
                <div className="post-header ">
                    <Link
                        to={
                            isLoggedInUserPost
                                ? `/profile`
                                : `/user/${post.userId}`
                        }
                        className="post-profile-username fw-bold"
                    >
                        {username}
                    </Link>
                    - <span className="create-date">{formattedCreateDate}</span>
                </div>

                <Link to={`/post/${postId}`} className="post-content">
                    <div className="post-text">
                        <p>{content}</p>
                    </div>
                </Link>

                <div className="post-icons text-m">
                    {isPostLiked ? (
                        <div
                            className="post-likes"
                            onClick={dislikeClickHandler}
                        >
                            <i className="fas fa-heart text-primary"></i>
                            <span className="text-s">{likeCount}</span>
                        </div>
                    ) : (
                        <div className="post-likes" onClick={likeClickHandler}>
                            <i className="fas fa-heart"></i>
                            <span className="text-s">{likeCount}</span>
                        </div>
                    )}

                    {isPostBookmarked ? (
                        <div
                            className="post-bookmark"
                            onClick={removeBookmarkClickHandler}
                        >
                            <i className="fas fa-bookmark text-primary"></i>
                        </div>
                    ) : (
                        <div
                            className="post-bookmark"
                            onClick={addBookmarkClickHandler}
                        >
                            <i className="fas fa-bookmark"></i>
                        </div>
                    )}

                    <Link to={`/post/${postId}`} className="post-comments">
                        <i className="fas fa-comment-alt"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Post };
