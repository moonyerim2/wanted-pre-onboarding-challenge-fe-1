import { useContext, useState } from "react";
import styled from "styled-components";
import TextField from "../TextField";
import TodoItemButtons from "./TodoItemButtons";
import { TodoContext } from "../../context";
import { TodoItem as TodoItemType } from "../../type";

interface TodoItemProps {
  todo: TodoItemType;
}

function TodoItem({ todo }: TodoItemProps) {
  const { setTodoTexts } = useContext(TodoContext);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [hasNoTitle, setHasNoTitle] = useState(false);

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

  const activeEditingMode = () => {
    setIsEditingMode(true);
    setTodoTexts({ title: todo.title, content: todo.content });
  };

  return (
    <li id={todo.id} className={"todo-item"}>
      {isEditingMode ? (
        <>
          <TodoItemTitleInput {...TodoItemTitleInputProps} />
          <TitleInputErrorMessage hasNoTitle={hasNoTitle}>
            제목을 입력해주세요.
          </TitleInputErrorMessage>
          <TodoItemContentInput {...TodoItemContentInputProps} />
        </>
      ) : (
        <p>{todo.title}</p>
      )}
      <TodoItemButtons
        isEditingMode={isEditingMode}
        activeEditingMode={activeEditingMode}
        setStateAction={{
          setHasNoTitle,
          setIsEditingMode,
        }}
      />
    </li>
  );
}

const TodoItemTitleInput = styled(TextField)``;

const TodoItemContentInput = styled(TextField)``;

const TitleInputErrorMessage = styled.p<{ hasNoTitle: boolean }>`
  visibility: ${({ hasNoTitle }) => (hasNoTitle ? "visible" : "hidden")};
  font-size: 12px;
  color: red;
`;

export default TodoItem;
