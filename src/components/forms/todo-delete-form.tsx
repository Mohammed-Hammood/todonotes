import { Button } from "components";
import { TodoContext } from "context";
import { useContext } from "react";
import { LocalStorage } from "utils";

type Props = {
    close: ()=> void;
}

const ToDoDeleteForm = ({ close}: Props) => {
    const { todos, setTodos, activeTodo  } = useContext(TodoContext);
    
    const deleteTodo = () => {
        const newTodos = todos.filter(item => activeTodo && item.id !== activeTodo.id);
        
        setTodos(newTodos);
        
        new LocalStorage().set(newTodos);
        
        close();
    }

    return (
        <>
            <div className='text-container' >
                <p>Do you want to delete "{activeTodo?.name}"?</p>
            </div>
            <div className='buttons'>
                <Button
                    shape={"transparent"}                    
                    onClick={deleteTodo}
                    bg={"danger"}
                    radius
                >
                    Delete
                </Button>

            </div>
        </>
    )
}

export default ToDoDeleteForm;