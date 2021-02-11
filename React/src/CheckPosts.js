import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckComments from "./CheckComments";
import CreateComment from "./CreateComment";
export default () => {
  const [toDo, setToDo] = useState([]);
  const fetchList = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setToDo(res.data);
  };
  useEffect(() => {
    fetchList();
  }, []);
  const RenderedTodos = Object.values(toDo).map((i) => {
    console.log(toDo)
    return (
      <div key={i.id}>
        <div>
          <h3>{i.titulo}</h3>
          <CheckComments comments={i.comments} />
          <CreateComment id={i.id} />
          <h2>{i.id}</h2>
        </div>
      </div>
    );
  });
  return <>{RenderedTodos}</>;
};
