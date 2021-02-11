import axios from "axios";
import React, { useState } from "react";

export default ({id}) => {
  const [content, setContent] = useState("");
  const createComment = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:4001/${id}`, {
      content,
    });
    setContent('')
  };
  return (
    <form value={content} onSubmit={createComment}>
        <label>Comment</label>
      <input onChange={e => setContent(e.target.value)}></input>
    </form>
  );
};
