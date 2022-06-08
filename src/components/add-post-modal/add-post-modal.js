import { useState } from "react";
import "./add-post.css";

export function AddPostModal({ show, onClose, onSubmit, content }) {
    if (!show) return null;

    const [postData, setPostData] = useState({
        content,
    });

    const changePostData = (e) => {
        setPostData({ ...postData, [e.target.id]: e.target.value });
    };

    return (
        <div className="add-post-modal" onClick={onClose}>
            <div
                className="add-post-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="add-post-profile-picture">
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className="input-fields">
                    <div className="input-textarea">
                        <textarea
                            placeholder="Write Something Interesting...."
                            rows="4"
                            id="content"
                            value={postData.content}
                            onChange={changePostData}
                        />
                    </div>
                    <div className="add-post-footer">
                        <div className="input-image text-m">
                            <i className="fas fa-image"></i>
                        </div>
                        <div className="post">
                            <button
                                className="btn btn-primary br-3 text-s"
                                onClick={() => onSubmit(postData)}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
