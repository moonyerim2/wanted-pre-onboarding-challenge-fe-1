import { useContext, useEffect } from "react";
import TodoInput from "./TodoInput";
import { TodoContext } from "../../context";
import { useFetch } from "../../hook";
import { BASE_URL } from "../../constant";
import { getLoginToken } from "../../util/login";

function TodoList() {
  const { todos, setInitialTodos } = useContext(TodoContext);
  const { loading, responseData } = useFetch({
    baseUrl: BASE_URL,
    endPoint: "/todos",
    options: {
      headers: {
        Authorization: getLoginToken(),
      },
    },
  });

  useEffect(() => {
    if (responseData === undefined) {
      setInitialTodos([]);
    } else {
      setInitialTodos(responseData);
    }
  }, []);

  return (
    <>
      <TodoInput />
      <div>
        {loading
          ? "로딩중"
          : todos.map((todo) => (todo ? <div>{todo.title}</div> : null))}
      </div>
    </>
  );
}

export default TodoList;
