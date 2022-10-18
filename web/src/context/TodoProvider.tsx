import React, { useReducer, createContext } from "react";

export interface TodoItem {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updateAt: string;
}

interface ContextType {
  todos: TodoItem[];
  setInitialTodos: (todos: TodoItem[]) => void;
  addTodo: (newTodoItem: TodoItem) => void;
  deleteTodo: (todoId: string) => void;
  updateTodo: (newTodoItem: TodoItem) => void;
}

type ActionType =
  | { type: "SET_INITAIL_DATA"; payload: TodoItem[] }
  | {
      type: "ADD_TODO" | "UPDATE_TODO";
      payload: TodoItem;
    }
  | { type: "DELETE_TODO"; payload: { id: string } };

const TodoContext = createContext<ContextType>({
  todos: [],
  setInitialTodos: () => null,
  addTodo: () => null,
  deleteTodo: () => null,
  updateTodo: () => null,
});

function todoReducer(
  todos: TodoItem[],
  { type, payload }: ActionType
): TodoItem[] {
  switch (type) {
    case "SET_INITAIL_DATA": {
      return payload;
    }
    case "ADD_TODO": {
      return [...todos, payload];
    }
    case "DELETE_TODO": {
      const { id } = payload;
      return todos.filter((todo: TodoItem) => todo.id !== id);
    }
    case "UPDATE_TODO": {
      const { id } = payload;
      return todos.map((todo: TodoItem) => {
        if (todo.id === id) {
          return { ...todo, ...payload };
        }
        return todo;
      });
    }
    default:
      return todos;
  }
}

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const setInitialTodos = (todos: TodoItem[]) => {
    dispatch({ type: "SET_INITAIL_DATA", payload: todos });
  };

  const addTodo = (newTodoItem: TodoItem) => {
    dispatch({
      type: "ADD_TODO",
      payload: newTodoItem,
    });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  const updateTodo = (newTodoItem: TodoItem) => {
    dispatch({ type: "UPDATE_TODO", payload: newTodoItem });
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, updateTodo, setInitialTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider, TodoContext };
