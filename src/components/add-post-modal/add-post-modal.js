import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./add-post-modal.css";

export function AddPostModal({ show, onClose, onSubmit, content }) {
  if (!show) return null;
  const { loggedInUser } = useSelector((state) => state.userReducer);

  const [postData, setPostData] = useState({
    content,
  });

  const changePostData = (e) => {
    setPostData({ ...postData, [e.target.id]: e.target.value });
  };

  return (
    <div className="add-post-modal" onClick={onClose}>
      <div className="add-post-content" onClick={(e) => e.stopPropagation()}>
        <div className="add-post-profile-picture">
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
        <form
          className="input-fields"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(postData);
          }}
        >
          <div className="input-textarea">
            <textarea
              placeholder="Write Something Interesting...."
              rows="4"
              id="content"
              value={postData.content}
              onChange={changePostData}
              required
            />
          </div>
          <div className="add-post-footer">
            <div className="post">
              <button className="btn btn-primary br-3 text-s">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
