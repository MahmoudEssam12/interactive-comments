import React, { useState } from "react";
import avatar from "../../images/avatars/anonymous.png";
import "./Reply.scss";
function Reply({ active, setReplies, replies, replyTo }) {
  const createDate = () => {
    let today = new Date();

    return today;
  };
  const generateID = () => {
    if (replies.length > 0) {
      let lastReply = replies.length - 1;
      let newID = replies[lastReply].id + 1;
      return newID;
    }
    return 1;
  };
  const [reply, setReply] = useState({
    id: generateID(),
    content: "",
    createdAt: createDate(),
    replyingTo: replyTo,
    score: 0,
    user: {
      image: {
        png: "./images/avatars/anonymous.png",
        webp: avatar,
      },
      username: "anonymous",
    },
  });
  const handleChange = (e) => {
    setReply({
      ...reply,
      content: e.target.value,
    });
  };

  const handleSubmit = () => {
    let newReply = reply.content;
    if (newReply.length > 0 && /\S/.test(newReply)) {
      setReplies([...replies, reply]);
      setReply({
        ...reply,
        id: generateID() + 1,
        content: "",
      });
      close();
    }
  };
  const close = () => {
    active(false);
  };
  return (
    <div className="reply-input">
      <div className="avatar">
        <img src={avatar} alt={avatar} />
      </div>
      <div className="reply-body">
        <textarea
          name="reply-content"
          cols="30"
          rows="3"
          placeholder="Your Reply..."
          value={reply.content}
          onChange={handleChange}
          autoFocus
        ></textarea>
      </div>
      <div className="submit-reply">
        <button onClick={handleSubmit}>Reply</button>
      </div>
      <div className="cancel" onClick={close}>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
}

export default Reply;
