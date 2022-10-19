import { useState } from "react";
import { Button } from "../../styled/button";
import TextField from "../TextField";
import { TodoItem as TodoItemType } from "../../type";
import { useFetch } from "../../hook";
import { BASE_URL } from "../../constant";
import { buildOption } from "../../util";
import { getLoginToken } from "../../util/login";

interface TodoItemProps {
  todo: TodoItemType;
}

function TodoItem({ todo }: TodoItemProps) {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const { post } = useFetch({ baseUrl: BASE_URL });

  const textFieldProp = {
    id: "todo-title",
    label: "todo-title",
    text: todo.title,
    type: "text",
    placeholder: "",
    required: false,
  };

  const onClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement;
    if (target.id === "edit") {
      setIsEditingMode(true);
      return;
    }

    if (target.id === "edit-finish") {
      setIsEditingMode(false);
      const liElement = target.closest(".todo-item") as HTMLLIElement;
      const todoId = liElement.id;

      post({
        endPoint: `/todos/${todoId}`,
        options: buildOption(getLoginToken(), "PUT", {
          title: "1234",
          content: "qwer",
        }),
      });
      return;
    }
  };

  return (
    <li id={todo.id} className={"todo-item"}>
      {isEditingMode ? <TextField {...textFieldProp} /> : <p>{todo.title}</p>}
      <Button
        type="submit"
        id={isEditingMode ? "edit-finish" : "edit"}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {isEditingMode ? "수정완료" : "수정하기"}
      </Button>
      <Button type="submit" id={"delete"} onClick={onClick} onKeyDown={onClick}>
        삭제하기
      </Button>
    </li>
  );
}

export default TodoItem;
