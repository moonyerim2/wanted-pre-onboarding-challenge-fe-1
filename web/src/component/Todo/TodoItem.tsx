import { Button } from "../../styled/button";
import { TodoItem as TodoItemType } from "../../type";
import { useFetch } from "../../hook";
import { BASE_URL } from "../../constant";
import { buildOption } from "../../util";
import { getLoginToken } from "../../util/login";

interface TodoItemProps {
  todo: TodoItemType;
}

function TodoItem({ todo }: TodoItemProps) {
  const { post } = useFetch({ baseUrl: BASE_URL });

  const onClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement;
    const liElement = target.closest(".todo-item") as HTMLLIElement;
    const todoId = liElement.id;

    if (target.id === "edit") {
      post({
        endPoint: `/todos/${todoId}`,
        options: buildOption(getLoginToken(), "PUT", {
          title: "1234",
          content: "qwer",
        }),
      });
    }
  };

  return (
    <li id={todo.id} className={"todo-item"}>
      <p>{todo.title}</p>
      <Button type="submit" id={"edit"} onClick={onClick} onKeyDown={onClick}>
        수정
      </Button>
      <Button type="submit" id={"delete"} onClick={onClick} onKeyDown={onClick}>
        삭제
      </Button>
    </li>
  );
}

export default TodoItem;
