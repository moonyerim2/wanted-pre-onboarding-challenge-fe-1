import { Dispatch, SetStateAction } from "react";

export interface TodoTexts {
  title: string;
  content: string;
}

export interface TodoItem extends TodoTexts {
  id: string;
  createdAt: string;
  updateAt: string;
}

export interface ContextType {
  todos: TodoItem[];
  setInitialTodos: (todos: TodoItem[]) => void;
  addTodo: (newTodoItem: TodoItem) => void;
  deleteTodo: (todoId: string) => void;
  updateTodo: (newTodoItem: TodoItem) => void;
  todoTexts: TodoTexts;
  setTodoTexts: Dispatch<SetStateAction<TodoTexts>>;
}
