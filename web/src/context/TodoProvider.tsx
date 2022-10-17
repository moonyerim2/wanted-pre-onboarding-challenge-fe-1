import React, { useReducer, createContext } from "react";

interface TodoItem {
  id: number;
  title: string;
  detail: string;
  status: string;
}

interface ContextType {
  todos: TodoItem[];
  addTodo: (todo: { title: string; detail: string }) => void;
  deleteTodo: (todoId: number) => void;
  updateTodo: (newTodo: TodoItem) => void;
}

type ActionType =
  | {
      type: "ADD_TODO";
      payload: { title: string; detail: string };
    }
  | { type: "DELETE_TODO"; payload: { id: number } }
  | { type: "UPDATE_TODO"; payload: TodoItem };

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
      const { title, detail } = payload;
      return [
        ...todos,
        {
          id: new Date().getTime(),
          title,
          detail,
          status: "TODO",
        },
      ];
    }
    case "DELETE_TODO": {
      const { id } = payload;
      return todos.filter((todo: TodoItem) => todo.id !== id);
    }
    case "UPDATE_TODO": {
      const { id, title, detail, status } = payload;
      return todos.map((todo: TodoItem) => {
        if (todo.id === id) {
          return { ...todo, title, detail, status };
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

  const addTodo = ({ title, detail }: { title: string; detail: string }) => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        title,
        detail,
      },
    });
  };

  const deleteTodo = (id: number) => {
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
