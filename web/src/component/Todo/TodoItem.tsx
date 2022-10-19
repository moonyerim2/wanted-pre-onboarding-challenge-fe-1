import { useContext, useState } from "react";
import styled from "styled-components";
import { Button } from "../../styled/button";
import TextField from "../TextField";
import { TodoContext } from "../../context";
import { TodoItem as TodoItemType } from "../../type";
import { useFetch } from "../../hook";
import { BASE_URL } from "../../constant";
import { buildOption, getLoginToken } from "../../util";

interface TodoItemProps {
  todo: TodoItemType;
}

function TodoItem({ todo }: TodoItemProps) {
  const { todoTexts, setTodoTexts } = useContext(TodoContext);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const { post } = useFetch({ baseUrl: BASE_URL });

  const TodoItemTitleInputProps = {
    id: "title",
    label: "title",
    text: todo.title,
    type: "text",
    placeholder: "",
    required: false,
  };

  const TodoItemContentInputProps = {
    id: "content",
    label: "content",
    text: todo.content,
    type: "text",
    placeholder: "",
    required: false,
  };

  const editTodo = (todoId: string) => {
    if (todoTexts.title === "") return;

    post({
      endPoint: `/todos/${todoId}`,
      options: buildOption(getLoginToken(), "PUT", todoTexts),
    });
    return;
  };

  const deleteTodo = (todoId: string) => {
    post({
      endPoint: `/todos/${todoId}`,
      options: buildOption(getLoginToken(), "DELETE"),
    });
    return;
  };

  const onClick = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement;
    const liElement = target.closest(".todo-item") as HTMLLIElement;
    const todoId = liElement.id;

    if (target.id === "edit") {
      setIsEditingMode(true);
      setTodoTexts({ title: todo.title, content: todo.content });
      return;
    }

    if (target.id === "edit-finish") {
      editTodo(todoId);
    } else {
      deleteTodo(todoId);
    }
    setIsEditingMode(false);
  };

  return (
    <li id={todo.id} className={"todo-item"}>
      {isEditingMode ? (
        <>
          <TodoItemTitleInput {...TodoItemTitleInputProps} />
          <TodoItemContentInput {...TodoItemContentInputProps} />
        </>
      ) : (
        <p>{todo.title}</p>
      )}
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

const TodoItemTitleInput = styled(TextField)``;

const TodoItemContentInput = styled(TextField)``;

export default TodoItem;
