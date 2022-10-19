import { useContext } from "react";
import styled from "styled-components";
import TextField from "../TextField";
import { TextFieldData } from "../../type";
import { TodoContext } from "../../context";
import { useFetch } from "../../hook";
import { BASE_URL } from "../../constant";
import { getLoginToken } from "../../util/login";

const todoTitleProps: TextFieldData = {
  id: "title",
  label: "할 일",
  text: "",
  type: "text",
  placeholder: "새로운 할 일",
  required: true,
};

const todoContentProps: TextFieldData = {
  id: "content",
  label: "내용",
  text: "",
  type: "text",
  placeholder: "",
  required: false,
};

function TodoInput() {
  const { addTodo, todoTexts } = useContext(TodoContext);
  const { post } = useFetch({ baseUrl: BASE_URL });

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const options = {
      headers: {
        Authorization: getLoginToken(),
      },
      body: JSON.stringify(todoTexts),
    };
    const data = post({ endPoint: "/todos", options });
    addTodo(data);
  };

  return (
    <form>
      <TodoTitle {...todoTitleProps} />
      <TodoContent {...todoContentProps} />
      <TodoAddButton type="submit" onClick={onSubmit}>
        추가
      </TodoAddButton>
    </form>
  );
}

const TodoTitle = styled(TextField)``;

const TodoContent = styled(TextField)``;

const TodoAddButton = styled.button`
  padding: 10px 30px;
`;

export default TodoInput;