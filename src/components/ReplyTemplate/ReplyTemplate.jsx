import React, { useState } from "react";
import "../Comment/Comment.scss";

function ReplyTemplate({ comment, replyFunc, deleteReply }) {
  const [vote, setVote] = useState(comment.score);
  const [updating, setUpdating] = useState(false);
  const [updateReply, setUpdateReply] = useState(comment.content);
  const [confirmDeleteState, setConfirmDeleteState] = useState(false);

  const validToDownVote = Number(vote) === Number(comment.score) + 1;
  const validToUpVote = vote === comment.score;

  const getCommentDate = () => {
    const date = new Date(comment.createdAt);
    let today = new Date();
    let dateInMs = today.getTime() - date.getTime();
    let dateInMinutes = dateInMs / 1000 / 60;
    let dateInHours = dateInMs / 1000 / 60 / 60;
    let dateInDays = dateInMs / 1000 / 60 / 60 / 24;
    let dateInMonths = dateInMs / 1000 / 60 / 60 / 24 / 30;
    let dateInYears = dateInMs / 1000 / 60 / 60 / 24 / 30 / 12;

    if (dateInHours < 1) return Math.ceil(dateInMinutes) + " minutes ago";
    if (dateInDays < 1) return dateInHours.toFixed() + " hours ago";
    if (dateInMonths < 1) return dateInDays.toFixed() + " days ago";
    if (dateInYears < 1) return dateInMonths.toFixed() + " months ago";
    return dateInYears.toFixed() + " years ago";
  };
  const confirmDelete = () => {
    setConfirmDeleteState(true);
  };
  const cancelDelete = () => {
    setConfirmDeleteState(false);
  };
  const upvote = () => {
    if (validToUpVote) {
      setVote(vote + 1);
    }
  };
  const downVote = () => {
    if (validToDownVote) {
      setVote(vote - 1);
    }
  };
  const handleChange = (e) => {
    setUpdateReply(e.target.value);
  };
  const submitUpdate = () => {
    let updatedComment = comment;
    updatedComment.content = updateReply;
    setUpdating(false);
  };
  const author = comment.user.username === "anonymous";

  return (
    <div className="comment reply-template">
      <div className={`main-comment`}>
        <div className="score">
          <button
            className="upvote"
            onClick={upvote}
            disabled={validToDownVote}
          >
            +
          </button>
          <span className="comment-score">{vote}</span>
          <button
            className="downvote"
            onClick={downVote}
            disabled={validToUpVote}
          >
            -
          </button>
        </div>
        <div className="comment-body">
          <div className="comment-header">
            <div className={`avatar ${author ? "order-1" : ""}`}>
              <img src={comment.user.image.webp} alt="avatar" />
            </div>
            <div className={`username ${author ? " order-2" : ""}`}>
              {comment.user?.username}
            </div>
            <div className={`comment-date ${author ? " order-4" : ""}`}>
              {getCommentDate()}
            </div>

            {comment.user.username === "anonymous" ? (
              <>
                <div className={`badge ${author ? " order-3" : ""}`}>you</div>
                <div className={`controls ${author ? " order-5" : ""}`}>
                  <div className={`delete-btn`} onClick={confirmDelete}>
                    <i className="fa-solid fa-trash"></i>Delete
                  </div>
                  <div
                    className={`edit-btn`}
                    onClick={() => setUpdating(!updating)}
                  >
                    <i className="fa-solid fa-pen"></i>Edit
                  </div>
                </div>
                <div
                  className={`confirm-wrapper ${
                    confirmDeleteState ? "confirmation" : ""
                  }`}
                >
                  <div
                    className={`confirm-delete ${
                      confirmDeleteState ? "confirmation" : ""
                    }`}
                  >
                    <p>
                      Are you sure you want to delete this comment? This will
                      remove the comment and can't be undone;
                    </p>
                    <button className="cancel-delete" onClick={cancelDelete}>
                      No, Cancel
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteReply(comment.id)}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="reply-btn" onClick={() => replyFunc(true)}>
                <i className="fa-solid fa-reply"></i>reply
              </div>
            )}
          </div>
          {updating ? (
            <div className="reply-body">
              <textarea
                name="reply-content"
                cols="30"
                rows="3"
                value={updateReply}
                onChange={handleChange}
              ></textarea>
              <button className="update" onClick={submitUpdate}>
                update
              </button>
            </div>
          ) : (
            <div className="comment-content">
              <pre>{comment.content}</pre>
            </div>
          )}
        </div>
      </div>
      {/* {activeReply && (
        <Reply
          active={setActiveReply}
          comment={comment}
          replies={replies}
          setReplies={setReplies}
          replyTo={comment.user.username}
        />
      )} */}
    </div>
  );
}

export default ReplyTemplate;
