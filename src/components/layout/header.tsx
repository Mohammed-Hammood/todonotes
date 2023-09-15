import { Modal, ICON, Button } from "components";
import { TodoContext } from "context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";


export const Header = () => {
    const { todos, activeTodo } = useContext(TodoContext);
    const [deleteTodo, setDeleteTodo] = useState<null | TodoNote>(null);
    const [editTodo, setEditTodo] = useState<null | TodoNote>(null);
    const [searchModal, setSearchModal] = useState<boolean>(false);
    const [addModal, setAddModal] = useState<boolean>(false);

    return (
        <>
            <header>
                <nav className='navbar-container'>
                    <div className='left-buttons-container'>
                        <Link to={"/"}>
                            Home
                        </Link>
                        <Button shape={"outline"} title="Add" onClick={() => setAddModal(true)}>
                            <ICON name='plus-solid' color='white' />
                        </Button>
                        {activeTodo && <>
                            <Button
                                shape={"transparent"}
                                title="Edit"
                                onClick={() => setEditTodo(activeTodo)}
                            >
                                <ICON name='pen-to-square-solid' color='white' />
                            </Button>
                            <Button
                                title="Delete"
                                shape={"transparent"}
                                onClick={() => setDeleteTodo(activeTodo)}
                            >
                                <ICON name={'trash-solid'} color='white' />
                            </Button>
                        </>}
                    </div>
                    {todos.length > 0 && <>
                        <Button
                            shape={"transparent"}
                            title="Search"
                            onClick={() => setSearchModal(true)}
                        >
                            <ICON name='search' color='white' />
                        </Button>
                    </>}
                </nav>
            </header>
            {<Modal
                isOpen={searchModal}
                close={() => setSearchModal(false)}
                form='search'
                title={<span>Search</span>}
            />}
            <Modal
                isOpen={addModal}
                close={() => setAddModal(false)}
                form='add-edit'
                title={<span>Add new todo</span>}
            />
            <Modal
                isOpen={editTodo !== null}
                close={() => setEditTodo(null)}
                form='add-edit'
                title={<span>Edit todo</span>}
                {...{ todo: activeTodo }}
            />

            <Modal
                isOpen={deleteTodo !== null}
                close={() => setDeleteTodo(null)}
                form='delete'
                title={"Delete todo"}
            />
        </>
    )
}