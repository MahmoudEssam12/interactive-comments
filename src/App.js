import { useState, useEffect } from "react";
import data from "./data.js";
import Comment from "./components/Comment/Comment";
import './App.css';
import AddComment from "./components/AddComment/AddComment.jsx";

function App() {
  const [comments, setComments] = useState([...data.comments]);
  useEffect(() => {
    console.log(comments)
  }, [comments])
  return (
    <div className="App">

      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} comments={comments} setComments={setComments} />
      ))}
      <AddComment comments={comments} setComments={setComments} />
    </div>
  );
}

export default App;
