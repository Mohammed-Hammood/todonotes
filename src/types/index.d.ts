type IconsNames = "sort-down-solid" | "sort-up-solid" | "xmark-solid" | "search" | "plus-solid" | "pen-to-square-solid" | "trash-solid" | "magnifying-glass-solid";


type Status = "waiting" | "completed" | "in-process";

type FormsNames = "search" | "add-edit" | "delete";

type ButtonShapes = "transparent" | "outline" | "filled";


type TodoNote = {
    id: number;
    name: string;
    description: string;
    status: Status;
    date: string;
}

type TodoContextProps = {
    todos: TodoNote[];
    setTodos: (value: TodoNote[]) => void;
    activeTodo: TodoNote | null;
    setActiveTodo: (value: TodoNote) => void;
    order: "id" | "-id";
    setOrder: (value: "id" | "-id") => void;
}
