import React, { createContext, useState } from "react";


export const ThemeContext = createContext<ThemeContextProps>({
    theme: "dark",
    themeToggle: ()=> {}
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const ls = (localStorage.getItem("theme") || "dark") as "dark" | "light";
    const [theme, setTheme] = useState<"dark" | "light">(ls);

    const themeToggle = ():void=> {
        const updatedTheme = theme === 'dark'? 'light': 'dark';
        setTheme(updatedTheme);
        localStorage.setItem("theme", updatedTheme);
        (document.getElementsByTagName("html")[0] as HTMLElement).setAttribute("data-theme", updatedTheme);
    }
    
    if(localStorage){
        (document.getElementsByTagName("html")[0] as HTMLElement).setAttribute("data-theme", theme);
    }

    return (
        <ThemeContext.Provider value={{theme, themeToggle}}>
            {children}
        </ThemeContext.Provider>
    )
}
