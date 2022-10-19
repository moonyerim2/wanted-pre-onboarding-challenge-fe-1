import { useContext, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { TodoContext } from "../../context";
import { useFetch } from "../../hook";
import { BASE_URL } from "../../constant";
import { getLoginToken } from "../../util/login";
import { buildOption } from "../../util";

function TodoList() {
  const { todos, setInitialTodos } = useContext(TodoContext);
  const { loading, responseData } = useFetch({
    baseUrl: BASE_URL,
    endPoint: "/todos",
    options: buildOption("GET", getLoginToken()),
  });

  useEffect(() => {
    if (responseData === undefined) {
      setInitialTodos([]);
    } else {
      setInitialTodos(responseData);
    }
  }, [responseData, setInitialTodos]);

  return (
    <>
      <TodoInput />
      <ul>
        {loading
          ? "로딩중"
          : todos.map((todo) =>
              todo ? <TodoItem key={todo.id} todo={todo} /> : null
            )}
      </ul>
    </>
  );
}

export default TodoList;
