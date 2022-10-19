import { TodoItem as TodoItemType } from "../../type";
import { Button } from "../../styled/button";

interface TodoItemProps {
  todo: TodoItemType;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <p>{todo.title}</p>
      <Button>수정</Button>
      <Button>삭제</Button>
    </li>
  );
}

export default TodoItem;
