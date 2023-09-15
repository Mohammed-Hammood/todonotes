import { TodoContext } from "context";
import { useContext } from "react";
import { LocalStorage } from "utils";

type Props = {
    todo: TodoNote
    close: ()=> void;
}

const ToDoDeleteForm = ({ close, todo}: Props) => {
    const { todos, setTodos } = useContext(TodoContext);
    
    const deleteTodo = () => {
        const newTodos = todos.filter(item => item.id !== todo.id);
        
        setTodos(newTodos);
        
        new LocalStorage().set(newTodos);
        
        close();
    }

    return (
        <>
            <div className='text-container' >
                <p>Do you want to delete "{todo.name}"?</p>
            </div>
            <div className='buttons'>
                <button
                    type='button'
                    className='danger'
                    onClick={deleteTodo}
                >
                    Delete
                </button>

            </div>
        </>
    )
}

export default ToDoDeleteForm;