import React, { useContext } from "react";
import { TodoContext } from "../context";
import { TodoItem } from "../context/TodoProvider";
import { useFetch } from "../hook";
import { BASE_URL } from "../constant";
import { getLoginToken } from "../util/login";

function TodoList() {
  const { setInitialTodos } = useContext(TodoContext);
  const loading = useFetch<TodoItem[]>(
    `${BASE_URL}/todos`,
    {
      headers: {
        Authorization: getLoginToken(),
      },
    },
    setInitialTodos
  );

  return (
    <>
      <div>{loading ? "로딩중" : "투두리스트"}</div>;
    </>
  );
}

export default TodoList;
