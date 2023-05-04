import React, { useState } from "react";
import avatar from "../../images/avatars/anonymous.png";

function AddComment({ setComments, comments }) {
  //   const [active, setActive] = useState(false);
  const createDate = () => {
    let today = new Date();
    return today;
  };
  const generateID = () => {
    if (comments.length > 0) {
      let lastComment = comments.length - 1;
      let newID = comments[lastComment].id + 1;
      return newID;
    }
    return 1;
  };
  const [comment, setComment] = useState({
    id: generateID(),
    content: "",
    createdAt: createDate(),
    score: 0,
    user: {
      image: {
        png: "./images/avatars/anonymous.png",
        webp: avatar,
      },
      username: "anonymous",
    },
    replies: [],
  });
  const handleChange = (e) => {
    setComment({
      ...comment,
      content: e.target.value,
    });
  };

  const handleSubmit = () => {
    let newComment = comment.content;
    if (newComment.length > 0 && /\S/.test(newComment)) {
      setComments([...comments, comment]);
      setComment({
        ...comment,
        id: generateID() + 1,
        content: "",
      });
    }
  };
  //   const close = () => {
  //     setActive(!active);
  //   };
  return (
    <div className="reply-input add-comment">
      <div className="avatar">
        <img src={avatar} alt={avatar} />
      </div>
      <div className="reply-body">
        <textarea
          name="reply-content"
          cols="30"
          rows="3"
          placeholder="Your Comment..."
          value={comment.content}
          onChange={handleChange}
          autoFocus
        ></textarea>
      </div>
      <div className="submit-reply">
        <button onClick={handleSubmit}>Reply</button>
      </div>
      {/* <div className="cancel" onClick={close}>
      <i className="fa-solid fa-xmark"></i>
    </div> */}
    </div>
  );
}

export default AddComment;
