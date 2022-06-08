import "./single-post.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CustomLoader } from "../../components/customLoader/customloader";
import { Post } from "../../components/post/post";
import { addComment, getPost } from "../../slices/postSlice";
import { Comment } from "../../components/comment/comment";

function SinglePost() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { currentPost, isLoading } = useSelector(
        (state) => state.postsReducer
    );
    const { token } = useSelector((state) => state.authReducer);

    const [commentText, setCommentText] = useState();

    useEffect(() => {
        currentPost?._id === postId || dispatch(getPost(postId));
    }, []);

    const addCommentClickHandler = () => {
        const commentData = { text: commentText };
        dispatch(addComment({ commentData, postId, token }));
        setCommentText("");
    };

    if (isLoading) return <CustomLoader />;

    return (
        currentPost?._id === postId && (
            <div className="single-post">
                <Post post={currentPost} />

                <div className="add-comment">
                    <div className="add-comment-profile-picture">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="input-textarea">
                        <textarea
                            placeholder="Write Something Interesting...."
                            rows="4"
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </div>
                    <button
                        className="add-comment-btn btn btn-primary br-2"
                        onClick={addCommentClickHandler}
                    >
                        Reply
                    </button>
                </div>

                <div className="comment-container">
                    {currentPost.comments.map((comment) => (
                        <Comment comment={comment} key={comment._id} />
                    ))}
                </div>
            </div>
        )
    );
}

export { SinglePost };
