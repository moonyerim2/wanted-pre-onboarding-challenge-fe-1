import { Dispatch, SetStateAction, useContext } from "react";
import { BASE_URL } from "../../constant";
import { TodoContext } from "../../context";
import { useFetch } from "../../hook";
import { Button } from "../../styled/button";
import { buildOption, getLoginToken } from "../../util";

interface TodoItemButtonsProps {
  activeEditingMode: () => void;
  isEditingMode: boolean;
  setStateAction: {
    setHasNoTitle: Dispatch<SetStateAction<boolean>>;
    setIsEditingMode: Dispatch<SetStateAction<boolean>>;
  };
}

function TodoItemButtons({
  activeEditingMode,
  isEditingMode,
  setStateAction,
}: TodoItemButtonsProps) {
  const { todoTexts } = useContext(TodoContext);
  const { post } = useFetch({ baseUrl: BASE_URL });

  const RequestUpdateTodo = (todoId: string) => {
    post({
      endPoint: `/todos/${todoId}`,
      options: buildOption(getLoginToken(), "PUT", todoTexts),
    });
    return;
  };

  const RequestDeleteTodo = (todoId: string) => {
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
      activeEditingMode();
      return;
    }

    if (target.id === "edit-finish") {
      if (todoTexts.title === "") {
        setStateAction.setHasNoTitle(true);
        return;
      }
      RequestUpdateTodo(todoId);
      setStateAction.setIsEditingMode(false);
      setStateAction.setHasNoTitle(false);
    } else {
      RequestDeleteTodo(todoId);
    }
  };

  return (
    <>
      {isEditingMode ? (
        <Button
          type="submit"
          id="edit-finish"
          onClick={onClick}
          onKeyDown={onClick}
        >
          수정완료
        </Button>
      ) : (
        <>
          <Button type="submit" id="edit" onClick={onClick} onKeyDown={onClick}>
            수정하기
          </Button>
          <Button
            type="submit"
            id={"delete"}
            onClick={onClick}
            onKeyDown={onClick}
          >
            삭제하기
          </Button>
        </>
      )}
    </>
  );
}

export default TodoItemButtons;
