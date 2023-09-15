import { Button } from "components";
import { TodoContext } from "context";
import { useContext, useState } from "react";

type Props = {
    close: () => void;
}

const SearchForm = ({ close }: Props) => {
    const [query, setQuery] = useState<string>("");
    const [result, setResult] = useState<TodoNote[]>([]);
    const { todos, setActiveTodo } = useContext(TodoContext);

    const includes = (text: string): boolean => text.toLowerCase().includes(query.toLowerCase());

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = todos.filter(item => includes(item.name) || includes(item.description));

        setResult(result);
    }

    const openTodo = (todo: TodoNote) => {
        document.getElementById(`todo_${todo.id}`)?.scrollIntoView();
        setActiveTodo(todo);
        close();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='search-container' id='search-container'>
                <div className='count-container' id='count-container'>{result.length}</div>
                <input
                    type={"text"}
                    value={query}
                    placeholder='Search ToDo by the name'
                    onInput={(e) => setQuery(((e.target as HTMLInputElement).value))}
                />
                <div className='search-result-container' id='search-result-container'>
                    {result.map((item) => {
                        return <button
                            className='todos'
                            key={item.id}
                            onClick={() => openTodo(item)}>
                            {item.name}
                        </button>
                    })}
                </div>
            </div>
            <div className='buttons'>
                <Button type='submit' shape={"filled"} bg={"primary"} radius>
                    Search
                </Button>
            </div>
        </form>
    )
}

export default SearchForm;