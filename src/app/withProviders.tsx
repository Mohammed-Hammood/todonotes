import React from "react";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "context";

export const withProviders = (App: () => JSX.Element): JSX.Element => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <TodoProvider>
                    <App />
                </TodoProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}