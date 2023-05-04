import React, { useState, useRef } from "react";
import Reply from "../Reply/Reply";
import ReplyTemplate from "../ReplyTemplate/ReplyTemplate";
import "./Comment.scss";

function Comment({ comment, setComments, comments }) {
  const [activeReply, setActiveReply] = useState(false);
  const [replies, setReplies] = useState([...comment.replies]);
  const [vote, setVote] = useState(comment.score);
  const [updating, setUpdating] = useState(false);
  const [updateComment, setUpdateComment] = useState(comment.content);
  const [confirmDeleteState, setConfirmDeleteState] = useState(false);

  const upVoteRef = useRef(null);
  const downVoteRef = useRef(null);

  const upvote = () => {
    setVote(vote + 1);
    upVoteRef.current.classList.add("voteStyle");
    downVoteRef.current.classList.remove("voteStyle");
  };
  const downVote = () => {
    setVote(vote - 1);
    downVoteRef.current.classList.add("voteStyle");
    upVoteRef.current.classList.remove("voteStyle");
  };
  const reply = () => {
    setActiveReply(!activeReply);
  };
  const deleteComment = (id) => {
    let cleanedArr = comments.filter((comment) => comment.id !== id);
    setComments(cleanedArr);
  };
  const deleteReply = (id) => {
    let cleanedArr = replies.filter((comment) => comment.id !== id);
    setReplies(cleanedArr);
  };

  const confirmDelete = () => {
    setConfirmDeleteState(true);
  };
  const cancelDelete = () => {
    setConfirmDeleteState(false);
  };
  const handleChange = (e) => {
    setUpdateComment(e.target.value);
  };
  const submitUpdate = () => {
    let updatedComment = comment;
    updatedComment.content = updateComment;
    setUpdating(false);
  };
  const author = comment.user.username === "anonymous";

  return (
    <div className="comment">
      <div
        className={`main-comment ${comment.replies?.length === 0 && "mr-2"}`}
      >
        <div className="score">
          <span className="upvote" onClick={upvote} ref={upVoteRef}>
            +
          </span>
          <span className="comment-score">{vote}</span>
          <span className="downvote" onClick={downVote} ref={downVoteRef}>
            -
          </span>
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
              {comment.createdAt}
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
                      onClick={() => deleteComment(comment.id)}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="reply-btn" onClick={() => reply()}>
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
                value={updateComment}
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

      <div className="replies-wrapper">
        {replies?.length > 0 &&
          replies?.map((reply) => (
            <div
              className="reply-wrapper reply"
              key={reply.id}
              style={{ maxWidth: "700px" }}
            >
              <ReplyTemplate
                comment={reply}
                replyFunc={setActiveReply}
                deleteReply={deleteReply}
              />
            </div>
          ))}
      </div>
      {activeReply && (
        <Reply
          active={setActiveReply}
          replies={replies}
          setReplies={setReplies}
          replyTo={comment.user.username}
        />
      )}
    </div>
  );
}

export default Comment;
