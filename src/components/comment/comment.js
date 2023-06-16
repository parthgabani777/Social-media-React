import "./comment.css";

export function Comment({ comment }) {
  const { text, username } = comment;
  console.log(comment);

  return (
    <div className="comment-modal">
      <div className="comment-profile-picture">
        <i className="fas fa-user-circle"></i>
      </div>
      <div className="comment-info">
        <div className="comment-header ">
          <div className="comment-profile-username fw-bold">{username}</div>
        </div>

        <div className="comment-content">
          <div className="comment-text">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
