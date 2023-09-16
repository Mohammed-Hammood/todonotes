import React from "react";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider, ThemeProvider } from "context";

export const withProviders = (App: () => JSX.Element): JSX.Element => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider>
                    <TodoProvider>
                        <App />
                    </TodoProvider>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}