import React, { createContext, useState } from "react";
import { LocalStorage } from "utils";


export const TodoContext = createContext<TodoContextProps>({
    todos: [],
    setTodos: () => { },
    activeTodo: null,
    setActiveTodo: () => { },
    order: "id",
    setOrder: () => { }
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<TodoNote[]>(new LocalStorage().get());
    const [activeTodo, setActiveTodo] = useState<TodoNote | null>(todos.length > 0 ? todos[todos.length - 1] : null);
    const [order, setOrder] = useState<"id" | "-id">("-id");

    const sortedTodos = todos.sort((a, b) => order === 'id' ? a.id - b.id : b.id - a.id);

    const value = {
        todos: sortedTodos,
        order,
        setOrder,
        setTodos,
        activeTodo,
        setActiveTodo,
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}
