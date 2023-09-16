import { useContext } from 'react';
import { mouseDown } from 'utils';
import { TodoContext } from 'context';


export default function HomePage():JSX.Element {
    const { todos, setActiveTodo, activeTodo } = useContext(TodoContext);

    return (
    <main className="main-content-container">

        <div className='content-container'>
            <div className='todoslist' id='left-container'>
                {todos.map((item) => {
                    return <button
                        className={(activeTodo && activeTodo.id === item.id) ? "active": 'todo'}
                        key={item.id}
                        id={`todo_${item.id}`}
                        onClick={() => setActiveTodo(item)}
                    >
                        {item.name}
                    </button>
                })}
            </div>
            {/*the center-container div is the resizer */}
            <div className='center-container' id='center-container' onMouseDown={(event) => mouseDown(event)} ></div>
            <div className='right-container' id='right-container'>
                {activeTodo && <>
                    <div className={`header-container ${activeTodo.status}`} id='header-container'>
                        <div>Name: {activeTodo.name}</div>
                        <div>Process Status: {activeTodo.status}</div>
                        <div>Date added: {activeTodo.date}</div>
                    </div>
                    <div className='description-container'>{activeTodo.description}</div>
                </>}
            </div>
        </div>
    </main>)
}