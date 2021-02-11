import react from "react";

export default ({comments}) => {
  const RenderedInfo = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{RenderedInfo}</ul>;
};
