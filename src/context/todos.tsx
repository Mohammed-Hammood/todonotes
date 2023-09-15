import React, { createContext, useState } from "react";
import { LocalStorage } from "utils";


export const TodoContext = createContext<TodoContextProps>({ 
    todos: [], 
    setTodos: () => { } ,
    activeTodo: null, 
    setActiveTodo: () => { } ,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<TodoNote[]>(new LocalStorage().get());
    const [activeTodo, setActiveTodo] = useState<TodoNote | null>(null);

    const value = {
        todos,
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
