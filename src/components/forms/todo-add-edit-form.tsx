import { Button } from "components/button";
import { TodoContext } from "context";
import { useContext, useState } from "react"
import { LocalStorage } from "utils";

type Props = {
    todo?: TodoNote;
    close: () => void;
}

const AddEditForm = ({ todo, close }: Props) => {
    const { todos, setTodos } = useContext(TodoContext);
    const [name, setName] = useState<string>(todo?.name || '');
    const [status, setStatus] = useState<Status>(todo?.status || 'Waiting');
    const [description, setDescription] = useState<string>(todo?.description || '');
    const statusButtons:Status[] = ['Completed', 'In process', 'Waiting'];

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const newTodo: TodoNote = {
            id: todo?.id || new Date().getTime(),
            date: todo?.date || new Date().toUTCString(),
            name,
            description,
            status,
        }
        // if todo, then update, else add new todo
        const newTodos = todo ?
            todos.map(item => item.id === todo.id ? newTodo : item) :
            [...todos, newTodo];

        setTodos(newTodos);

        new LocalStorage().set(newTodos);

        close();
    }
    return (
        <form onSubmit={submitHandler}>
            <div className='inputs-container' id='inputs-container'>
                <label htmlFor='name-input'>Name:
                    <input
                        name='name'
                        value={name}
                        onInput={e => setName((e.target as HTMLTextAreaElement).value)}
                        type='text'
                        placeholder='Name..'
                        id='name-input'
                        required
                    />
                </label>
                <label htmlFor='description-textarea'>Description:
                    <textarea
                        value={description}
                        onInput={e => setDescription((e.target as HTMLTextAreaElement).value)}
                        name='description'
                        placeholder='Note..'
                        id='description-textarea'

                    ></textarea>
                </label>
                <div className='process-status-container'>
                    <div>Status:</div>
                    <div className="buttons">
                        {statusButtons.map(item => {
                            return (
                                <Button
                                    width={"fill"}
                                    type="button"
                                    key={item}
                                    shape={item === status ? "filled" : "outline"}
                                    onClick={()=> setStatus(item)}
                                >
                                    {item}
                                </Button>
                            )
                        })}
                    </div>

                </div>
            </div>
            <div className='buttons'>
                <Button
                    type='submit'
                    bg='primary'
                    radius
                >
                    Save
                </Button>
            </div>
        </form>
    )
}

export default AddEditForm