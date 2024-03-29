import "./single-post.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { CustomLoader } from "../../components/customLoader/customloader";
import { Post } from "../../components/post/post";
import { addComment, getPost } from "../../slices/postSlice";
import { Comment } from "../../components/comment/comment";
import { toast } from "react-toastify";

function SinglePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { currentPost, isLoading, posts } = useSelector(
    (state) => state.postsReducer
  );
  const { token } = useSelector((state) => state.authReducer);
  const { loggedInUser } = useSelector((state) => state.userReducer);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getPost(postId)).unwrap();
      } catch (error) {
        navigation("/");
      }
    })();
  }, [posts]);

  const addCommentClickHandler = async () => {
    try {
      const commentData = { text: commentText };
      await dispatch(addComment({ commentData, postId, token })).unwrap();
      setCommentText("");
      toast.success("Comment added.");
    } catch (error) {
      toast.error("Comment can't be added.");
    }
  };

  const commentSortByLatest = currentPost?.comments
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (isLoading) return <CustomLoader />;

  return (
    currentPost?._id === postId && (
      <div className="single-post">
        <Post post={currentPost} />

        <div className="add-comment">
          <div className="add-comment-profile-picture">
            {loggedInUser.picture ? (
              <img
                src={loggedInUser.picture}
                alt="profile picture"
                className="profile-picture"
              />
            ) : (
              <i className="fas fa-user-circle"></i>
            )}
          </div>
          <div className="input-textarea">
            <textarea
              placeholder="Write Comments...."
              value={commentText}
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
          {commentSortByLatest.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
      </div>
    )
  );
}

export { SinglePost };
