import React, { useReducer, createContext } from "react";

interface TodoItem {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updateAt: string;
}

interface ContextType {
  todos: TodoItem[];
  addTodo: (newTodoItem: TodoItem) => void;
  deleteTodo: (todoId: string) => void;
  updateTodo: (newTodoItem: TodoItem) => void;
}

type ActionType =
  | {
      type: "ADD_TODO" | "UPDATE_TODO";
      payload: TodoItem;
    }
  | { type: "DELETE_TODO"; payload: { id: string } };

const TodoContext = createContext<ContextType>({
  todos: [],
  addTodo: () => null,
  deleteTodo: () => null,
  updateTodo: () => null,
});

function todoReducer(
  todos: TodoItem[],
  { type, payload }: ActionType
): TodoItem[] {
  switch (type) {
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
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider, TodoContext };
